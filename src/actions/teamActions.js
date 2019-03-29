import axios from 'axios';
import ActionType from './ActionType';

export function createTeam (name) {
  return function (dispatch) {
    dispatch({
      type: ActionType.SET_IS_LOADING,
      isLoading: true,
    });
    axios.post('/api/teams', { name })
      .then(() => {
        dispatch({
          type: ActionType.SET_IS_LOADING,
          isLoading: false,
        });
        dispatch(getTeams())
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function getTeams () {
  return function (dispatch) {
    dispatch({
      type: ActionType.SET_IS_LOADING,
      isLoading: true,
    });
    axios.get(`/api/teams`)
      .then(response => {
        dispatch({
          type: ActionType.SET_IS_LOADING,
          isLoading: false,
        });
        const teams = response.data;
        dispatch({
          type: ActionType.SET_TEAMS,
          teams,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function getTeamSwaps () {
  return function (dispatch) {
    dispatch({
      type: ActionType.SET_IS_LOADING,
      isLoading: true,
    });
    axios.get(`/api/teamSwaps`)
      .then(response => {
        dispatch({
          type: ActionType.SET_IS_LOADING,
          isLoading: false,
        });
        const teamSwaps = response.data;
        dispatch({
          type: ActionType.SET_TEAM_SWAPS,
          teamSwaps,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function deleteTeam (teamId) {
  return function (dispatch) {
    axios.delete(`/api/teams/${teamId}`)
      .then(() => {
        dispatch(getTeams());
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function swapTeams (team1Id, team2Id) {
  return function (dispatch) {
    dispatch({
      type: ActionType.SET_IS_LOADING,
      isLoading: true,
    });
    axios.post('/api/teamSwaps', { team1Id, team2Id })
      .then(() => {
        dispatch({
          type: ActionType.SET_IS_LOADING,
          isLoading: false,
        });
        dispatch(getTeams())
        dispatch(getTeamSwaps())
      })
      .catch(error => {
        console.error(error);
      });
  }
}
