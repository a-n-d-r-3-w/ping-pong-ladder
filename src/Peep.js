import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setAccountId, setPeepId, getPeep, updatePeep} from './actions';

class Peep extends Component {
  constructor(props) {
    super(props);
    const { params: paramsFromReactRouter } = this.props.match;
    const accountId = paramsFromReactRouter.accountId;
    const peepId = paramsFromReactRouter.peepId;
    this.props.setAccountId(accountId);
    this.props.setPeepId(peepId);
    this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    this.textarea = React.createRef();
    this.state = { saveTimeoutId: null };
  }

  componentDidMount() {
    this.props.getPeep();
  }

  handleTextAreaChange () {
    if (this.state.saveTimeoutId) {
      clearTimeout(this.state.saveTimeoutId);
    }
    const peepInfo = this.textarea.current.value;
    this.setState({
      saveTimeoutId: setTimeout(() => {
        this.props.updatePeep(peepInfo);
      }, 1000)
    });
  }

  render() {
    const {peep, accountId, isLoading, isSaving} = this.props;
    const nav = (
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/${accountId}`}>Account {accountId}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {isLoading ? 'Loading...' : peep.name}
          </li>
        </ol>
      </nav>
    );

    if (isLoading) {
      return (
        <Fragment>
          {nav}
          Loading...
        </Fragment>
      )
    }

    return (
      <Fragment>
        {nav}
        <form>
          <div className='form-group'>
            {isSaving ?
              <div className="alert alert-info" role="alert">
                Syncing...
              </div> :
              <div className="alert alert-success" role="alert">
                Synced
              </div>
            }
          </div>
          <div className='form-group'>
            <textarea
              className="form-control"
              rows="14"
              onChange={this.handleTextAreaChange}
              defaultValue={peep.info}
              ref={this.textarea}
            />
          </div>
        </form>
      </Fragment>
    );
  }
}

Peep.propTypes = {
  accountId: PropTypes.string,
  peepId: PropTypes.string,
  setAccountId: PropTypes.func.isRequired,
  setPeepId: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  peep: PropTypes.object,
};

Peep.defaultProps = {
  accountId: '',
  isLoading: false,
  peepId: '',
  peep: {},
};

const mapStateToProps = state => ({
  accountId: state.accountId,
  peepId: state.peepId,
  isLoading: state.isLoading,
  isSaving: state.isSaving,
  peep: state.peep,
});

const mapDispatchToProps = dispatch => ({
  setAccountId: accountId => dispatch(setAccountId(accountId)),
  setPeepId: accountId => dispatch(setPeepId(accountId)),
  getPeep: () => dispatch(getPeep()),
  updatePeep: peepInfo => dispatch(updatePeep(peepInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Peep);
