import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../../actions/auth.actions';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username : '',
      password : '',
      email: '',
      error: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleBlurValidation = this.handleBlurValidation.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let userCheck = this.state.username;
    let passCheck = this.state.password;
    let emailCheck = this.state.email;

    if(userCheck === '' || passCheck === '' || emailCheck === ''){
      let error = "you are missing information on your register form";

      this.setState({
        error: error
      });

    } else {

    let registerCreds = {
      username : this.state.username,
      password : this.state.password,
      email : this.state.email,

    };

    this.props.registerUser(registerCreds);

    this.setState(
    {
      username : '',
      password : '',
      email : '',
      error : ''
    });
   }
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
      error: ''
    });
  }

  handlePasswordChange(event) {
    this.setState({
      password: event.target.value,
      error: ''
    });
  }

  handleEmailChange(event) {
    this.setState({
      email: event.target.value,
      error: '',
    });
  }

  handleBlurValidation(evt) {

    if (evt.target.name === "username" && (this.state.username.length < 3 || this.state.username.length > 20)){
      let error = "Username must be max 20 characters and at min 3 charaters";

      this.setState({
        error: error
      });
    }

    if(evt.target.name === "password" && this.state.password < 5){

      let error = "passwords must at least be 5 characters";
      this.setState({
        error:error
      });
    }
    if(evt.target.name ==="email" && this.state.email.length === 0) {
      let error = "email was not entered";
      this.setState({
        error: error
      });
    }
  }

  render() {
    if(localStorage.getItem('registered')) {
      return <Redirect to="/login"/>
    }

    return(
      <div id="register-container">
        <h2>Register</h2>
        <p className="errors">{this.state.error}</p>
        <div className="register-form">
          <form
            className="inner-form-container"
            onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-header">
            EMAIL
            <br/>
          </div>
          <div>
          <input
            name="email"
            defaultValue={this.state.email}
            onChange={this.handleEmailChange}
            onBlur={this.handleBlurValidation}
            placeholder="email"
            type="text" />
          </div>
          <br/>
          <div className="form-header">
            USERNAME<br/>(3-20 characters. No spaces or special characters)
          </div>
          <div>
            <input
              name="username"
              defaultValue={this.state.username}
              onChange={this.handleUsernameChange}
              onBlur={this.handleBlurValidation}
              placeholder="username"
              type="text" />
          </div>
          <br/>
          <div className="form-header">
            PASSWORD<br/>(minimum length - 5 characters)
          </div>
          <div>
          <input
            name="password"
            defaultValue={this.state.password}
            onChange={this.handlePasswordChange}
            onBlur={this.handleBlurValidation}
            placeholder="password"
            type="password" />
          </div>
          <br/>
          <input
            className="register-btn"
            type="submit"
            value="Register" />

          </form>
        </div>
      </div>
    );
  }
}

//  ValidateEmail(mail) => {
// if (/^\w+([\.-]?\ w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(this.state.email))
//   return true
// }


// maps store state to local props
const mapStateToProps = (state) => {
  return {
    singleUser : state.singleUser
  };
};

// maps store dispatch to local props
const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (registerCreds) => {
      dispatch(registerUser(registerCreds));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);