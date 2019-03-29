import React from 'react'
import ordinal from 'ordinal';
import {connect} from 'react-redux';
import {
  deleteTeam,
  swapTeams,
} from './actions/teamActions';
import PropTypes from "prop-types";

class TeamRankings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      markedTeam: null,
    }
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleMarkButtonClick = this.handleMarkButtonClick.bind(this);
  }

  handleMarkButtonClick (team) {
    return () => {
      if (!this.state.markedTeam) {
        this.setState({ markedTeam: team });
        return;
      }
      const team1 = this.state.markedTeam;
      const team2 = team;
      const confirmed = window.confirm(`Swap ${team1.name} and ${team2.name}?`);
      if (confirmed) {
        this.props.swapTeams(team1.teamId, team2.teamId);
      }
      this.setState({ markedTeam: null });
    };
  }

  handleDeleteButtonClick ({name, teamId}) {
    return () => {
      const confirmed = window.confirm(`Delete ${name}?`);
      if (confirmed) {
        this.props.deleteTeam(teamId);
      }
    };
  }

  render() {
    return (
      <table className="table">
        <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {
          this.props.teams.map((team, index) => {
            const isMarked = this.state.markedTeam && (this.state.markedTeam.teamId === team.teamId);
            return (
              <tr
                className={isMarked ? 'table-active' : ''}
                key={index}
              >
                <td>{ordinal(team.rank)}</td>
                <td>{team.name}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-sm btn-link"
                      onClick={this.handleMarkButtonClick(team)}
                      disabled={isMarked}
                    >
                      Mark for swap
                    </button>
                    <button
                      className="btn btn-sm btn-link text-secondary"
                      onClick={this.handleDeleteButtonClick(team)}
                      disabled={isMarked}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>);
          })
        }
        </tbody>
      </table>
    )
  }
}

TeamRankings.propTypes = {
  deleteTeam: PropTypes.func.isRequired,
  swapTeams: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  teams: state.teams,
});

const mapDispatchToProps = dispatch => ({
  deleteTeam: teamId => dispatch(deleteTeam(teamId)),
  swapTeams: (team1Id, team2Id) => dispatch(swapTeams(team1Id, team2Id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamRankings);
