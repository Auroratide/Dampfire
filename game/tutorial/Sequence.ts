import Tutorial from './Tutorial'

export default class Sequence {
  private tutorial: Tutorial
  private texts: string[]
  private current: number = 0
  constructor(tutorial: Tutorial, texts: string[]) {
    this.tutorial = tutorial
    this.texts = texts
  }

  start = () => {
    this.tutorial.interactive = true
    this.tutorial.removeAllListeners()
    this.tutorial.on('mouseup', this.next).on('touchend', this.next)
    this.next()
  }

  private next = () => {
    if(this.current >= this.texts.length) {
      this.tutorial.complete()
    } else {
      this.tutorial.text.showText(this.texts[this.current++])
    }
  }
}