import * as PIXI from 'pixi.js'

export default class Campfire extends PIXI.Sprite {
  constructor(app: PIXI.Application) {
    super(app.loader.resources['assets/campfire.png'].texture)
  }
}