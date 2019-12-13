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
    obj.x += 0.01
  }
}