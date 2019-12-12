import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'

export default class Bucket extends PIXI.Sprite {
  constructor(resources: Resources) {
    super(resources['assets/bucket.png'].texture)
  }
}