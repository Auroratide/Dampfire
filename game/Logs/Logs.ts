import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import MovementBehaviour from '../movement/MovementBehaviour'
import Campfire from '../Campfire'
import Health from '../domain/Health'

export default class Logs extends PIXI.AnimatedSprite {
  private ticker: PIXI.Ticker
  private movement: MovementBehaviour
  private campfire: Campfire
  private health: Health
  constructor(resources: Resources, ticker: PIXI.Ticker, movement: MovementBehaviour, campfire: Campfire, health: Health) {
    super([resources['assets/logs/frame-001.png'].texture, resources['assets/logs/frame-002.png'].texture])
    this.animationSpeed = 0.043
    this.ticker = ticker
    this.movement = movement
    this.campfire = campfire
    this.health = health

    this.anchor.set(0.5)

    this.interactive = true
    this.on('mousedown', this.onTap).on('touchstart', this.onTap)
    this.ticker.add(this.myUpdate)

    this.play()
  }

  myUpdate = () => {
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
    this.ticker.remove(this.myUpdate)
    super.destroy()
  }
}