import React from "react";
import {
  Row,
  Col,
  Table,
  Progress,
  Button,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  Label,
  Badge,
} from "reactstrap";
import { Sparklines, SparklinesBars } from "react-sparklines";
import Video from "./Video";
//import Widget from "../../components/Widget/Widget";
import s from "./Static.module.scss";
import YouTubeVideo from "../../components/YouTubeVideo/YouTubeVideo";

import second from "../../images/people/second.jpg";
import seconded from "../../images/imgedu/Bitcoin.jpeg";
// import seconded from "../../images/imgedu/Bitcoin.jpeg";
class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [
          {item: "item", id: 1},
          {item1: "item1", id: 2}
      ]
   };


    this.checkAll = this.checkAll.bind(this);
  }
  handleClickSignIn(){
    console.log("come handle click fun");
    this.props.history.push(
       {
        pathname: "/viz",
    state: { employee:"Steven" }});
  
  }
  handleClick(id, e){
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

  render() {

//     let url = window.location.href;
//     let param = window.location.pathname;
//     // react
//     let param1 = this.props.location.pathname;
// alert(param1);
// alert("param1");

    return (
      <div className={s.root}>
        <h1 className="page-title"  style={{color: "black"}}>
          Education
        </h1>
        <table>
          <tr>
            <th>Stock Market 101</th>
            <th>Bollinger Bands</th>
          </tr>
          <tr>
            <th>
              <p>
               {/* <YouTubeVideo videoId='eKxxtYIU1iA'/> */}
              <a href="#/app/visualization/id=eKxxtYIU1iA" target="blank"> <img src={seconded} /></a>
              
              </p>
            </th>
            <th>
              <p>
              <a href="www.big.az" target="blank"> <img src={seconded}/></a>
              </p>
            </th>
          </tr>
          <tr></tr>
          <tr>
            <th>Moving Average Convergence/Divergence</th>
            <th>Relative Strength Index</th>
          </tr>
          <tr>
            <th>
              <p>
              <a href="www.big.az" target="blank"> <img src={seconded}/></a>
              </p>
            </th>
            <th>
              <p>
              <a href="www.big.az" target="blank"> <img src={seconded}/></a>
              </p>
            </th>
          </tr>

        </table>

      </div>
      
    );
  }
}

export default Education;
