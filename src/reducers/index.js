import { combineReducers } from 'redux';

import singleUser from './users.reducers';
import messageList from './message.reducers';

export default combineReducers({
  singleUser,
  messageList,
});