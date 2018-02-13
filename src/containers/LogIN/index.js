import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../actions/auth.actions';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username : '',
      password : '',
      redirect : false, // set initial state to false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    let loginCreds = {
      username : this.state.username,
      password : this.state.password
    };

    this.props.loginUser(loginCreds);

    this.setState({
      username : '',
      password : '',
    });
  }

  handleUsernameInput(evt) {
    this.setState(
    {
      username : evt.target.value,
      error : ''
    });
  }

  handlePasswordInput(evt) {
    this.setState(
    {
      password : evt.target.value,
      error : ''
    });
  }

  componentDidMount() {
    localStorage.clear();
  }

  render() {
    // loggedIn is a string so its basically checking if anything exists there
    if(localStorage.loggedIn) {
      return <Redirect to={`/users/${localStorage.userId}`}/>
    }

    return(
      <div id="login-container">
        <h2>Login</h2>

        <div>
          <center>
             login 2 view ur shade account
          </center>
        </div>

        <div className="login-form">
          <form className="inner-form-container" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-header">
            Login with either USERNAME or EMAIL
            </div>
         <div>
            <input
              name="username"
              type="text"
              placeholder="username"
              defaultValue={this.state.username}
              onChange={this.handleUsernameInput}/>
            </div>

            <div className="form-header">
            PASSWORD
            </div>
            <div>
            <input
              name="password"
              type="password"
              placeholder="password"
              defaultValue={this.state.password}
              onChange={this.handlePasswordInput}/>
            </div>
            <br/>
            <button
              className="login-btn"
              type="submit"
              onClick={this.handleSubmit}>
              Login
            </button>
          </form>
        </div>
        <div className="forgot-password">
        <Link to="/forgot">Forgot Password?</Link>
        </div>
      </div>
    );
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
  return{
    loginUser: (loginCreds) => {
      dispatch(loginUser(loginCreds));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);