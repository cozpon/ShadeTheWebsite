import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadMessages } from '../../actions/message.actions';


class User extends Component {


  render() {
    if( this.props.match && localStorage.userId === this.props.match.params.id ){
      return(
        <div className="user-view">
          <div id="user-welcome">
            Hello, { localStorage.username }!
          </div>
          <div id="user-edit">
            want 2 edit ur profile, daddio?
               <Link to={`/edit/${localStorage.userId}`}>Edit Password/Email</Link>
          </div>
        </div>
      );

    } else {
      return(
        <div>Access Denied</div>
      );
    }
  }
}

// sets store state on local props
const mapStateToProps = state => {
  return {
    singleUser : state.singleUser,
    items : state.itemList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMessages: () => {
      dispatch(loadMessages());
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);