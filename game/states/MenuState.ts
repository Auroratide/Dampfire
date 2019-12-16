import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import Positioning from '../tools/Positioning'
import Campfire from '../Campfire'
import Light from '../Light'
import Ground from '../Ground'
import Health from '../domain/Health'
import PlainText from '../PlainText'
import PlankButton from '../PlankButton'
import State from './State'
import StateManager from './StateManager'
import Save from '../domain/Save'

export default class MenuState extends PIXI.Container implements State {
  private renderer: PIXI.Renderer
  private ticker: PIXI.Ticker
  private resources: Resources
  private stateManager: StateManager
  private save: Save
  constructor(renderer: PIXI.Renderer, ticker: PIXI.Ticker, resources: Resources, stateManager: StateManager, save: Save) {
    super()

    this.renderer = renderer
    this.ticker = ticker
    this.resources = resources
    this.stateManager = stateManager
    this.save = save
  }

  start = () => {
    const positioning = new Positioning(this.renderer)
    
    this.background(positioning)
    this.text(positioning)
  }

  stop = () => {
    this.removeChildren().forEach(child => child.destroy())
  }

  private background = (positioning: Positioning) => {
    const health = new Health(100, 66)
    const campfire = new Campfire(this.resources, this.ticker, health)
    campfire.pauseDimming()
    positioning.centerX(campfire)
    positioning.y(campfire, 350)

    const background = new PIXI.Container()
    const ground = new Ground(this.resources, this.renderer)
    const light = new Light(this.renderer, this.ticker, health)
    positioning.centerX(light)
    positioning.y(light, 350)
    background.addChild(ground)
    background.addChild(campfire)
    background.addChild(light)
    background.mask = light

    this.addChild(background)
  }

  private text = (positioning: Positioning) => {
    const title = new PlainText('Dampfire', 48)
    positioning.centerX(title)
    positioning.y(title, 100)

    const credits = new PlainText('By Timothy Foster for OMGJam 6\nMusic: "Corncob" by Kevin MacLeod, CC BY', 18)
    credits.anchor.set(0.5, 1)
    positioning.bottomCenter(credits)

    const highscore = new PlainText(`Highscore: ${this.save.highscore.get()}`, 24)
    positioning.centerX(highscore)
    positioning.y(highscore, 190)
    
    const playButton = new PlankButton('Play!', this.resources, () => {
      this.stateManager.transitionTo('play')
    })
    positioning.centerX(playButton)
    positioning.y(playButton, 250)

    this.addChild(title)
    this.addChild(highscore)
    this.addChild(credits)
    this.addChild(playButton)
  }
}