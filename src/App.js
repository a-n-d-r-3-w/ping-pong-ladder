import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  getPlayers,
  getSwaps,
} from './actions';
import Header from './Header';
import History from './History';
import Rankings from './Rankings';
import AddPlayer from './AddPlayer';

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      markedPlayer: null,
    }
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
        <AddPlayer />
      </Fragment>);
  }
}

App.propTypes = {
  getPlayers: PropTypes.func.isRequired,
  getSwaps: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  players: state.players,
  swaps: state.swaps
});

const mapDispatchToProps = dispatch => ({
  getPlayers: () => dispatch(getPlayers()),
  getSwaps: () => dispatch(getSwaps()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
