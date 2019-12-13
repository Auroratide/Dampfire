import { Vector } from './types'

export default class Velocity {
  private magnitude: number
  private direction: Vector
  constructor(magnitude: number, direction: Vector) {
    this.magnitude = magnitude
    this.direction = direction
  }
}