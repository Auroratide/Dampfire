import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import MovementBehaviour from '../movement/MovementBehaviour'
import Campfire from '../Campfire'
import Health from '../domain/Health'
import Score from '../domain/Score'

export default class Bucket extends PIXI.AnimatedSprite {
  private ticker: PIXI.Ticker
  private movement: MovementBehaviour
  private campfire: Campfire
  private health: Health
  private score: Score
  constructor(resources: Resources, ticker: PIXI.Ticker, movement: MovementBehaviour, campfire: Campfire, health: Health, score: Score) {
    super([resources['assets/bucket/frame-001.png'].texture, resources['assets/bucket/frame-002.png'].texture])
    this.animationSpeed = 0.043
    this.ticker = ticker
    this.movement = movement
    this.campfire = campfire
    this.health = health
    this.score = score

    this.anchor.set(0.5)

    this.interactive = true
    this.on('mousedown', this.onTap).on('touchstart', this.onTap)
    this.ticker.add(this.myUpdate)

    this.play()
  }

  // Cannot be update() because AnimatedSprite defines this function in a non-overridable way
  myUpdate = () => {
    if(this.campfire.isCollidingWith(this)) {
      this.health.damage(0.1)
      this.destroy()
      return
    }

    this.movement.move(this)
  }

  onTap = () => {
    this.score.add(10)
    this.destroy()
  }

  destroy() {
    this.ticker.remove(this.myUpdate)
    super.destroy()
  }
}