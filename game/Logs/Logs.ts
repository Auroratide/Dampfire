import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import MovementBehaviour from '../movement/MovementBehaviour'
import Campfire from '../Campfire'
import Health from '../domain/Health'

export default class Logs extends PIXI.Sprite {
  private ticker: PIXI.Ticker
  private movement: MovementBehaviour
  private campfire: Campfire
  private health: Health
  constructor(resources: Resources, ticker: PIXI.Ticker, movement: MovementBehaviour, campfire: Campfire, health: Health) {
    super(resources['assets/logs.png'].texture)
    this.ticker = ticker
    this.movement = movement
    this.campfire = campfire
    this.health = health

    this.anchor.set(0.5)

    this.interactive = true
    this.on('mouseup', this.onTap).on('touchend', this.onTap)
    this.ticker.add(this.update)
  }

  update = () => {
    if(this.campfire.isCollidingWith(this)) {
      this.health.heal(0.1)
      this.destroy()
      return
    }

    this.movement.move(this)
  }

  onTap = () => {
    this.destroy()
  }

  destroy() {
    this.ticker.remove(this.update)
    super.destroy()
  }
}