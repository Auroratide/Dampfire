import * as PIXI from 'pixi.js'
import WaveFactory from "./WaveFactory";
import Wave from './Wave'
import Tutorial from '../tutorial/Tutorial'

export default class WaveDriver {
  private ticker: PIXI.Ticker
  private waveFactory: WaveFactory
  private tutorial: Tutorial
  private currentWave: Wave
  private currentWaveNumber: number = 1
  constructor(ticker: PIXI.Ticker, waveFactory: WaveFactory, tutorial: Tutorial) {
    this.ticker = ticker
    this.waveFactory = waveFactory
    this.tutorial = tutorial
  }

  start = () => {
    this.currentWave = this.waveFactory.wave(this.currentWaveNumber)
    this.ticker.add(this.loop)
    this.showTutorialThenStart()
  }

  stop = () => {
    this.currentWave.stop()
    this.ticker.remove(this.loop)
  }
  
  private loop = () => {
    if(this.currentWave.isDone()) {
      this.advanceWave()
    }
  }

  private advanceWave = () => {
    this.currentWave.stop()
    this.currentWaveNumber += 1
    this.currentWave = this.waveFactory.wave(this.currentWaveNumber)
    this.showTutorialThenStart()
  }

  private showTutorialThenStart = () => {
    this.tutorial.show(this.currentWaveNumber, () => {
      this.currentWave.start()
    })
  }
}