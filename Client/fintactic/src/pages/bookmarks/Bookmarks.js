import React from "react";
import { Sparklines, SparklinesBars } from "react-sparklines";
import Video from "../video";
//import Widget from "../../components/Widget/Widget";
import s from "./Static.module.scss";
import Bookmark from 'react-bookmark';
import YouTubeVideo from "../../components/YouTubeVideo/YouTubeVideo";

import StockMarket from "../../images/people/STOCK MARKET 101.jpeg";
import Gold from "../../images/imgedu/Gold.jpeg";
import RSI from "../../images/people/RS.jpeg";
import MACD from "../../images/imgedu/MACD.jpeg";
import SILVER from "../../images/people/SILVER.jpeg";
import BollingerBands from "../../images/imgedu/Bollinger Bands.jpeg";
import Bitcoin from "../../images/imgedu/Bitcoin.jpeg";
import moment, { isDate } from "moment";

import {
  Row,
  Col,
  Table,
  Progress,
  Button,
} from "reactstrap";
import Widget from "../../components/Widget";
import source from "../../images/reportimg.png";
import { loginUser } from '../../actions/user';
import download from 'downloadjs';

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      thumbnail: '',
      myArray: [],
      name: '',
    }
    this.checkAll = this.checkAll.bind(this);
  }

  handleClickSignIn() {
    console.log("come handle click fun");
    this.props.history.push({
      pathname: "/viz",
      state: { employee: "Steven" },
    });
  }
  handleClick(id, e) {
    alert(id);
  }

  parseDate(date) {
    this.dateSet = date.toDateString().split(" ");

    return `${date.toLocaleString("en-us", { month: "long" })} ${
      this.dateSet[2]
    }, ${this.dateSet[3]}`;
  }

  checkAll(ev, checkbox) {
    const checkboxArr = new Array(this.state[checkbox].length).fill(
      ev.target.checked
    );
    this.setState({
      [checkbox]: checkboxArr,
    });
  }

  changeCheck(ev, checkbox, id) {
    //eslint-disable-next-line
    this.state[checkbox][id] = ev.target.checked;
    if (!ev.target.checked) {
      //eslint-disable-next-line
      this.state[checkbox][0] = false;
    }
    this.setState({
      [checkbox]: this.state[checkbox],
    });
  }
  componentDidMount() {
    console.log(moment())
    var user_id = localStorage.getItem("user_id");
    fetch('/getBookmarks', {
      method: 'post',
      headers: {'Content-Type':'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({id: user_id}),
    }).then(res => res.json()).catch(error => {
      console.error('Error:', error);
  })
  .then(response => {
      console.log(response);
      this.setState({myArray: response});
  })

  }

   bookmarkVideo = (e) => {
    var videoValues = e.target.value.split(',');;
    console.log(videoValues);
    var user_id = localStorage.getItem("user_id");
    
    var videoURL = videoValues[0]
    localStorage.setItem("videoUrl", videoURL);
    var videoNAME = videoValues[1]
    localStorage.setItem("videoName", videoNAME);
    var videoTHMB = videoValues[2]
    localStorage.setItem("VideoThmb", videoTHMB); 


    fetch('/toggleBookmark', {
      method: 'post',
      body: JSON.stringify({id: user_id, videoUrl: videoURL}),
      headers: {'Content-Type':  'application/json'},
    }).then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
 };


  render() {

    return (
      <div className={s.root}>
        <h1 className="page-title" style={{ color: "black" }}>
          Bookmarks
        </h1>
        {Object.values(this.state.myArray).map((row, index) => (

          <table>
            <tr>
                <th>{row.name}
                  <Button
                  style={{ marginLeft: "535px", width: "100px", backgroundColor: "gold", color: "black" }}
                  value={(row.url),(row.name),(row.thumbnail)}
                  onClick={e => this.bookmarkVideo(e, "value")}
                  >
                  Bookmark
                </Button>
                </th>
            </tr>
            <tr>
              <th>
                <p>
                  <a href={"#/app/video/"+row.url} target="blank">
                    <img src={row.thumbnail} />
                  </a>
                </p>
              </th>
            </tr>
          </table>

          ))}
      </div>
    );
  }
}

export default Bookmarks;
