import axios from "axios";

export const SET_PLAYERS = 'SET_PLAYERS';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_IS_SAVING = 'SET_IS_SAVING';

export function createPlayer (name) {
  return function (dispatch) {
    dispatch({
      type: SET_IS_LOADING,
      isLoading: true,
    });
    axios.post('http://localhost:8000/api/players', { name })
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
    axios.get(`http://localhost:8000/api/players`)
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

export function deletePlayer (playerId) {
  return function (dispatch) {
    axios.delete(`http://localhost:8000/api/players/${playerId}`)
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
    axios.post('http://localhost:8000/api/swap', { player1Id, player2Id })
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
