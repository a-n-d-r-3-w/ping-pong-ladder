import React from 'react';
import PropTypes from 'prop-types';
import {createTeam} from './actions/teamActions';
import {connect} from "react-redux";

class AddTeam extends React.Component {
  constructor (props) {
    super(props);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  handleAddButtonClick () {
    const name = window.prompt("Enter name:");
    if (!name) {
      return;
    }
    this.props.createTeam(name);
  }

  render() {
    return (
      <button
        type='button'
        className="btn btn-outline-secondary"
        onClick={this.handleAddButtonClick}
        style={{margin: '1em 0 10em 0'}}
      >
        Add team
      </button>
    )
  }
}

AddTeam.propTypes = {
  createTeam: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createTeam: name => dispatch(createTeam(name)),
});

export default connect(null, mapDispatchToProps)(AddTeam);
