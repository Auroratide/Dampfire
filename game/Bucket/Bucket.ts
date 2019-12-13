import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import MovementBehaviour from '../movement/MovementBehaviour'

export default class Bucket extends PIXI.Sprite {
  private ticker: PIXI.Ticker
  private movement: MovementBehaviour
  constructor(resources: Resources, ticker: PIXI.Ticker, movement: MovementBehaviour) {
    super(resources['assets/bucket.png'].texture)
    this.ticker = ticker
    this.movement = movement

    this.anchor.set(0.5)
    this.ticker.add(this.update)
  }

  update = () => {
    this.movement.move(this)
  }

  destroy() {
    this.ticker.remove(this.update)
    super.destroy()
  }
}