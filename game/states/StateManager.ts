import State from "./State"

export default class StateManager {
  private currentState: string = ''
  private states: { [name: string]: State } = {}
  constructor() {}

  register = (name: string, state: State) => {
    this.states[name] = state
  }

  firstState = (state: string) => {
    this.currentState = state
    this.states[this.currentState].start()
  }

  transitionTo = (state: string) => {
    this.states[this.currentState].stop()
    this.currentState = state
    this.states[this.currentState].start()
  }
}