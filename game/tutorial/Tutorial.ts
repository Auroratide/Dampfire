import * as PIXI from 'pixi.js'
import Save from '../domain/Save'
import Text from './Text'
import { Resources } from '../aliases'
import Positioning from '../tools/Positioning'
import Sequence from './Sequence'
import Campfire from '../Campfire'

export default class Tutorial extends PIXI.Container {
  private save: Save
  text: Text
  private onFinish: () => void = () => {}
  private campfire: Campfire
  constructor(save: Save, resources: Resources, ticker: PIXI.Ticker, positioning: Positioning, campfire: Campfire) {
    super()
    this.save = save
    this.text = new Text(resources, positioning, ticker)
    this.campfire = campfire

    this.addChild(this.text)
  }

  show = (n: number, onFinish: () => void) => {
    this.campfire.pauseDimming()
    this.onFinish = onFinish
    if(parseInt(this.save.tutorial.get()) < n) {
      this.save.tutorial.set(n.toString())
      switch(n) {
        case 1: return new Sequence(this, [
          'Ugh, those bullies are trying to put out my fire again! With buckets of water, no less. (tap for next)',
          'If I TAP the buckets, that should be enough to destroy them!'
        ]).start()
  
        case 2: return new Sequence(this, [
          'My campfire is going out over time... Guess I need to add some wood!',
          'To replenish the fire, I should allow wood logs to pass through by not tapping them.',
          'However, I score more points the dimmer my fire is! Do I play it safe, or do I go hardcore?'
        ]).start()

        case 3: return new Sequence(this, [
          'Oh no! The buckets were too slow, so now they are starting to use water bottles!',
          'They\'re faster, but I can destroy them the same way I destroy the buckets!'
        ]).start()

        case 4: return new Sequence(this, [
          'Now those bullies are gonna throw everything they have at me. Let\'s see how long I can survive!'
        ]).start()
  
        default: this.complete()
      }
    } else {
      this.complete()
    }
  }

  complete = () => {
    this.text.hide()
    this.interactive = false
    this.campfire.resumeDimming()
    this.onFinish()
  }
}