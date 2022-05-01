export const INITIALIZE_CANVAS = 'APP/INITIALIZE_CANVAS';

export const initialState = {
  context:  null,
}

export const appReducer = (state, action) => {
  if (action.type === INITIALIZE_CANVAS) {
    return {
      ...state,
      ...action.payload
    }
  }
}
