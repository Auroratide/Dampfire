import * as PIXI from 'pixi.js'
import { Resources } from '../aliases.js'

export default class Campfire extends PIXI.Sprite {
  constructor(resources: Resources) {
    super(resources['assets/campfire.png'].texture)
    this.anchor.set(0.5)
  }

  isCollidingWith = (other: PIXI.DisplayObject): boolean => {
    return this.getBounds().contains(other.x, other.y)
  }
}