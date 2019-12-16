import SOUND from 'pixi-sound'

export default class SoundManager {
  flame: SOUND.Sound
  wood: SOUND.Sound
  steam: SOUND.Sound
  constructor() {
    this.flame = SOUND.Sound.from('assets/sfx/flame.mp3')
    this.wood = SOUND.Sound.from('assets/sfx/wood.mp3')
    this.steam = SOUND.Sound.from('assets/sfx/steam.mp3')
  }
}