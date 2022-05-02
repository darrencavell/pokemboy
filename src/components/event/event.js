import { GAME_TYPE, TEXT_MESSAGE } from '../../lib/constant';

export const handleEvent = (event, dispatch) => {
  switch(event.type) {
    case TEXT_MESSAGE:
      dispatch({ type: TEXT_MESSAGE, payload: event.payload });
      break;
    case GAME_TYPE:
      dispatch({ type: GAME_TYPE, payload: event.payload });
      break;
  }
}