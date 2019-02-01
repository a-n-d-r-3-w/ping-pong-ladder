import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createPlayer, getPlayers} from './actions';

class App extends React.Component {
  componentDidMount () {
    this.props.getPlayers();
  }

  render() {
    const { createPlayer, isLoading } = this.props;
    if (isLoading) {
      return (
        <Fragment>
          Loading...
        </Fragment>
      );
    }
    return (
      <Fragment>
        <button
          type='button'
          className="btn btn-primary"
          onClick={createPlayer}
        >
          Create player
        </button>
      </Fragment>);
  }
}

App.propTypes = {
  createPlayer: PropTypes.func.isRequired,
  getPlayers: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
  createPlayer: () => dispatch(createPlayer()),
  getPlayers: () => dispatch(getPlayers())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
