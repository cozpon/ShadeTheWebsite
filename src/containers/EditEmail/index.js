import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { editEmail } from '../../actions/auth.actions';

class EditEmail extends Component {
  constructor() {
    super();

    this.state = {
      id : '',
      email : '',
      oldpassword : '',
      redirect : false // set initial state to false
    };
    this.handleOldPasswordInput = this.handleOldPasswordInput.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
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
      oldpassword : this.state.oldpassword,
      id : this.props.match.params.id
    };
    this.props.editEmail(newEmail);
    this.setState({
      email : '',
      oldpassword : ''
    });
  }

  handleEmailInput(evt) {
    this.setState(
    {
      email : evt.target.value,
    });
  }

  // componentDidMount() {
  //   localStorage.clear();
  // }

  render() {
    if( localStorage.userId === this.props.match.params.id ){
      return(
      <div id="login-container">

        <div>
          <center>
               <h2>Change Email Address</h2>
          </center>
        </div>

      <div className="login-form">
        <div className="form-header">
        enter your current password
        </div>
        <form className="inner-form-container" onSubmit={this.handleEmailChange.bind(this)}>
          <input
            name="oldpassword"
            type="password"
            placeholder="current password"
            defaultValue={this.state.oldpassword}
            onChange={this.handleOldPasswordInput} />

          <div className="form-header">
            just enter a new email addy in below
          </div>
          <div>
            <input
              name="email"
              type="text"
              placeholder="enter new email addy"
              defaultValue={this.state.email}
              onChange={this.handleEmailInput} />
          </div>
          <div className="form-header">
            re-enter your new email addy please
          </div>
          <div>
            <input
              name="email"
              type="text"
              placeholder="re-enter new email addy"
              defaultValue={this.state.email}
              onChange={this.handleEmailInput} />
          </div>
            <button
              className="login-btn"
              type="submit"
              onClick={this.handleEmailChange}>
              Change Ur Email
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
  console.log(state);
  return {
    singleUser : state.singleUser
  };
};

//maps store dispatch to local props
const mapDispatchToProps = (dispatch) => {
  console.log("dispatch props");
  return {
    editEmail: (editUserConfirm) => {
      dispatch(editEmail(editUserConfirm));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditEmail);