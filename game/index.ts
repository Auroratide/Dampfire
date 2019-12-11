import * as PIXI from 'pixi.js'
import config from './config'
import setup from './setup'

const app = new PIXI.Application(config)

document.body.appendChild(app.view)

app.loader
  .add('assets/campfire.png')
  .load(setup(app.stage))