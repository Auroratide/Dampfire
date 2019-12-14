export default class Health {
  private max: number
  private current: number
  constructor(max: number, current: number) {
    this.max = max
    this.current = current
  }

  damage = (percent: number) => this.current -= percent * this.max
  heal = (percent: number) => this.current = Math.min(this.max, this.current + percent * this.max)
  ratio = () => this.current / this.max
  isDead = () => this.current <= 0
}