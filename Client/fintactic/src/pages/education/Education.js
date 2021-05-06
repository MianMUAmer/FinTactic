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

import Parser from "html-react-parser";
import { Tooltip, Button } from "reactstrap";
import infoIcon from "../../images/infoIcon.png";
// import seconded from "../../images/imgedu/Bitcoin.jpeg";
class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [
        { item: "item", id: 1 },
        { item1: "item1", id: 2 },
      ],

      // SMtooltip: "",
      // SMtooltipOpen: false,
      // BBtooltip: "",
      // BBtooltipOpen: false,
      // RSItooltip: "",
      // RSItooltipOpen: false,
      // MACDtooltip: "",
      // MACDtooltipOpen: false,
      // BitCointooltip: "",
      // BitCointooltipOpen: false,
      // GOLDtooltip: "",
      // GOLDtooltipOpen: false,
      // SILVERtooltip: "",
      // SILVERtooltipOpen: false,
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
      
      var videoValues = e.target.value.split(',');
      console.log(videoValues);
      var user_id = localStorage.getItem("user_id");
      console.log(user_id)
      var videoURL = videoValues[0]
      console.log(videoURL)
      localStorage.setItem("videoUrl", videoURL);
      var videoNAME = videoValues[1]
      console.log(videoNAME)
      localStorage.setItem("videoName", videoNAME);
      var videoTHMB = videoValues[2]
      console.log(videoTHMB)
      localStorage.setItem("VideoThmb", videoTHMB); 
    
    fetch('/toggleBookmark', {
      method: 'post',
      body: JSON.stringify({user_id: user_id, video_url: videoURL}),
      headers: {'Content-Type':  'application/json', 'Accept': 'application/json'},
    }).then(resp => resp.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));

   }; 


  render() {
   

    return (
      <div className={s.root}>
        <h1 className="page-title" style={{ color: "black" }}>
          Education
        </h1>
        <table>
          <tr >
              <th  >Stock Market 101
                {/* <span>
                  <img
                    style={{paddingTop: "10px", paddingLeft: "5px"  }}
                    id="stockMarket"
                    src={infoIcon}
                    alt="info"
                    width="17"
                    height="28"
                  />
                </span> */}
                <Button
                style={{ marginLeft: "535px", width: "100px", backgroundColor: "gold", color: "black" }}
                value="Jwzta8B1b9g,Stock Market 101,FINTACTIC/Client/fintactic/src/images/imgedu/STOCK MARKET 101.jpeg"
                onClick={e => this.bookmarkVideo(e, "value")}

                >
                Bookmark
              </Button>
              </th>
              <th >Bollinger Bands
                {/* <span>
                  <img
                    style={{ paddingTop: "10px", paddingLeft: "5px" }}
                    id="bollingerBands"
                    src={infoIcon}
                    alt="info"
                    width="17"
                    height="28"
                  />
                </span> */}
              <Button
                style={{ marginLeft: "555px", width: "100px", backgroundColor: "gold", color: "black" }}
                onClick={e => this.bookmarkVideo(e, "value")}
                value="ay0C36Yd20w,Bollinger Bands,FINTACTIC/Client/fintactic/src/images/imgedu/Bollinger Bands.jpeg"
                >
                Bookmark
              </Button></th>
          </tr>
          <tr >
            <th>
              <p>
                {/* <YouTubeVideo videoId='eKxxtYIU1iA'/> */}
                <a href="#/app/video/Jwzta8B1b9g" target="blank">
                  <img src={StockMarket} />
                </a>
              </p>
            </th>
            <th>
              <p>
                {/* <YouTubeVideo videoId='werjfC_vFf4'/> */}
                <a href="#/app/video/ay0C36Yd20w" target="blank">
                  <img src={BollingerBands} />
                </a>
              </p>
            </th>
          </tr>
          <tr></tr>
          <tr >
              <th>Moving Average Convergence/Divergence (MACD)
                {/* <span>
                  <img
                    style={{ paddingTop: "10px", paddingLeft: "5px" }}
                    id="MACD"
                    src={infoIcon}
                    alt="info"
                    width="17"
                    height="28"
                  />
                </span> */}
                <Button
                style={{ marginLeft: "165px", width: "100px", backgroundColor: "gold", color: "black" }}
                value="-fdsp4l5e-E,Moving Average Convergence/Divergence (MACD),FINTACTIC/Client/fintactic/src/images/imgedu/MACD.jpeg"
                onClick={e => this.bookmarkVideo(e, "value")}

                >
                Bookmark
              </Button>
              </th>
              <th >Relative Strength Index (RSI)
                {/* <span>
                  <img
                    style={{ paddingTop: "10px", paddingLeft:"5px" }}
                    id="RSI"
                    src={infoIcon}
                    alt="info"
                    width="17"
                    height="28"
                  />
                </span> */}
                <Button
                style={{ marginLeft: "415px", width: "100px", backgroundColor: "gold", color: "black" }}
                value="ut4coV2RuSI,Relative Strength Index (RSI),FINTACTIC/Client/fintactic/src/images/imgedu/RS.jpeg"
                onClick={e => this.bookmarkVideo(e, "value")}

                >
                Bookmark
              </Button>
              </th>
          </tr>
          <tr>
            <th>
              <p>
                {/* <YouTubeVideo videoId='GfbdP6-RKuI'/> */}
                <a href="#/app/video/-fdsp4l5e-E" target="blank">
                  {" "}
                  <img src={MACD} />
                </a>
              </p>
            </th>
            <th>
              <p>
                {/* <YouTubeVideo videoId='ut4coV2RuSI'/> */}
                <a href="#/app/video/ut4coV2RuSI" target="blank">
                  {" "}
                  <img src={RSI} />
                </a>
              </p>
            </th>
          </tr>
          <tr >
              <th >Gold 
                {/* <span>
                  <img
                    style={{ paddingTop: "10px", paddingLeft: "5px" }}
                    id="Gold"
                    src={infoIcon}
                    alt="info"
                    width="17"
                    height="28"
                  />
                </span> */}
                <Button
                style={{ marginLeft: "685px", width: "100px", backgroundColor: "gold", color: "black" }}
                value="-xHvJLvATmw,Gold,FINTACTIC/Client/fintactic/src/images/imgedu/Gold.jpeg"
                onClick={e => this.bookmarkVideo(e, "value")}

                >
                Bookmark
              </Button>
              </th>
              <th >Silver
                {/* <span>
                  <img
                    style={{ paddingTop: "10px", paddingLeft: "5px" }}
                    id="Silver"
                    src={infoIcon}
                    alt="info"
                    width="17"
                    height="28"
                  />
                </span> */}
                <Button
                style={{ marginLeft: "675px", width: "100px", backgroundColor: "gold", color: "black" }}
                value="p61InB_dn8I,Silver,FINTACTIC/Client/fintactic/src/images/imgedu/SILVER.jpeg"
                onClick={e => this.bookmarkVideo(e, "value")}

                >
                Bookmark
              </Button>
              </th>
          </tr>
          <tr>
            <th>
              <p>
                {/* <YouTubeVideo videoId='vkLNygRMqR4'/> */}
                <a href="#/app/video/-xHvJLvATmw" target="blank">
                  {" "}
                  <img src={Gold} />
                </a>
              </p>
            </th>
            <th>
              <p>
                {/* <YouTubeVideo videoId='kyMrn1Nctzc'/> */}
                <a href="#/app/video/p61InB_dn8I" target="blank">
                  {" "}
                  <img src={SILVER} />
                </a>
              </p>
            </th>
          </tr>
          <tr >
              <th >Bitcoin 
                {/* <span>
                  <img
                    style={{ paddingTop: "10px", paddingLeft: "5px" }}
                    id="BitCoin"
                    src={infoIcon}
                    alt="info"
                    width="17"
                    height="28"
                  />
                </span> */}
                <Button
                style={{ marginLeft: "655px", width: "100px", backgroundColor: "gold", color: "black" }}
                value="XvB2RibLNWY,Bitcoin,FINTACTIC/Client/fintactic/src/images/imgedu/Bitcoin.jpeg"
                onClick={e => this.bookmarkVideo(e, "value")}

                >
                Bookmark
              </Button>
              </th>
          </tr>
          <tr>
            <th>
              <p>
                {/* <YouTubeVideo videoId='6PaiGP_VyU0'/> */}
                <a href="#/app/video/XvB2RibLNWY" target="blank">
                  {" "}
                  <img src={Bitcoin} />
                </a>
              </p>
            </th>
          </tr>
        </table>

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

export default Education;
