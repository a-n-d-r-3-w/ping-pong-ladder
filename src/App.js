import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createPlayer, getPlayers, deletePlayer} from './actions';

const rankString = number => {
  if (number === 1) {
    return '1st';
  }
  if (number === 2) {
    return '2nd';
  }
  if (number === 3) {
    return '3rd';
  }
  if (number === 21) {
    return '21st';
  }
  if (number === 22) {
    return '22nd';
  }
  if (number === 23) {
    return '23rd';
  }
  return `${number}th`;
}

class App extends React.Component {
  constructor (props) {
    super(props);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
  }

  handleDeleteButtonClick (playerId) {
    return () => {
      this.props.deletePlayer(playerId);
    };
  }

  componentDidMount () {
    this.props.getPlayers();
  }

  render() {
    const { createPlayer, isLoading, players } = this.props;

    const title = <h1 style={{ margin: '1em 0', textAlign: 'center' }}>
      Ping-Pong Ladder
    </h1>;

    if (isLoading || !players) {
      return (
        <Fragment>
          {title}
          <div>Loading...</div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        {title}
        <table className="table">
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
          {
            this.props.players.map(player =>
              <tr>
                <td>{rankString(player.rank)}</td>
                <td>{player.name}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary"
                  >
                    Swap
                  </button>&nbsp;
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={this.handleDeleteButtonClick(player.playerId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>)
          }
        </table>
        <button
          type='button'
          className="btn btn-outline-secondary"
          onClick={createPlayer}
          style={{marginTop: '1em'}}
        >
          Add player
        </button>
      </Fragment>);
  }
}

App.propTypes = {
  createPlayer: PropTypes.func.isRequired,
  deletePlayer: PropTypes.func.isRequired,
  getPlayers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  players: state.players
});

const mapDispatchToProps = dispatch => ({
  createPlayer: () => dispatch(createPlayer()),
  deletePlayer: playerId => dispatch(deletePlayer(playerId)),
  getPlayers: () => dispatch(getPlayers())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
