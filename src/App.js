import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createPlayer, getPlayers} from './actions';

class App extends React.Component {
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
                <button className="btn btn-sm btn-outline-danger">Delete</button>
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
  getPlayers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  players: state.players
});

const mapDispatchToProps = dispatch => ({
  createPlayer: () => dispatch(createPlayer()),
  getPlayers: () => dispatch(getPlayers())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
