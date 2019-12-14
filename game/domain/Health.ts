export default class Health {
  private max: number
  private current: number
  constructor(max: number, current: number) {
    this.max = max
    this.current = current
  }

  damage = (percent: number) => this.current -= percent * this.max
  ratio = () => this.current / this.max
}