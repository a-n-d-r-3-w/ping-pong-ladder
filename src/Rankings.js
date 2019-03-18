import React from 'react'
import ordinal from 'ordinal';
import {connect} from 'react-redux';
import {
  deletePlayer,
  swapRanks,
} from './actions';
import PropTypes from "prop-types";

class Rankings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      markedPlayer: null,
    }
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleMarkButtonClick = this.handleMarkButtonClick.bind(this);
  }

  handleMarkButtonClick (player) {
    return () => {
      if (!this.state.markedPlayer) {
        this.setState({ markedPlayer: player });
        return;
      }
      const player1 = this.state.markedPlayer;
      const player2 = player;
      const confirmed = window.confirm(`Swap ${player1.name} and ${player2.name}?`);
      if (confirmed) {
        this.props.swapRanks(player1.playerId, player2.playerId);
      }
      this.setState({ markedPlayer: null });
    };
  }

  handleDeleteButtonClick ({name, playerId}) {
    return () => {
      const confirmed = window.confirm(`Delete ${name}?`);
      if (confirmed) {
        this.props.deletePlayer(playerId);
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
          this.props.players.map((player, index) => {
            const isMarked = this.state.markedPlayer && (this.state.markedPlayer.playerId === player.playerId);
            return (
              <tr
                className={isMarked ? 'table-active' : ''}
                key={index}
              >
                <td>{ordinal(player.rank)}</td>
                <td>{player.name}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-sm btn-link"
                      onClick={this.handleMarkButtonClick(player)}
                      disabled={isMarked}
                    >
                      Mark for swap
                    </button>
                    <button
                      className="btn btn-sm btn-link text-secondary"
                      onClick={this.handleDeleteButtonClick(player)}
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

Rankings.propTypes = {
  deletePlayer: PropTypes.func.isRequired,
  swapRanks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  players: state.players,
});

const mapDispatchToProps = dispatch => ({
  deletePlayer: playerId => dispatch(deletePlayer(playerId)),
  swapRanks: (player1Id, player2Id) => dispatch(swapRanks(player1Id, player2Id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rankings);
