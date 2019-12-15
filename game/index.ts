import * as PIXI from 'pixi.js'
import SOUND from 'pixi-sound'
import config from './config'
import setup from './setup'

const app = new PIXI.Application(config)

document.body.appendChild(app.view)

console.log(SOUND)

SOUND.Sound.from({
  url: 'assets/music.mp3',
  autoPlay: true,
  loop: true
});

app.loader
  .add('assets/campfire/frame-001.png')
  .add('assets/campfire/frame-002.png')
  .add('assets/campfire/frame-003.png')
  .add('assets/campfire/frame-004.png')
  .add('assets/ground.png')
  .add('assets/bucket/frame-001.png')
  .add('assets/bucket/frame-002.png')
  .add('assets/logs/frame-001.png')
  .add('assets/logs/frame-002.png')
  .add('assets/logs.png')
  .add('assets/plank.png')
  .add('assets/plank-large.png')
  .load(setup(app.stage, app.renderer, app.ticker))