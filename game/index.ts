import * as PIXI from 'pixi.js'
import config from './config'
import setup from './setup'

const app = new PIXI.Application(config)

document.body.appendChild(app.view)

app.loader
  .add('assets/campfire.png')
  .add('assets/ground.png')
  .add('assets/bucket.png')
  .add('assets/logs.png')
  .add('assets/plank.png')
  .load(setup(app.stage, app.renderer, app.ticker))