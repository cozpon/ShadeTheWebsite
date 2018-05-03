import { LOGIN_USER,
         LOGOUT_USER,
         REGISTER_USER,
         LOAD_USER,
         EDIT_EMAIL,
         EDIT_PASSWORD
       } from '../actions/auth.actions';

const initialState = [];

const singleUser = (state = initialState, action) => {
  switch (action.type){
    case LOGIN_USER:
      const userDetails = action.userDetails;
      let newState = {};
      if (userDetails.success) { // if user login successful
        newState = action.userDetails;

        localStorage.setItem('loggedIn', true);
        localStorage.setItem('userId', userDetails.id);
        localStorage.setItem('username', userDetails.username);
        localStorage.setItem('role', userDetails.role);

      } else {
        console.log(userDetails, "FAILURE");
        newState = initialState;
      }

      return Object.assign({}, state, newState);

    case REGISTER_USER:
      if (action.response.success) {
        localStorage.setItem('registered', true);
      }
      return Object.assign({}, state, initialState);

    case LOGOUT_USER:
      return Object.assign({}, state, initialState);

    case LOAD_USER:
      return Object.assign({}, state, action.user);

    case EDIT_PASSWORD:
      if (action.user.success) {
        localStorage.setItem('passwordChange', true);
      }
      return Object.assign({}, state, action.user);

    case EDIT_EMAIL:
      if (action.user.success) {
        localStorage.setItem('emailChange', true);
      }
      return Object.assign({}, state, action.user);

    default:
      return state;
  }
};

export default singleUser;