import { LOGIN_USER,
         LOGOUT_USER,
         LOAD_USER,
         EDIT_USER
       } from '../actions/auth.actions';

const initialState = { Items : [] };

const singleUser = (state = initialState, action) => {
  switch (action.type){
    case LOGIN_USER:
      const userDetails = action.userDetails;
      let newState = {};
      console.log(userDetails);
      if (userDetails.success) {
        newState = action.userDetails;

        localStorage.setItem('loggedIn', true);
        localStorage.setItem('userId', userDetails.id);
        localStorage.setItem('username', userDetails.username);
        localStorage.setItem('role', userDetails.role);

      } else {
        newState = initialState;
      }

      return Object.assign({}, state, newState);

    case LOGOUT_USER:
      return Object.assign({}, state, initialState);

    case LOAD_USER:
      return Object.assign({}, state, action.user);

    case EDIT_USER:
      return Object.assign({}, state, action.user);

    default:
      return state;
  }
};

export default singleUser;