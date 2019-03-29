import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  getPlayers,
  getPlayerSwaps,
} from './actions/playerActions';
import {
  getTeams,
  getTeamSwaps,
} from './actions/teamActions';
import Header from './Header';
import Swaps from './Swaps';
import PlayerRankings from './PlayerRankings';
import TeamRankings from './TeamRankings';
import AddPlayer from './AddPlayer';
import AddTeam from './AddTeam';

class App extends React.Component {
  componentDidMount () {
    this.props.getPlayerSwaps();
    this.props.getPlayers();
    this.props.getTeamSwaps();
    this.props.getTeams();
  }

  render() {
    const { isLoading, players, playerSwaps, teams, teamSwaps } = this.props;
    const header = <Header />;

    if (isLoading || !players || !teams) {
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
        <h1>Singles</h1>
        <Swaps swaps={playerSwaps} />
        <PlayerRankings />
        <AddPlayer />
        <h1>Doubles</h1>
        <Swaps swaps={teamSwaps} />
        <TeamRankings />
        <AddTeam />
      </Fragment>);
  }
}

App.propTypes = {
  getPlayers: PropTypes.func.isRequired,
  getPlayerSwaps: PropTypes.func.isRequired,
  getTeams: PropTypes.func.isRequired,
  getTeamSwaps: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  players: state.players,
  playerSwaps: state.playerSwaps,
  teams: state.teams,
  teamSwaps: state.teamSwaps
});

const mapDispatchToProps = dispatch => ({
  getPlayers: () => dispatch(getPlayers()),
  getPlayerSwaps: () => dispatch(getPlayerSwaps()),
  getTeams: () => dispatch(getTeams()),
  getTeamSwaps: () => dispatch(getTeamSwaps()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
