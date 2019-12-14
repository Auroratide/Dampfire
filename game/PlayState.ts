import * as PIXI from 'pixi.js'
import { Resources } from './aliases'
import Positioning from './tools/Positioning'
import Campfire from './Campfire'
import Light from './Light'
import Ground from './Ground'
import Wave from './waves/Wave'
import Health from './domain/Health'

export default class PlayState extends PIXI.Container {
  private renderer: PIXI.Renderer
  private ticker: PIXI.Ticker
  private resources: Resources
  constructor(renderer: PIXI.Renderer, ticker: PIXI.Ticker, resources: Resources) {
    super()

    this.renderer = renderer
    this.ticker = ticker
    this.resources = resources
  }

  start = () => {
    const positioning = new Positioning(this.renderer)
    const health = new Health(100, 100)

    const ground = new Ground(this.resources, this.renderer)
    const campfire = new Campfire(this.resources, this.ticker, health)
    const light = new Light(this.renderer, this.ticker, health)

    const wave = new Wave(this.ticker, this.resources, campfire, health, positioning)

    positioning.center(campfire)
    positioning.center(light)

    this.addChild(ground)
    this.addChild(campfire)
    this.addChild(wave)
    this.addChild(light)

    this.mask = light

    wave.start()
  }
}