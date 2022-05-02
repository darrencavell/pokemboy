import { ENCOUNTER_POKEMON, EVENTS, GAME_TYPE, OVERWORLD, TEXT_MESSAGE } from '../../constant'

export const initialState = {
  app: {
    gameType: OVERWORLD,
    // gameType: ENCOUNTER_POKEMON,
    textMessage: null,
    events: [
      { type: TEXT_MESSAGE, payload: 'Welcome to Pokemboy! I am glad you are here.' },
      { type: TEXT_MESSAGE, payload: 'Here\' a little simulator to experience the journey of playing pokemon in my childhood!' },
      { type: TEXT_MESSAGE, payload: 'Hope you enjoy!' }
    ]
  }
}

export const appReducer = (state, action) => {
  if (action.type === EVENTS) {
    return {
      ...state.app,
      events: action.payload
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
}
