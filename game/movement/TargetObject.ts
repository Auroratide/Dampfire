import * as PIXI from 'pixi.js'
import MovementBehaviour from './MovementBehaviour'

export default class TargetObject implements MovementBehaviour {
  private speed: number
  private target: PIXI.DisplayObject
  constructor(speed: number, target: PIXI.DisplayObject) {
    this.speed = speed
    this.target = target
  }

  move(obj: PIXI.DisplayObject) {
    const dx = this.target.x - obj.x
    const dy = this.target.y - obj.y
    const s = this.speed / Math.sqrt(dx * dx + dy * dy)
    obj.position.set(obj.x + dx * s, obj.y + dy * s)
  }
}