import React, { Component } from 'react';

import { connect } from 'react-redux';
import { flagMessage } from '../actions/message.actions';

class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteModalVisible: false,
      flagModalVisible: false,
      blur: false
    }
  }

  render(){
    return(
      <div>
        <div className='message-text'>
          {this.props.points} upvotes. This shade is so {this.props.status}.
        </div>

        <div className='message-shader'>
          {this.props.shader} threw shade @ {this.props.victim}
        </div>

        <div className='message-body'>
          {this.props.body}</div>

            <button
              onClick={(e) => { e.preventDefault();
                this.props.flagMessage(this.props.id, this.props.currentUser);
              }}
              type="submit">
            Flag Message
            </button>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    flagMessage: (id, currentUser) => {
      dispatch(flagMessage(id, currentUser));
    }
  }
}

export default connect(null, mapDispatchToProps)(Message);