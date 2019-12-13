import * as PIXI from 'pixi.js'

export default interface MovementBehaviour {
  move(obj: PIXI.DisplayObject): void
}