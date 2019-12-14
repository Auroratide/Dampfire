import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import Positioning from '../tools/Positioning'
import Campfire from '../Campfire'
import Light from '../Light'
import Ground from '../Ground'
import Wave from '../waves/Wave'
import Health from '../domain/Health'
import State from './State'
import StateManager from './StateManager'

export default class PlayState extends PIXI.Container implements State {
  private renderer: PIXI.Renderer
  private ticker: PIXI.Ticker
  private resources: Resources
  private stateManager: StateManager

  private health: Health
  constructor(renderer: PIXI.Renderer, ticker: PIXI.Ticker, resources: Resources, stateManager: StateManager) {
    super()

    this.renderer = renderer
    this.ticker = ticker
    this.resources = resources
    this.stateManager = stateManager
  }

  start = () => {
    const positioning = new Positioning(this.renderer)
    this.health = new Health(100, 100)

    const ground = new Ground(this.resources, this.renderer)
    const campfire = new Campfire(this.resources, this.ticker, this.health)
    const light = new Light(this.renderer, this.ticker, this.health)

    const wave = new Wave(this.ticker, this.resources, campfire, this.health, positioning)

    positioning.center(campfire)
    positioning.center(light)

    this.addChild(ground)
    this.addChild(campfire)
    this.addChild(wave)
    this.addChild(light)

    this.mask = light

    this.ticker.add(this.checkForGameOver)
    wave.start()
  }

  stop = () => {
    this.mask = null
    this.ticker.remove(this.checkForGameOver)
    this.removeChildren().forEach(child => child.destroy())
  }

  checkForGameOver = () => {
    if(this.health.isDead()) {
      this.stateManager.transitionTo('game over')
    }
  }
}