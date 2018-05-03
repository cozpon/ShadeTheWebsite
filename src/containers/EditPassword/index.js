import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editPassword } from '../../actions/auth.actions';
import { editEmail } from '../../actions/auth.actions';
import { ToastContainer, toast } from "react-toastify";

class EditPassword extends Component {
  constructor() {
    super();

    this.state = {
      id : '',
      email : '',
      password : '',
      oldpassword : '',
      redirect : false // set initial state to false
    };
    this.handleOldPasswordInput = this.handleOldPasswordInput.bind(this);

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
  }

  handlePasswordChange(evt) {
    evt.preventDefault();
    let newPassword = {
      oldpassword : this.state.oldpassword,
      password : this.state.password,
      id : this.props.match.params.id
    };

    this.props.editPassword(newPassword);
    console.log(newPassword);
    this.setState({
      password : '',
      oldpassword : '',
      redirect : true
    });
  }

  handlePasswordInput(evt) {
    this.setState(
    {
      password : evt.target.value,
    });
  }

  handleOldPasswordInput(evt) {
    this.setState(
    {
      oldpassword : evt.target.value,
    });
  }

  handleEmailChange(evt) {
    evt.preventDefault();
    let newEmail = {
      email : this.state.email,
    };
    this.props.editEmail(newEmail);
    this.setState({
      email : '',
    });
  }

  handleEmailInput(evt) {
    this.setState(
    {
      email : evt.target.value,
    });
  }

  render() {
    if( localStorage.passwordChange ) {
      return (
      <Redirect to={`/users/${localStorage.userId}`} />
      )
    }
    if( localStorage.userId === this.props.match.params.id ){
      return(
      <div id="login-container">
        <h2>Change Password</h2>

        <div>
          <center>
             So u want 2 change ur password
          </center>
        </div>

      <div className="login-form">
        <div className="form-header">
        enter your current password
        </div>
         <ToastContainer />
          <form className="inner-form-container" onSubmit={this.handlePasswordChange.bind(this)}>
            <input
              name="oldpassword"
              type="password"
              placeholder="current password"
              defaultValue={this.state.oldpassword}
              onChange={this.handleOldPasswordInput} />
            <div className="form-header">
            enter a new password in below
            </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="enter new password"
              defaultValue={this.state.password}
              onChange={this.handlePasswordInput} />
          </div>
          <div className="form-header">
            re-enter your new password please
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="re-enter new password"
              defaultValue={this.state.password}
              onChange={this.handlePasswordInput} />
          </div>
            <button
              className="login-btn"
              type="submit"
              onClick={this.handlePasswordChange}>
              Change Ur Password
            </button>
          </form>
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

// maps store state to local props
const mapStateToProps = (state) => {
  return {
    singleUser : state.singleUser
  };
};

//maps store dispatch to local props
const mapDispatchToProps = (dispatch) => {
  console.log("dispatch props");
  return {
    editPassword: (editUserConfirm) => {
      dispatch(editPassword(editUserConfirm));
    },
    editEmail: (editUserConfirm) => {
      dispatch(editEmail(editUserConfirm));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPassword);