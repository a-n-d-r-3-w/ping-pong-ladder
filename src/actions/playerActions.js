import axios from "axios";
import ActionType from './ActionType';

export function createPlayer (name) {
  return function (dispatch) {
    dispatch({
      type: ActionType.SET_IS_LOADING,
      isLoading: true,
    });
    axios.post('/api/players', { name })
      .then(() => {
        dispatch({
          type: ActionType.SET_IS_LOADING,
          isLoading: false,
        });
        dispatch(getPlayers())
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function getPlayers () {
  return function (dispatch) {
    dispatch({
      type: ActionType.SET_IS_LOADING,
      isLoading: true,
    });
    axios.get(`/api/players`)
      .then(response => {
        dispatch({
          type: ActionType.SET_IS_LOADING,
          isLoading: false,
        });
        const players = response.data;
        dispatch({
          type: ActionType.SET_PLAYERS,
          players,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function getPlayerSwaps () {
  return function (dispatch) {
    dispatch({
      type: ActionType.SET_IS_LOADING,
      isLoading: true,
    });
    axios.get(`/api/playerSwaps`)
      .then(response => {
        dispatch({
          type: ActionType.SET_IS_LOADING,
          isLoading: false,
        });
        const playerSwaps = response.data;
        dispatch({
          type: ActionType.SET_PLAYER_SWAPS,
          playerSwaps,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function deletePlayer (playerId) {
  return function (dispatch) {
    axios.delete(`/api/players/${playerId}`)
      .then(() => {
        dispatch(getPlayers());
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function swapPlayers (player1Id, player2Id) {
  return function (dispatch) {
    dispatch({
      type: ActionType.SET_IS_LOADING,
      isLoading: true,
    });
    axios.post('/api/playerSwaps', { player1Id, player2Id })
      .then(() => {
        dispatch({
          type: ActionType.SET_IS_LOADING,
          isLoading: false,
        });
        dispatch(getPlayers())
        dispatch(getPlayerSwaps())
      })
      .catch(error => {
        console.error(error);
      });
  }
}

export function savePlayer (playerId, playerName, slackName) {
  return function (dispatch) {
    dispatch({
      type: ActionType.SET_IS_LOADING,
      isLoading: true
    })
    axios.put(`/api/players/${playerId}`, {
      playerName,
      slackName
    })
      .then(() => {
        dispatch({ type: ActionType.SAVE_PLAYER })
        dispatch({
          type: ActionType.SET_IS_LOADING,
          isLoading: false,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}