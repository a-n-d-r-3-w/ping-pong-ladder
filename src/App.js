import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createPlayer} from './actions';

const App = ({ onClickCreatePlayer, isLoading }) => {
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
        onClick={onClickCreatePlayer}
      >
        Create player
      </button>
    </Fragment>);
};

App.propTypes = {
  onClickCreatePlayer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
  onClickCreatePlayer: () => dispatch(createPlayer())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
