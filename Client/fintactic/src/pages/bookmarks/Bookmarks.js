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

// import seconded from "../../images/imgedu/Bitcoin.jpeg";

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [
        { item: "item", id: 1 },
        { item1: "item1", id: 2 },
      ],

    
    };

    this.checkAll = this.checkAll.bind(this);
  }

  // getWiki = () => {
  //   const SMAPI =
  //     "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Stock market";

  //   const SMbody = { method: "GET", dataType: "json" };
  //   const SMmyRequest = new Request(SMAPI, SMbody);
  //   fetch(SMmyRequest)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const allData = data.query.pages;
  //       for (var n in allData) {
  //         const paragraphs = allData[n].extract.split("</p>");
  //         const firstParagraph = paragraphs[1] + "</p>";
  //         this.setState({
  //           SMtooltip: firstParagraph,
  //         });
  //       }
  //     });

  //   const BBAPI =
  //     "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Bollinger Bands";

  //   const BBbody = { method: "GET", dataType: "json" };
  //   const BBmyRequest = new Request(BBAPI, BBbody);
  //   fetch(BBmyRequest)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const allData = data.query.pages;
  //       for (var n in allData) {
  //         const paragraphs = allData[n].extract.split("</p>");
  //         const firstParagraph = paragraphs[0] + "</p>";
  //         this.setState({
  //           BBtooltip: firstParagraph,
  //         });
  //       }
  //     });

  //   const MACDAPI =
  //     "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=MACD";

  //   const MACDbody = { method: "GET", dataType: "json" };
  //   const MACDmyRequest = new Request(MACDAPI, MACDbody);
  //   fetch(MACDmyRequest)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const allData = data.query.pages;
  //       for (var n in allData) {
  //         const paragraphs = allData[n].extract.split("</p>");
  //         const firstParagraph = paragraphs[1] + "</p>";
  //         this.setState({
  //           MACDtooltip: firstParagraph,
  //         });
  //       }
  //     });

  //   const RSIAPI =
  //     "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Relative strength index";

  //   const RSIbody = { method: "GET", dataType: "json" };
  //   const RSImyRequest = new Request(RSIAPI, RSIbody);
  //   fetch(RSImyRequest)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const allData = data.query.pages;
  //       for (var n in allData) {
  //         const paragraphs = allData[n].extract.split("</p>");
  //         const firstParagraph = paragraphs[1] + "</p>";
  //         this.setState({
  //           RSItooltip: firstParagraph,
  //         });
  //       }
  //     });

  //   const GOLDAPI =
  //     "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Gold as an investment";

  //   const GOLDbody = { method: "GET", dataType: "json" };
  //   const GOLDmyRequest = new Request(GOLDAPI, GOLDbody);
  //   fetch(GOLDmyRequest)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const allData = data.query.pages;
  //       for (var n in allData) {
  //         const paragraphs = allData[n].extract.split("</p>");
  //         const firstParagraph = paragraphs[1] + "</p>";
  //         this.setState({
  //           GOLDtooltip: firstParagraph,
  //         });
  //       }
  //     });

  //   const SILVERAPI =
  //     "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Silver as an investment";

  //   const SILVERbody = { method: "GET", dataType: "json" };
  //   const SILVERmyRequest = new Request(SILVERAPI, SILVERbody);
  //   fetch(SILVERmyRequest)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const allData = data.query.pages;
  //       for (var n in allData) {
  //         const paragraphs = allData[n].extract.split("</p>");
  //         const firstParagraph = paragraphs[1] + "</p>";
  //         this.setState({
  //           SILVERtooltip: firstParagraph,
  //         });
  //       }
  //     });

  //   const BitCoinAPI =
  //     "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=Bitcoin";

  //   const BitCoinbody = { method: "GET", dataType: "json" };
  //   const BitCoinmyRequest = new Request(BitCoinAPI, BitCoinbody);
  //   fetch(BitCoinmyRequest)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const allData = data.query.pages;
  //       for (var n in allData) {
  //         const paragraphs = allData[n].extract.split("</p>");
  //         const firstParagraph = paragraphs[2] + "</p>";
  //         this.setState({
  //           BitCointooltip: firstParagraph,
  //         });
  //       }
  //     });
  // };

  // toggleSM = () =>
  //   this.setState({
  //     SMtooltipOpen: !this.state.SMtooltipOpen,
  //   });
  // toggleBB = () =>
  //   this.setState({
  //     BBtooltipOpen: !this.state.BBtooltipOpen,
  //   });
  // toggleMACD = () =>
  //   this.setState({
  //     MACDtooltipOpen: !this.state.MACDtooltipOpen,
  //   });
  // toggleRSI = () =>
  //   this.setState({
  //     RSItooltipOpen: !this.state.RSItooltipOpen,
  //   });
  // toggleBitCoin = () =>
  //   this.setState({
  //     BitCointooltipOpen: !this.state.BitCointooltipOpen,
  //   });
  // toggleGold = () =>
  //   this.setState({
  //     GOLDtooltipOpen: !this.state.GOLDtooltipOpen,
  //   });
  // toggleSilver = () =>
  //   this.setState({
  //     SILVERtooltipOpen: !this.state.SILVERtooltipOpen,
  //   });

  // componentDidMount() {
  //   this.getWiki();
  // }

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

  bookmarkVideo = (e) => {
    var favorite = true;
    var videoValues = e.target.value.split(',');;
    console.log(videoValues);
    var user_id = localStorage.getItem("user_id");
    
    if(favorite) {
      var videoURL = videoValues[0]
      localStorage.setItem("videoUrl", videoURL);
      var videoNAME = videoValues[1]
      localStorage.setItem("videoName", videoNAME);
      var videoTHMB = videoValues[2]
      localStorage.setItem("VideoThmb", videoTHMB);

      // fetch('/upNotes', {
      //   method: 'post',
      //   body: JSON.stringify({id: user_id, videoUrl: videoURL, videoName: videoNAME, VideoThmb: videoTHMB}),
      //   headers: {'Content-Type':  'application/json'},
      // }).then(resp => resp.json())
      // .then(data => console.log(data))
      // .catch(err => console.error(err));
      favorite = false;
    } else {
      // deleteRepFromDb(row_id) {
      //   fetch('/deleteReports', {
      //     method: 'post',
      //     headers: {'Content-Type':'application/json', 'Accept': 'application/json'},
      //     body: JSON.stringify({id: row_id}),
      //   }).then(res => res.json()).catch(error => {
      //     console.error('Error:', error);
      // })
      // .then(response => {
      //     console.log(response);
      // }) 

    }
    
  };

  render() {

    return (
      <div className={s.root}>
        <h1 className="page-title" style={{ color: "black" }}>
          Bookmarks
        </h1>
        {Object.values(this.state.myArray).map((row, index) => (
          <table>
            <tr  key={row.id}>
                <th>{row.name}
                  <Button
                  style={{ marginLeft: "535px", width: "100px", backgroundColor: "gold", color: "black" }}
                  value={(row.url),(row.name),(row.img)}
                  onClick={e => this.bookmarkVideo(e, "value")}
                  >
                  Bookmark
                </Button>
                </th>
            </tr>
            <tr >
              <th>
                <p>
                  {/* <YouTubeVideo videoId='eKxxtYIU1iA'/> */}
                  <a href={"#/app/video/"+row.url} target="blank">
                    <img src={row.img} />
                  </a>
                </p>
              </th>
            </tr>
            </table>
          ))}
        
          
        {/* <Tooltip
          placement="right"
          isOpen={this.state.SMtooltipOpen}
          autohide={false}
          target="stockMarket"
          toggle={this.toggleSM}
          style={{
            border: "1px solid #1b277c",
            backgroundColor: "#fff",
            maxWidth: "35em",
          }}
        >
          <div className="content">{Parser(this.state.SMtooltip)}</div>
        </Tooltip>
        <Tooltip
          placement="left"
          isOpen={this.state.BBtooltipOpen}
          autohide={false}
          target="bollingerBands"
          toggle={this.toggleBB}
          style={{
            border: "1px solid #1b277c",
            backgroundColor: "#fff",
            maxWidth: "35em",
          }}
        >
          <div className="content">{Parser(this.state.BBtooltip)}</div>
        </Tooltip>
        <Tooltip
          placement="right"
          isOpen={this.state.MACDtooltipOpen}
          autohide={false}
          target="MACD"
          toggle={this.toggleMACD}
          style={{
            border: "1px solid #1b277c",
            backgroundColor: "#fff",
            maxWidth: "35em",
          }}
        >
          <div className="content">{Parser(this.state.MACDtooltip)}</div>
        </Tooltip>
        <Tooltip
          placement="left"
          isOpen={this.state.RSItooltipOpen}
          autohide={false}
          target="RSI"
          toggle={this.toggleRSI}
          style={{
            border: "1px solid #1b277c",
            backgroundColor: "#fff",
            maxWidth: "35em",
          }}
        >
          <div className="content">{Parser(this.state.RSItooltip)}</div>
        </Tooltip>
        <Tooltip
          placement="right"
          isOpen={this.state.BitCointooltipOpen}
          autohide={false}
          target="BitCoin"
          toggle={this.toggleBitCoin}
          style={{
            border: "1px solid #1b277c",
            backgroundColor: "#fff",
            maxWidth: "35em",
          }}
        >
          <div className="content">{Parser(this.state.BitCointooltip)}</div>
        </Tooltip>
        <Tooltip
          placement="right"
          isOpen={this.state.GOLDtooltipOpen}
          autohide={false}
          target="Gold"
          toggle={this.toggleGold}
          style={{
            border: "1px solid #1b277c",
            backgroundColor: "#fff",
            maxWidth: "35em",
          }}
        >
          <div className="content">{Parser(this.state.GOLDtooltip)}</div>
        </Tooltip>
        <Tooltip
          placement="left"
          isOpen={this.state.SILVERtooltipOpen}
          autohide={false}
          target="Silver"
          toggle={this.toggleSilver}
          style={{
            border: "1px solid #1b277c",
            backgroundColor: "#fff",
            maxWidth: "35em",
          }}
        >
          <div className="content">{Parser(this.state.SILVERtooltip)}</div>
        </Tooltip> */}
      </div>
    );
  }
}

export default Bookmarks;
