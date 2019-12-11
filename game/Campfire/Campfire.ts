import * as PIXI from 'pixi.js'
import { Resources } from '../aliases.js'

export default class Campfire extends PIXI.Sprite {
  constructor(resources: Resources) {
    super(resources['assets/campfire.png'].texture)
  }
}