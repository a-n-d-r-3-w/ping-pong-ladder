import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import {createAccount} from './actions';

const App = ({ accountId, onClickCreateAccount, isLoading }) => {
  const nav = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active" aria-current="page">
          Home
        </li>
      </ol>
    </nav>
  );
  if (!!accountId) {
    return (
      <Fragment>
        {nav}
        <Redirect to={`/${accountId}`}/>
      </Fragment>
    );
  }
  if (isLoading) {
    return (
      <Fragment>
        {nav}
        Loading...
      </Fragment>
    );
  }
  return (
    <Fragment>
      {nav}
      <button
        type='button'
        className="btn btn-primary"
        onClick={onClickCreateAccount}
      >
        Create account
      </button>
    </Fragment>);
};

App.propTypes = {
  accountId: PropTypes.string,
  onClickCreateAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    accountId: state.accountId,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = dispatch => ({
  onClickCreateAccount: () => dispatch(createAccount())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
