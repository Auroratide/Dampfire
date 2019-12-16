import * as PIXI from 'pixi.js'
import Explosion from './Explosion'
import { Resources } from '../aliases'

export default class Explosions extends PIXI.Container {
  private resources: Resources
  constructor(resources: Resources) {
    super()
    this.resources = resources
  }

  make = (obj: PIXI.DisplayObject) => {
    const explosion = new Explosion(this.resources)
    explosion.position.set(obj.x, obj.y)
    explosion.rotation = Math.random() * Math.PI * 2

    this.addChild(explosion)
  }
}