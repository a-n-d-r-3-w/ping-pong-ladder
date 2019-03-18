import {
  SET_PLAYERS,
  SET_IS_LOADING,
  SET_PLAYER_SWAPS,
} from './actions';

const reducers = (state = {}, action) => {
  switch (action.type) {
    case SET_PLAYERS:
      const { players } = action;
      return {
        ...state,
        players,
      };
    case SET_PLAYER_SWAPS:
      const { playerSwaps } = action;
      return {
        ...state,
        playerSwaps,
      };
    case SET_IS_LOADING:
      const { isLoading } = action;
      return {
        ...state,
        isLoading,
      };
    default:
      return state;
  }
};

export default reducers;
