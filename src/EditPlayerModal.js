import React from "react";
import {connect} from 'react-redux';
import {
  savePlayer,
  CLOSE_EDIT_MODAL
} from './actions';
import PropTypes from "prop-types";

class EditPlayerModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
        this.updatePlayerName = this.updatePlayerName.bind(this)
        this.updateSlackName = this.updateSlackName.bind(this)
        this.saveChanges = this.saveChanges.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    updatePlayerName(e) {
        this.setState({ playerName: e.target.value })
    }

    updateSlackName(e) {
        this.setState({ slackName: e.target.value })
    }

    saveChanges() {
        this.props.savePlayer(this.props.editingPlayer.playerId, this.state.playerName, this.state.slackName)
    }

    closeModal() {
        this.props.closeModal()
    }

    render(){
        if (this.props.editingPlayer !== undefined)
            return (
                <div className="modal show" role="dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Player Info</h5>
                        </div>
                        <div className="modal-body">
                            <div className="modal-input">
                                <span>Name: </span>
                                <input value={this.state.playerName !== undefined ? this.state.playerName : this.props.editingPlayer.name} onChange={this.updatePlayerName}/>
                            </div>
                            <div className="modal-input">
                                <span>Slack: </span>
                                <input value={this.state.slackName !== undefined ? this.state.slackName : this.props.editingPlayer.slackName} onChange={this.updateSlackName}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"
                                onClick={this.saveChanges}
                            >
                                Save changes
                            </button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )
        return null
    }
}

EditPlayerModal.propTypes = {
    editingPlayer: PropTypes.object,
    savePlayer: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
  };
  
  const mapStateToProps = state => ({
    editingPlayer: state.editingPlayer,
  });
  
  const mapDispatchToProps = dispatch => ({
    savePlayer: (playerId, playerName, slackName) => dispatch(savePlayer(playerId, playerName, slackName)),
    closeModal: () => dispatch({ type: CLOSE_EDIT_MODAL }),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(EditPlayerModal);