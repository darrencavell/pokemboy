import { createContext, useContext, useReducer } from 'react';

import storeReducers from './store/reducers';

const GameEngineContext = createContext({
  store: {
    app: {
      gameType: 'overworld',
      textMessage: null,
      events: []
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
