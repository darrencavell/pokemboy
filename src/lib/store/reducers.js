import { appReducer } from './app/reducer';

const reducer = (state, action) => ({
  app: appReducer(state, action),
})

export default reducer;
