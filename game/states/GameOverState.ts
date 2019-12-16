import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import Positioning from '../tools/Positioning'
import Light from '../Light'
import Health from '../domain/Health'
import PlainText from '../PlainText'
import PlankButton from '../PlankButton'
import State from './State'
import StateManager from './StateManager'
import Save from '../domain/Save'
import Score from '../domain/Score'

interface GameOverContext {
  score: Score
}

export default class GameOverState extends PIXI.Container implements State {
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

  start = (context: GameOverContext) => {
    const positioning = new Positioning(this.renderer)
    
    this.background(positioning)
    this.text(positioning, context.score)
  }

  stop = () => {
    this.removeChildren().forEach(child => child.destroy())
  }

  private background = (positioning: Positioning) => {
    const health = new Health(100, 0)
    const background = new PIXI.Container()
    const light = new Light(this.renderer, this.ticker, health)
    positioning.center(light)
    background.addChild(light)
    background.mask = light

    this.addChild(background)
  }

  private text = (positioning: Positioning, score: Score) => {
    const text = new PlainText('The fire went out!', 48)
    positioning.centerX(text)
    positioning.y(text, 100)

    const scoreText = new PlainText(`Score: ${score.value()}`, 22)
    positioning.centerX(scoreText)
    positioning.y(scoreText, 200)
    
    const playButton = new PlankButton('Play Again', this.resources, () => {
      this.stateManager.transitionTo('play')
    })
    positioning.centerX(playButton)
    positioning.y(playButton, 250)

    const mainMenuButton = new PlankButton('Main Menu', this.resources, () => {
      this.stateManager.transitionTo('menu')
    })
    positioning.centerX(mainMenuButton)
    positioning.y(mainMenuButton, 300)

    this.addChild(text)
    this.addChild(scoreText)
    this.addChild(playButton)
    this.addChild(mainMenuButton)
  }
}