export default class Health {
  private max: number
  private current: number
  constructor(max: number, current: number) {
    this.max = max
    this.current = current
  }

  damage = (amount: number) => this.current -= amount
  ratio = () => this.current / this.max
}