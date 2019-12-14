import * as PIXI from 'pixi.js'
import { Resources } from './aliases'
import Positioning from './tools/Positioning'
import Campfire from './Campfire'
import Light from './Light'
import Ground from './Ground'
import Health from './domain/Health'
import PlainText from './PlainText'
import PlankButton from './PlankButton'

export default class MenuState extends PIXI.Container {
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
    
    this.background(positioning)
    this.text(positioning)
  }

  private background = (positioning: Positioning) => {
    const health = new Health(100, 66)
    const background = new PIXI.Container()
    const ground = new Ground(this.resources, this.renderer)
    const light = new Light(this.renderer, this.ticker, health)
    positioning.center(light)
    background.addChild(ground)
    background.addChild(light)
    background.mask = light

    this.addChild(background)
  }

  private text = (positioning: Positioning) => {
    const text = new PlainText('Dampfire', 48)
    positioning.centerX(text)
    positioning.y(text, 100)
    
    const playButton = new PlankButton('Play!', this.resources, () => {
      console.log('Play pressed')
    })
    positioning.centerX(playButton)
    positioning.y(playButton, 250)

    this.addChild(text)
    this.addChild(playButton)
  }
}