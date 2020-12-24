import React from 'react';
import YouTube from 'react-youtube';
 
class YouTubeVideo extends React.Component {

    videoOnReady(event) {
        // access to player in all event handlers via event.target
        event.target.playVideo();
        console.log(event.target);
    }
  
    /* videoOnPlay(event) {
        // access to player in all event handlers via event.target
        event.target.onPlay();
        console.log(event.target);
    } */

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    const {videoId} = this.props
 
    return <YouTube videoId={videoId} opts={opts} onReady={this.videoOnReady} />;
  }
 

}

export default YouTubeVideo;