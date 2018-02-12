import Axios from 'axios';

const messages = '/api/messages';

export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const ERROR = 'ERROR';

//GET all Messages
export const loadMessages = () => {
  return (dispatch) => {
    return Axios.get(messages)
    .then(messages => {
      dispatch({
        type: LOAD_MESSAGES,
        messages: messages.data
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