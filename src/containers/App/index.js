import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadMessages } from '../../actions/message.actions';
import { loadRumors } from '../../actions/rumors.actions';
import MessageList from '../../components/messageList.components';
import RumorList from '../../components/rumorList.components';

class App extends Component {
  constructor(){
    super();
    this.state = {
      rumors: [],
      messages: [] //initial state
    };
  }
  componentDidMount(){
    this.props.loadMessages();
    this.props.loadRumors();
  }

  render() {
            console.log(this.props, "PROPS");
    return (

      <div id="main">
        main desktop react app for SHADE baby! <br /><br />
        this gonna be where the feed is I guess?
        <br />
        <br />
        <br />

      <div className="rumor-list">
        rumors
        <RumorList rumors={this.props.rumors}/>
      </div>

      <div className="message-list">
        messages
        <MessageList messages={this.props.messages}/>
      </div>

     </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages : state.messageList, // makes it this.props.messages
    rumors : state.rumorList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMessages: () => {
      dispatch(loadMessages());
    },
    loadRumors: () => {
      dispatch(loadRumors());
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
