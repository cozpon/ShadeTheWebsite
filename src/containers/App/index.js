import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadMessages } from '../../actions/message.actions';
import { loadRumors } from '../../actions/rumors.actions';
import Messages from '../../components/message.components';
import RumorList from '../../components/rumorList.components';

class App extends Component {
  constructor(){
    super();
    this.state = {
      rumors: [] //initial state
    }
  }
  componentDidMount(){
    this.props.loadMessages();
    this.props.loadRumors();
  }

  render() {
    console.log('rumors', this.props.rumors);

    return (

      <div id="app">
        main desktop react app for SHADE baby! <br /><br />
        this gonna be where the feed is I guess?
        <br />
        <br />
        <br />

      <div className="rumor-list">
        rumors
          <RumorList rumors={this.props.rumors}/>
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
