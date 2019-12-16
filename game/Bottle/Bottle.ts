import * as PIXI from 'pixi.js'
import { Resources } from '../aliases'
import MovementBehaviour from '../movement/MovementBehaviour'
import Campfire from '../Campfire'
import Health from '../domain/Health'
import Score from '../domain/Score'
import Explosions from '../Explosions'
import ScoringLayer from '../ScoringLayer'
import SoundManager from '../SoundManager'

export default class Bottle extends PIXI.AnimatedSprite {
  private ticker: PIXI.Ticker
  private movement: MovementBehaviour
  private campfire: Campfire
  private health: Health
  private score: Score
  private explosions: Explosions
  private scoringLayer: ScoringLayer
  private sfx: SoundManager
  constructor(resources: Resources, ticker: PIXI.Ticker, movement: MovementBehaviour, campfire: Campfire, health: Health, score: Score, explosions: Explosions, scoringLayer: ScoringLayer, sfx: SoundManager) {
    super([resources['assets/bottle/frame-001.png'].texture, resources['assets/bottle/frame-002.png'].texture])
    this.animationSpeed = 0.043
    this.ticker = ticker
    this.movement = movement
    this.campfire = campfire
    this.health = health
    this.score = score
    this.explosions = explosions
    this.scoringLayer = scoringLayer
    this.sfx = sfx

    this.anchor.set(0.5)

    this.interactive = true
    this.on('mousedown', this.onTap).on('touchstart', this.onTap)
    this.ticker.add(this.myUpdate)

    this.play()
  }

  myUpdate = () => {
    if(this.campfire.isCollidingWith(this)) {
      this.health.damage(0.05)
      this.sfx.steam.play()
      this.destroy()
      return
    }

    this.movement.move(this)
  }

  onTap = () => {
    this.scoringLayer.make(this, this.score.add(10))
    this.explosions.make(this)
    this.sfx.flame.play()
    this.destroy()
  }

  destroy() {
    this.ticker.remove(this.myUpdate)
    super.destroy()
  }
}