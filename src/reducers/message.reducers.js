import { LOAD_MESSAGES} from '../actions/message.actions';
const initialState = [];

const messageList = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_MESSAGES:
      return [ ...action.messages ];

    default:
      return state;
  }
};

export default messageList;
