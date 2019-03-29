import ActionType from './actions/ActionType';

const reducers = (state = {}, action) => {
  switch (action.type) {
    case ActionType.SET_PLAYERS:
      const { players } = action;
      return {
        ...state,
        players,
      };
    case ActionType.SET_PLAYER_SWAPS:
      const { playerSwaps } = action;
      return {
        ...state,
        playerSwaps,
      };
    case ActionType.SET_TEAMS:
      const { teams } = action;
      return {
        ...state,
        teams,
      };
    case ActionType.SET_TEAM_SWAPS:
      const { teamSwaps } = action;
      return {
        ...state,
        teamSwaps,
      };
    case ActionType.SET_IS_LOADING:
      const { isLoading } = action;
      return {
        ...state,
        isLoading,
      };
    case ActionType.EDIT_PLAYER:
      const { player } = action
      return {
        ...state,
        editingPlayer: player
      }
    case ActionType.SAVE_PLAYER:
      return {
        ...state,
        editingPlayer: undefined
      }
    case ActionType.CLOSE_EDIT_MODAL:
      return {
        ...state,
        editingPlayer: undefined
      }
    default:
      return state;
  }
};

export default reducers;
