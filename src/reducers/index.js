import { combineReducers } from 'redux';

import singleUser from './users.reducers';
import messageList from './message.reducers';
import rumorList from './rumor.reducers';

export default combineReducers({
  singleUser,
  messageList,
  rumorList
});