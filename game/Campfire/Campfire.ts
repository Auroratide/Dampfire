import * as PIXI from 'pixi.js'
import { Resources } from '../aliases.js'
import Health from '../domain/Health.js'

export default class Campfire extends PIXI.Sprite {
  private ticker: PIXI.Ticker
  private health: Health
  constructor(resources: Resources, ticker: PIXI.Ticker, health: Health) {
    super(resources['assets/campfire.png'].texture)
    this.ticker = ticker
    this.health = health

    this.anchor.set(0.5)
    this.ticker.add(this.update)
  }

  isCollidingWith = (other: PIXI.DisplayObject): boolean => {
    return this.getBounds().contains(other.x, other.y)
  }

  update = (dt: number) => {
    this.health.damage(0.000166 * dt)
  }

  destroy() {
    this.ticker.remove(this.update)
    super.destroy()
  }
}