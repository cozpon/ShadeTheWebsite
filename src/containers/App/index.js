import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadMessages } from '../../actions/message.actions';


class App extends Component {
  // componentDidMount(){
  //   this.props.loadMessages();
  // }

  render() {
    return (
      <div id="app">

        main app for SHADE baby!

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
