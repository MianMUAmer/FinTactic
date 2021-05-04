import React from "react";
import queryString from 'query-string';
import { useState, useEffect } from "react";
//import { useParams } from "react-router-dom";
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

//import Widget from "../../components/Widget/Widget";
import s from "./Static.module.scss";
import YouTubeVideo from "../../components/YouTubeVideo/YouTubeVideo";

class Video extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    // function Video(props) {
    // //const {id} = useParams();
    // const [video,setVideo]=useState({});
    
    //     useEffect(()=> {
    //         fetch("https://localhost:3000/#/api/video/"+props.match.params.id)
    //         .then(res => res.json())
    //         .then(
    //           (result) => {
    //             setVideo(result);
    //           }
    //         );
    //     });
    //     //console.log(video);
    //   }
let videoId = window.location.href;

videoId = videoId.split('/').pop() ;

console.log(videoId);

      return (
        <div className={s.root}>
          <h1 className="page-title"  style={{color: "black"}}>
            Educational Video 
          </h1>
          <table>
            <tr>
              <th>
                <p>
                  {<YouTubeVideo videoId={videoId}/>}
                </p>
              </th>
            </tr>

          </table>

        </div>
        
      );
  }
//}
}


export default Video;
