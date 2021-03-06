import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import Positioning from '../tools/Positioning'
import Campfire from '../Campfire'
import Light from '../Light'
import Ground from '../Ground'
import WaveEntities from '../waves/WaveEntities'
import WaveDriver from '../waves/WaveDriver'
import WaveFactory from '../waves/WaveFactory'
import Health from '../domain/Health'
import Score from '../domain/Score'
import State from './State'
import StateManager from './StateManager'
import PlainText from '../PlainText'
import Save from '../domain/Save'
import Tutorial from '../tutorial/Tutorial'
import Explosions from '../Explosions'
import ScoringLayer from '../ScoringLayer'
import SoundManager from '../SoundManager'

export default class PlayState extends PIXI.Container implements State {
  private renderer: PIXI.Renderer
  private ticker: PIXI.Ticker
  private resources: Resources
  private stateManager: StateManager
  private save: Save
  private sfx: SoundManager

  private health: Health
  private score: Score
  private scoreText: PlainText
  private waveDriver: WaveDriver
  constructor(renderer: PIXI.Renderer, ticker: PIXI.Ticker, resources: Resources, stateManager: StateManager, save: Save, sfx: SoundManager) {
    super()

    this.renderer = renderer
    this.ticker = ticker
    this.resources = resources
    this.stateManager = stateManager
    this.save = save
    this.sfx = sfx
  }

  start = () => {
    const gameLayer = new PIXI.Container()
    const explosions = new Explosions(this.resources)
    const scoringLayer = new ScoringLayer(this.ticker)
    const uiLayer = new PIXI.Container()

    const positioning = new Positioning(this.renderer)
    this.health = new Health(100, 100)
    this.score = new Score(this.health, 0)
    this.scoreText = new PlainText(this.score.value().toString(), 24, 'right')
    this.scoreText.anchor.set(1, 0)
    positioning.topRight(this.scoreText, 8)

    const ground = new Ground(this.resources, this.renderer)
    const campfire = new Campfire(this.resources, this.ticker, this.health)
    const light = new Light(this.renderer, this.ticker, this.health)

    const tutorial = new Tutorial(this.save, this.resources, this.ticker, positioning, campfire)
    const waveEntities = new WaveEntities(this.ticker, this.resources, campfire, this.health, positioning, this.score, explosions, scoringLayer, this.sfx)
    const waveFactory = new WaveFactory(this.ticker, waveEntities)
    this.waveDriver = new WaveDriver(this.ticker, waveFactory, waveEntities, tutorial)

    positioning.center(campfire)
    positioning.center(light)

    gameLayer.addChild(ground)
    gameLayer.addChild(campfire)
    gameLayer.addChild(waveEntities)
    gameLayer.addChild(light)

    gameLayer.mask = light


    uiLayer.addChild(this.scoreText)
    uiLayer.addChild(tutorial)

    this.addChild(gameLayer)
    this.addChild(explosions)
    this.addChild(scoringLayer)
    this.addChild(uiLayer)

    this.ticker.add(this.updateScore)
    this.ticker.add(this.checkForGameOver)
    
    this.waveDriver.start()
  }

  stop = () => {
    this.mask = null
    this.waveDriver.stop()
    this.ticker.remove(this.updateScore)
    this.ticker.remove(this.checkForGameOver)
    this.removeChildren().forEach(child => {
      if(child instanceof PIXI.Container) {
        child.destroy({ children: true })
      } else {
        child.destroy()
      }
    })
  }

  checkForGameOver = () => {
    if(this.health.isDead()) {
      if(this.score.value() > parseInt(this.save.highscore.get()))
        this.save.highscore.set(this.score.value().toString())

      this.sfx.steam.play()
      this.stateManager.transitionTo('game over', {
        score: this.score
      })
    }
  }

  updateScore = () => {
    this.scoreText.text = this.score.value().toString()
  }
}