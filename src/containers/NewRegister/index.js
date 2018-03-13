import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { registerUser } from '../../actions/auth.actions';

import { FormWithConstraints, FieldFeedback } from 'react-form-with-constraints';
import { FieldFeedbacks, FormGroup, FormControlLabel, FormControlInput } from 'react-form-with-constraints-bootstrap4';

class Register extends Component {
 constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
      submitButtonDisabled: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log(e, "handleChange");
    const target = e.currentTarget;

    this.form.validateFields(target);

    this.setState({
      [target.name]: target.value,
      submitButtonDisabled: !this.form.isValid()
    });
  }

  handleNameChange(event) {
    this.setState({
      submitButtonDisabled: !this.form.isValid(),
      username: event.target.value,
    });
  }

  handlePasswordChange(e) {
    this.form.validateFields('passwordConfirm');

    this.handleChange(e);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.form.validateFields();

    this.setState({ submitButtonDisabled: !this.form.isValid() });

    if (this.form.isValid()) {
      alert(`Valid form\n\nthis.state =\n${JSON.stringify(this.state, null, 2)}`);
    }
    let registerCreds = {
      username : this.state.username,
      password : this.state.password,
      email : this.state.email,

    };
    this.props.registerUser(registerCreds);

  }

  render() {
    if(localStorage.getItem('registered')) {
      return <Redirect to="/login"/>
    }
    return (
      <FormWithConstraints ref={formWithConstraints => this.form = formWithConstraints}
                           onSubmit={this.handleSubmit} noValidate>
        <FormGroup for="username">
          <FormControlLabel htmlFor="username">Username</FormControlLabel>
          <FormControlInput type="username" id="username" name="username"
                            value={this.state.username} onChange={this.handleNameChange}
                            required minLength={3} />
          <FieldFeedbacks for="username">
            <FieldFeedback when="tooShort">Too short</FieldFeedback>
            <FieldFeedback when="*" />
          </FieldFeedbacks>

        </FormGroup>
        <FormGroup for="email">
          <FormControlLabel htmlFor="email">Email</FormControlLabel>
          <FormControlInput type="email" id="email" name="email"
                            value={this.state.email} onChange={this.handleChange}
                            required minLength={3} />
          <FieldFeedbacks for="email">
            <FieldFeedback when="tooShort">Too short</FieldFeedback>
            <FieldFeedback when="*" />
          </FieldFeedbacks>
        </FormGroup>

        <FormGroup for="password">
          <FormControlLabel htmlFor="password">Password</FormControlLabel>
          <FormControlInput type="password" id="password" name="password"
                            innerRef={password => this.password = password}
                            value={this.state.password} onChange={this.handlePasswordChange}
                            required pattern=".{5,}" />
          <FieldFeedbacks for="password" show="all">
            <FieldFeedback when="valueMissing" />
            <FieldFeedback when="patternMismatch">Should be at least 5 characters long</FieldFeedback>
          </FieldFeedbacks>
        </FormGroup>

        <FormGroup for="passwordConfirm">
          <FormControlLabel htmlFor="password-confirm">Confirm Password</FormControlLabel>
          <FormControlInput type="password" id="password-confirm" name="passwordConfirm"
                            value={this.state.passwordConfirm} onChange={this.handleChange} />
          <FieldFeedbacks for="passwordConfirm">
            <FieldFeedback when={value => value !== this.password.value}>Not the same password</FieldFeedback>
          </FieldFeedbacks>
        </FormGroup>

        <button disabled={this.state.submitButtonDisabled} className="btn btn-primary">Submit</button>
      </FormWithConstraints>
    );
  }
}
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