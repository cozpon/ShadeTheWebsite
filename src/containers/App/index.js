import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadMessages } from '../../actions/message.actions';


class App extends Component {
  componentDidMount(){
    this.props.loadMessages();
  }

  render() {
    return (
      <div id="app">
        main desktop react app for SHADE baby! <br /><br />
        this gonna be where the feed is I guess?
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages : state.messageList, // makes it this.props.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMessages: () => {
      dispatch(loadMessages());
    },
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
