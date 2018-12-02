import React, { Component } from 'react';
import './App.css';
import "video-react/dist/video-react.css";
import { parse } from 'subtitle';

class App extends Component {
  subtitleArray = undefined;

  componentDidMount() {
    fetch('./BreakingBad_s5_e13.srt')
    .then(r => r.text())
    .then(text => parse(text))
    .then(srt => this.subtitleArray = srt);
  }

  state = {
      currentTime: undefined,
      currentSubtitle: undefined,
      movieName: undefined,
  }

  getTime = async (e) => {
    e.preventDefault();
    let player = document.querySelector('video');
    this.setState({
      currentTime: player.currentTime*1000
    });
    this.subtitleArray.some(
      (subtitle) => {
        if (subtitle.start < this.state.currentTime && subtitle.end > this.state.currentTime) {
          this.setState({
            currentSubtitle: subtitle.text
          });
        }
      }
    );
    console.log("nope" + player.currentTime);
  }

  render() {
    return (
      <div className="App">
        <div className="Player">
          <video width="320"
            controls
            poster="https://video-react.js.org/assets/poster.png"
            onTimeUpdate={this.getTime}>
            <source
              src="./stock_footage.mp4"
             type="video/mp4"
            />
          </video>
        </div>
        <p> {this.state.currentSubtitle} </p>
      </div>
    );
  }
}

export default App;
