import Axios from 'axios';

import { url } from '../lib/url';

const register = `${url}auth/register`;
const login = `${url}auth/login`;
const logout = `${url}auth/logout`;
const forgot = `${url}auth/forgot`;
const reset = `${url}auth/reset`;

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const FORGOT_PASS = 'FORGOT_PASS';
export const RESET_PASS = 'RESET_PASS';
export const EDIT_USER = 'EDIT_USER';
export const LOAD_USER = 'LOAD_USER';
export const ERROR = 'ERROR';

export const registerUser = (registerCreds) => {
  return (dispatch) => {
    return Axios.post(register, registerCreds)
    .then(response => {
        dispatch({
          type: REGISTER_USER,
          response: response.data
       });
    })
    .catch(err => {
      dispatch({
        type: ERROR,
        error: err
      });
    });
  };
};


export const loginUser = (userCreds) => {
  return (dispatch) => {
    return Axios.post(login, userCreds)
    .then((response) => {
      // console.log(response, "RESPONSE DATA");
      dispatch({
        type: LOGIN_USER,
        userDetails: response.data
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        error: 'invalid user name or password'
      });
    });
  };
};

export const forgotPassword = (userEmail) => {
  console.log(userEmail, "UUUUEMAIL");
  return (dispatch) => {
    return Axios.post(forgot, userEmail)
    .then((response) => {
      console.log(response, "RESPONSE DATA");
      dispatch({
        type: FORGOT_PASS,
        userDetails: response.data
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        error: 'something went wrong, please try again!'
      });
    });
  };
};


//(gotta hash that password)
export const resetPassword = (password) => {
  console.log(`${password.token}`, "UUUUEMAIL");
  return (dispatch) => {
    return Axios.put(`${reset}/${password.token}`, password)
    .then((response) => {
      console.log(response, "RESPONSE DATA");
      dispatch({
        type: RESET_PASS,
        userDetails: response.data
      });
    })
    .catch((err) => {
      dispatch({
        type: ERROR,
        error: 'something went wrong, please try again!'
      });
    });
  };
};

export const loadUser = (id) => {
  return function(dispatch) {
    return Axios.get(`${url}users/${id}`).then((user) => {
      dispatch({
        type: LOAD_USER,
        user: user.data
      });
    });
  }
}

export const editUser = (user) => {
  return function(dispatch) {
    return Axios.put(`${url}users/${user.id}`).then((editedUser) => {
      dispatch({
        type: EDIT_USER,
        user: editedUser.data
      });
    });
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    return Axios.get(logout)
    .then((response) => {
      if (response.data.success) {
        dispatch({
          type: LOGOUT_USER,
          success: response.data.success
        });
      }
    })
    .catch((err) => {
      console.log('Logout Failed. Please try again', err);
      return false;
    });
  };
};
