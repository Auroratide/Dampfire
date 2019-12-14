export default class Spawner {
  private start: number = 0
  private end: number = 0
  private interval: { min: number, max: number }
  private spawner: (totalFrames: number) => void

  private nextSpawnTime: number = 0
  private runningFrame: number = 0
  private totalFrames: number = 0
  constructor() {}

  startingAt = (frame: number) => {
    this.start = frame
    return this
  }

  every = (min: number, max: number) => {
    this.interval = { min, max }
    this.nextSpawnTime = this.getNextSpawnTime()
    return this
  }

  endingAt = (frame: number) => {
    this.end = frame
    return this
  }

  spawn = (spawner: (totalFrames: number) => void) => {
    this.spawner = spawner
    return this;
  }

  update = (dt: number) => {
    this.totalFrames += dt
    if(this.start <= this.totalFrames && this.totalFrames <= this.end) {
      this.runningFrame += dt
      if(this.runningFrame >= this.nextSpawnTime) {
        this.nextSpawnTime = this.getNextSpawnTime()
        this.runningFrame = 0
        this.spawner(this.totalFrames)
      }
    }
  }

  getNextSpawnTime = () => Math.random() * (this.interval.max - this.interval.min) + this.interval.min
}