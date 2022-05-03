import { createContext, useContext, useReducer } from 'react';

import storeReducers from './store/reducers';

const GameEngineContext = createContext({
  store: {
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
        isEncounteringWildPokemon: false
      },
      gameType: 'overworld',
      textMessage: null,
      events: [],
      directions: [],
      walls: [],
      fader: '',
    }
  },
  dispatch: () => {}
});

export const useStore = () => useContext(GameEngineContext);

export const GameEnginerProvider = (props) => {
  const { children, initialState } = props;

  const [store, dispatch] = useReducer(storeReducers, initialState);

  return (
    <GameEngineContext.Provider value={{ store, dispatch }}>
      {children}
    </GameEngineContext.Provider>
  )
}
