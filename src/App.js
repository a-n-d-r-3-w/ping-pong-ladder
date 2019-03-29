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
import EditPlayerModal from "./EditPlayerModal";

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = { isSinglesSelected: true };
    this.handleSinglesTabClick = this.handleSinglesTabClick.bind(this);
    this.handleDoublesTabClick = this.handleDoublesTabClick.bind(this);
  }

  componentDidMount () {
    this.props.getPlayerSwaps();
    this.props.getPlayers();
    this.props.getTeamSwaps();
    this.props.getTeams();
  }

  handleSinglesTabClick (event) {
    event.preventDefault(); // Don't scroll to the top.
    this.setState({ isSinglesSelected: true });
  }

  handleDoublesTabClick (event) {
    event.preventDefault(); // Don't scroll to the top.
    this.setState({ isSinglesSelected: false });
  }

  render() {
    const { isLoading, players, playerSwaps, teams, teamSwaps } = this.props;
    const { isSinglesSelected } = this.state;
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
        <EditPlayerModal />
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={`nav-link ${isSinglesSelected ? "active" : ""}`} href="#" onClick={this.handleSinglesTabClick}>Singles</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${isSinglesSelected ? "" : "active"}`} href="#" onClick={this.handleDoublesTabClick}>Doubles</a>
          </li>
        </ul>
        {this.state.isSinglesSelected &&
        <Fragment>
          <Swaps swaps={playerSwaps} />
            <PlayerRankings />
            <AddPlayer />
        </Fragment>
        }

        {!this.state.isSinglesSelected &&
        <Fragment>
          <Swaps swaps={teamSwaps}/>
          <TeamRankings/>
          <AddTeam/>
        </Fragment>
        }
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
