import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  getPlayers,
  getPlayerSwaps,
} from './actions';
import Header from './Header';
import History from './History';
import Rankings from './Rankings';
import AddPlayer from './AddPlayer';
import EditPlayerModal from "./EditPlayerModal"

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
        <EditPlayerModal />
        <History swaps={playerSwaps} />
        <Rankings />
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
