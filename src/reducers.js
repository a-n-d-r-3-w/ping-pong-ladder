import {
  SET_ACCOUNT_ID,
  SET_PEEP_ID,
  SET_PEEPS,
  SET_PEEP,
  SET_IS_LOADING,
  SET_IS_SAVING
} from './actions';

const reducers = (state = {}, action) => {
  switch (action.type) {
    case SET_ACCOUNT_ID:
      const { accountId } = action;
      return {
        ...state,
        accountId,
      };
    case SET_PEEP_ID:
      const { peepId } = action;
      return {
        ...state,
        peepId,
      };
    case SET_PEEPS:
      const { peeps } = action;
      return {
        ...state,
        peeps,
      };
    case SET_PEEP:
      const { peep } = action;
      return {
        ...state,
        peep,
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
