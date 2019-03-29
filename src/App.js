import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  getPlayers,
  getPlayerSwaps,
} from './actions/playerActions';
import Header from './Header';
import Swaps from './Swaps';
import PlayerRankings from './PlayerRankings';
import AddPlayer from './AddPlayer';

class App extends React.Component {
  componentDidMount () {
    this.props.getPlayerSwaps();
    this.props.getPlayers();
  }

  render() {
    const { isLoading, players, playerSwaps } = this.props;
    const header = <Header />;

    if (isLoading || !players) {
      return (
        <Fragment>
          {header}
          <div>Loading...</div>
        </Fragment>
      );
    }

    return (
      <Fragment>
        {header}
        <Swaps swaps={playerSwaps} />
        <PlayerRankings />
        <AddPlayer />
      </Fragment>);
  }
}

App.propTypes = {
  getPlayers: PropTypes.func.isRequired,
  getPlayerSwaps: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  players: state.players,
  playerSwaps: state.playerSwaps
});

const mapDispatchToProps = dispatch => ({
  getPlayers: () => dispatch(getPlayers()),
  getPlayerSwaps: () => dispatch(getPlayerSwaps()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
