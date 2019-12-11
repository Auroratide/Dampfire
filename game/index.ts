import * as PIXI from 'pixi.js'
import config from './config'

const app = new PIXI.Application(config)

document.body.appendChild(app.view)
