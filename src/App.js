import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createPlayer, getPlayers, deletePlayer} from './actions';

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
    if (isLoading || !players) {
      return (
        <Fragment>
          <h1>Ping-Pong Ladder</h1>
          <div>Loading...</div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <h1>Ping-Pong Ladder</h1>
        <ol>
          {
            this.props.players.map(player =>
              <li>
                {player.name}&nbsp;
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={this.handleDeleteButtonClick(player.playerId)}
                >
                  Delete
                </button>
              </li>)
          }
        </ol>
        <button
          type='button'
          className="btn btn-outline-secondary"
          onClick={createPlayer}
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
