import Health from './Health'

export default class Score {
  private health: Health
  private score: number
  constructor(health: Health, initial: number = 0) {
    this.health = health
    this.score = initial
  }

  value = () => { return Math.round(this.score) }

  add = (amount: number): number => {
    const r = this.health.ratio()
    const trueAmount = amount * (2 * r * r - 5 * r + 4) // curve based on hp
    this.score += trueAmount

    return trueAmount
  }
}