# EmoCi

<img src= "public/emociLogo.png" "width=300 px"

<img src= "public/emociScreenshot.png" "width=500 px"

Emotions that you can see.

## To start:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Our story:

For people with hearing disabilities, EmoCi helps them better depict the emotions behind the words on screen when they watch movies or TV.

Although subtitles and closed captions tell deaf and hearing impaired people what is being said, they fail to communicate how it is being said. This “emotional gap” experienced by viewer’s highlights a significant drawback to current subtitles especially when used for learning by the deaf.

**Our project EmoCi deploys the advanced tone recognition technology to enable emotion classification based on speech or audio. In the backend, we would be feeding CNN (Convolutional Neural Network) with the audio speeches segments in the movie. The output of this would be the emotion with the highest score, and the web application would display this as an emoji in front-end.**

For the purpose of demo, we simplified this by generating an emoji whenever a positive/negative sentiment was observed in the subtitle line. For the tech stack, we used React for the front-end, as well as the emoji-translate API for generating the proper positive/negative emoji, and sentiment API for running NLP on each line read by an actor in the subtitles.

Our goal is help 6.8 million viewers who have hearing disabilities to better enjoy movies and TV on Netflix. EmoCi also assists people who are learning second languages in better comprehending the cross-cultural content of their learning materials. In a word, EmoCi helps build a better world that is more accessible to deaf and hearing impaired people, more inclusive for every movie lover , and more diverse by enhancing cross-community learning experience.

To see our UBC Local Hack Day 2018 presentation, see our Google Slides [here](https://docs.google.com/presentation/d/1yDH5noHegAFmuNkvMGYl2SVP51hDZ8HBX9l89lBQPfs/edit?usp=sharing).

## Our mockup:
<img src= "public/emociMockup.png" "width=500 px"
