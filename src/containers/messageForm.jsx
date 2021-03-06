import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Actions
import { addMessage } from '../actions/actions_index.js';

class MessageForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userInput: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // alert('A name was submitted: ' + this.state.userInput)
    let time = new Date().toString().split(' ').slice(0,5).join(' ');
    const author = this.props.currentUser || 'Anonymous';
    const body = this.state.userInput;
    const channel = this.props.selectedChannel;
    this.props.addMessage(body, author, time, channel)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="message-form">
        <input id="message-field" type="text" placeholder="Type your message!" onChange={this.handleChange} value={this.state.userInput}/>
        <input id="message-btn" type="submit" value="Send!"/>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    selectedChannel: state.selectedChannel
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { addMessage: addMessage },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
