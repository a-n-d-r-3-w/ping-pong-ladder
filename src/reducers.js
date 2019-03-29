import {
  SET_PLAYERS,
  SET_IS_LOADING,
  SET_PLAYER_SWAPS,
  SAVE_PLAYER,
  CLOSE_EDIT_MODAL,
  EDIT_PLAYER
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
    case EDIT_PLAYER:
      const { player } = action
      return {
        ...state,
        editingPlayer: player
      }
    case SAVE_PLAYER:
      return {
        ...state,
        editingPlayer: undefined
      }
    case CLOSE_EDIT_MODAL:
      return {
        ...state,
        editingPlayer: undefined
      }
    default:
      return state;
  }
};

export default reducers;
