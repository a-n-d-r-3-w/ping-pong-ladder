import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  createPlayer,
  getPlayers,
  getSwaps,
} from './actions';
import Header from './Header';
import History from './History';
import Rankings from './Rankings';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      markedPlayer: null,
    }
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  handleAddButtonClick () {
    const name = window.prompt("Enter name:");
    if (!name) {
      return;
    }
    this.props.createPlayer(name);
  }

  componentDidMount () {
    this.props.getSwaps();
    this.props.getPlayers();
  }

  render() {
    const { isLoading, players, swaps } = this.props;
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
        <History swaps={swaps} />
        <Rankings />
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
  getPlayers: PropTypes.func.isRequired,
  getSwaps: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  players: state.players,
  swaps: state.swaps
});

const mapDispatchToProps = dispatch => ({
  createPlayer: name => dispatch(createPlayer(name)),
  getPlayers: () => dispatch(getPlayers()),
  getSwaps: () => dispatch(getSwaps()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
