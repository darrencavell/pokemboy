import { appReducer} from './app/reducer';

const PREFIX = {
  APP: 'APP',
}

const reducer = (state, action) => {
  if (action.type.includes(PREFIX.APP)) {
    return appReducer(state, action);
  }

  return {
    ...state,
    ...action.payload
  };
}

export default reducer;
