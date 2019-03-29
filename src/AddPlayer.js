import React from 'react';
import PropTypes from 'prop-types';
import {createPlayer} from './actions/playerActions';
import {connect} from "react-redux";

class AddPlayer extends React.Component {
  constructor (props) {
    super(props);
    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
  }

  handleAddButtonClick () {
    const name = window.prompt("Enter name:");
    if (!name) {
      return;
    }
    this.props.createPlayer(name);
  }

  render() {
    return (
      <button
        type='button'
        className="btn btn-outline-secondary"
        onClick={this.handleAddButtonClick}
        style={{margin: '1em 0 10em 0'}}
      >
        Add player
      </button>
    )
  }
}

AddPlayer.propTypes = {
  createPlayer: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createPlayer: name => dispatch(createPlayer(name)),
});

export default connect(null, mapDispatchToProps)(AddPlayer);
