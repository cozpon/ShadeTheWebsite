import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadMessages } from '../../actions/message.actions';
import { ToastContainer, toast } from "react-toastify";

class User extends Component {

  componentDidMount(){
    if( localStorage.emailChange ) {
      toast.success(`Success! Email Changed!`,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }
    if( localStorage.passwordChange ) {
      toast.success(`Your password has been changed to '123password321' haha just kidding`,
      {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    }
  }
  componentWillMount(){
    setTimeout(function() {
      localStorage.removeItem('emailChange');
      localStorage.removeItem('passwordChange');
    }, 10);
  }

  render() {
    if( this.props.match && localStorage.userId === this.props.match.params.id ){
      return(
        <div className="user-view">
          <div id="user-welcome">
            Hello, { localStorage.username }!
          </div>
          <ToastContainer />
          <div id="user-edit">
            want 2 edit ur profile, daddio? <br /> <br />
               <Link to={`/editpass/${localStorage.userId}`}>change ur Password</Link>
               <br />
               -_ or _-
               <br />
               <Link to={`/editemail/${localStorage.userId}`}>change ur email</Link>
          </div>
        </div>
      );
    }else{
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