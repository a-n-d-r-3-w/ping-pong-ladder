import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  createPlayer,
  getPlayers,
  deletePlayer,
  swapRanks,
} from './actions';
import diskun from './images/diskun.png'

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
    this.state = {
      markedPlayer: null,
    }
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleMarkButtonClick = this.handleMarkButtonClick.bind(this);
  }

  handleAddButtonClick () {
    const name = window.prompt("Enter name:");
    if (!name) {
      return;
    }
    this.props.createPlayer(name);
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

  componentDidMount () {
    this.props.getPlayers();
  }

  render() {
    const { isLoading, players } = this.props;
    const title = <div>
      <h1 style={{ margin: '1em 0', textAlign: 'center' }}>
        <img src={diskun} alt="diskun" />
        Ping-Pong Ladder
      </h1>
    </div>;

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
            this.props.players.map(player => {
              const isMarked = this.state.markedPlayer && (this.state.markedPlayer.playerId === player.playerId);
              return (
                <tr
                  className={isMarked ? 'table-active' : ''}>
                  <td>{rankString(player.rank)}</td>
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
        </table>
        <button
          type='button'
          className="btn btn-outline-secondary"
          onClick={this.handleAddButtonClick}
          style={{margin: '1em 0 10em 0'}}
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
  swapRanks: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  players: state.players
});

const mapDispatchToProps = dispatch => ({
  createPlayer: name => dispatch(createPlayer(name)),
  deletePlayer: playerId => dispatch(deletePlayer(playerId)),
  getPlayers: () => dispatch(getPlayers()),
  swapRanks: (player1Id, player2Id) => dispatch(swapRanks(player1Id, player2Id))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
