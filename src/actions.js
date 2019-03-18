import axios from "axios";

export const SET_PLAYERS = 'SET_PLAYERS';
export const SET_PLAYER_SWAPS = 'SET_PLAYER_SWAPS';
export const SET_IS_LOADING = 'SET_IS_LOADING';

export function createPlayer (name) {
  return function (dispatch) {
    dispatch({
      type: SET_IS_LOADING,
      isLoading: true,
    });
    axios.post('/api/players', { name })
      .then(() => {
        dispatch({
          type: SET_IS_LOADING,
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
      type: SET_IS_LOADING,
      isLoading: true,
    });
    axios.get(`/api/players`)
      .then(response => {
        dispatch({
          type: SET_IS_LOADING,
          isLoading: false,
        });
        const players = response.data;
        dispatch({
          type: SET_PLAYERS,
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
      type: SET_IS_LOADING,
      isLoading: true,
    });
    axios.get(`/api/playerSwaps`)
      .then(response => {
        dispatch({
          type: SET_IS_LOADING,
          isLoading: false,
        });
        const playerSwaps = response.data;
        dispatch({
          type: SET_PLAYER_SWAPS,
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

export function swapRanks (player1Id, player2Id) {
  return function (dispatch) {
    dispatch({
      type: SET_IS_LOADING,
      isLoading: true,
    });
    axios.post('/api/playerSwaps', { player1Id, player2Id })
      .then(() => {
        dispatch({
          type: SET_IS_LOADING,
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
