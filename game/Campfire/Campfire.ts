import * as PIXI from 'pixi.js'
import { Resources } from '../aliases.js'
import Health from '../domain/Health.js'

export default class Campfire extends PIXI.AnimatedSprite {
  private ticker: PIXI.Ticker
  private health: Health
  private dimming: boolean = true
  constructor(resources: Resources, ticker: PIXI.Ticker, health: Health) {
    super([
      resources['assets/campfire/frame-001.png'].texture,
      resources['assets/campfire/frame-002.png'].texture,
      resources['assets/campfire/frame-003.png'].texture,
      resources['assets/campfire/frame-004.png'].texture
    ])
    this.animationSpeed = 0.043
    this.ticker = ticker
    this.health = health

    this.anchor.set(0.5)
    this.ticker.add(this.myUpdate)

    this.play()
  }

  isCollidingWith = (other: PIXI.DisplayObject): boolean => {
    return this.getBounds().contains(other.x, other.y)
  }

  myUpdate = (dt: number) => {
    if(this.dimming)
      this.health.damage(0.000166 * dt)
  }

  destroy() {
    this.ticker.remove(this.myUpdate)
    super.destroy()
  }

  pauseDimming = () => this.dimming = false
  resumeDimming = () => this.dimming = true
}