import {
  DIRECTIONS,
  EVENTS,
  FADE,
  GAME_TYPE,
  GRAPHQL,
  MAIN,
  SPLASH_SCREEN,
  STATE,
  TEXT_MESSAGE
} from '../../constant'

export const initialState = {
  app: {
    main: {
      x: 5,
      y: 7,
      movingProgress: 0,
      behaviour: {
        type: '',
        direction: ''
      },
      currentBehaviour: null,
      isEncounteringWildPokemon: false,
      wildPokemonIndex: null,
      myPokemons: []
    },
    gameType: SPLASH_SCREEN,
    textMessage: null,
    events: [],
    directions: [],
    walls: {
      '1x7': true,
      '1x8': true,
      '1x9': true,
      '1x10': true,
      '1x16': true,
      '2x6': true,
      '2x11': true,
      '2x15': true,
      '2x17': true,
      '3x6': true,
      '3x11': true,
      '3x15': true,
      '3x18': true,
      '4x6': true,
      '4x11': true,
      '4x15': true,
      '4x19': true,
      '5x6': true,
      '5x11': true,
      '5x15': true,
      '5x19': true,
      '6x6': true,
      '6x11': true,
      '6x15': true,
      '6x19': true,
      '7x6': true,
      '7x11': true,
      '7x12': true,
      '7x13': true,
      '7x14': true,
      '7x15': true,
      '7x19': true,
      '8x6': true,
      '8x19': true,
      '9x19': true,
      '10x6': true,
      '10x19': true,
      '11x6': true,
      '11x12': true,
      '11x13': true,
      '11x14': true,
      '11x15': true,
      '11x19': true,
      '12x6': true,
      '12x12': true,
      '12x15': true,
      '12x19': true,
      '13x6': true,
      '13x8': true,
      '13x12': true,
      '13x15': true,
      '13x8': true,
      '13x19': true,
      '14x5': true,
      '14x12': true,
      '14x15': true,
      '14x16': true,
      '14x19': true,
      '15x12': true,
      '15x15': true,
      '15x19': true,
      '16x5': true,
      '16x12': true,
      '16x15': true,
      '16x19': true,
      '17x5': true,
      '17x12': true,
      '17x15': true,
      '17x19': true,
      '18x6': true,
      '18x12': true,
      '18x16': true,
      '18x17': true,
      '18x18': true,
      '19x6': true,
    },
    fader: '',
    graphql: {
      pokemons: {
        limit: 10,
        data: []
      },
      pokemonDetail: {
        name: '',
        data: {}
      }
    }
  }
}

export const appReducer = (state, action) => {
  if (action.type === STATE) {
    return {
      ...state.app,
      ...action.payload.app
    }
  }

  if (action.type === MAIN) {
    return {
      ...state.app,
      main: action.payload
    }
  }

  if (action.type === EVENTS) {
    return {
      ...state.app,
      events: action.payload
    }
  }

  if (action.type === DIRECTIONS) {
    return {
      ...state.app,
      directions: action.payload
    }
  }

  if (action.type === TEXT_MESSAGE) {
    return {
      ...state.app,
      textMessage: action.payload
    }
  }

  if (action.type === GAME_TYPE) {
    return {
      ...state.app,
      gameType: action.payload
    }
  }

  if (action.type === FADE) {
    return {
      ...state.app,
      fader: action.payload
    }
  }

  if (action.type === GRAPHQL) {
    return {
      ...state.app,
      graphql: action.payload
    }
  }
}
