import {
  SET_PLAYER_ID,
  SET_PLAYERS,
  SET_IS_LOADING,
  SET_IS_SAVING
} from './actions';

const reducers = (state = {}, action) => {
  switch (action.type) {
    case SET_PLAYER_ID:
      const { accountId } = action;
      return {
        ...state,
        accountId,
      };
    case SET_PLAYERS:
      const { peeps } = action;
      return {
        ...state,
        peeps,
      };
    case SET_IS_LOADING:
      const { isLoading } = action;
      return {
        ...state,
        isLoading,
      };
    case SET_IS_SAVING:
      const { isSaving } = action;
      return {
        ...state,
        isSaving,
      };
    default:
      return state;
  }
};

export default reducers;
