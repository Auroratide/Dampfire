export default class Save {
  highscore: SaveValue
  tutorial: SaveValue
  constructor(storage: Storage) {
    this.highscore = new SaveValue(storage, 'com.auroratide.dampfire::highscore', '0')
    this.tutorial = new SaveValue(storage, 'com.auroratide.dampfire::tutorial', '0')
  }
}

class SaveValue {
  private storage: Storage
  private key: string
  private default: string
  constructor(storage: Storage, key: string, defaultValue: string) {
    this.storage = storage
    this.key = key
    this.default = defaultValue
  }

  get = () => this.storage.getItem(this.key) || this.default

  set = (value: string) => this.storage.setItem(this.key, value)
}