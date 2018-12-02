import React, { Component } from 'react';
import './App.css';
import "video-react/dist/video-react.css";
import { parse } from 'subtitle';

const translate = require('moji-translate');
const Sentiment = require('sentiment');
// const GoogleImages = require('google-images');

const sentiment = new Sentiment();
// const imageClient = new GoogleImages('015181646880705829017:69kghjmkjbu', 'AIzaSyC7MbpPBw7DW0NLbbgAWpCm5kbwZRq8rwE');

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
      currentSubtitle: "",
      emojiSubtitle: "",
      movieName: undefined,
      subtitleChanged: false,
      emojiWords: [],
      positiveEmoji: false,
      posEmo: "",
      negativeEmoji: false,
      negEmo: ""
  }

  renderEmoji = e => {
    e.preventDefault();
    if (this.state.positiveWords === true) {
      return true;
    }
  }

  getTime = async (e) => {
    e.preventDefault();
    let player = document.querySelector('video');
    this.setState({
      currentTime: player.currentTime*1000
    });
    this.subtitleArray.some(
      (subtitle) => {
        if (subtitle.start < this.state.currentTime
          && subtitle.end > this.state.currentTime
        && this.state.currentSubtitle !== subtitle.text ) {
          this.setState({
            currentSubtitle: subtitle.text,
            emojiSubtitle: translate.translate(subtitle.text),
            sentimentScore: undefined,
            subtitleChanged: true,
            emojiWords: [],
            positiveEmoji: false,
            negativeEmoji: false
          });
          let result = sentiment.analyze(subtitle.text);
          this.setState({
            sentimentScore: result.score
          });
          if (result.hasOwnProperty('positive')) {
            if (result.positive.length > 0) {
              result.positive.forEach((e) => {
                console.log("positive " + e);
                this.setState({
                  emojiWords: this.state.emojiWords.concat([e])
                });
              });
              this.setState({
                positiveEmoji: true,
                posEmo: translate.getEmojiForWord("happy")
              });
            }
            // result.positive.forEach((word) => {
            //   this.setState({
            //     emojiWords: this.state.emojiWords.concat([word])
            //   })
            //   console.log(word);
            // });
          }
          if (result.hasOwnProperty('negative')) {
            if (result.negative.length > 0) {
              result.negative.forEach((e) => {
                console.log("negative " + e);
                this.setState({
                  emojiWords: this.state.emojiWords.concat([e])
                });
              });
              // result.negative.forEach((e) => { console.log(e)});
              this.setState({
                negativeEmoji: true,
                negEmo: translate.getEmojiForWord("sad")
              });
              }
          }
        } else {
          this.setState({
            subtitleChanged: false
          });
        }
      }
    );
  }

  render() {
    return (
      <div className="App">
        <h1> Breaking Bad </h1>
        <div className="Player">
          <video
            controls
            onTimeUpdate={this.getTime}>
            <source
              src="http://206.189.195.115/videos/c8btp7ydmi855cxqqhgaa3yk7c.mp4"
             type="video/mp4"
            />
          </video>
        </div>
        <br>
        </br>
        <p> Sentiment Score (from -5 to 5):
          {this.state.sentimentScore} </p>
        <b> Regular: </b>
        <p>{this.state.currentSubtitle} </p>
        <b> EmoCi-ed: </b>
        <p> {this.state.emojiSubtitle} </p>
        <div> {this.state.emojiWords.length > 0 &&
            <p> Words: {this.state.emojiWords.toString()}</p>
          }
        </div>
        <div> {this.state.positiveEmoji &&
            <p>
              {this.state.posEmo}
            </p>
          }
        </div>
        <div> {this.state.negativeEmoji &&
            <p>
              {this.state.negEmo}
            </p>
          }
        </div>
      </div>
    );
  }
}

export default App;
