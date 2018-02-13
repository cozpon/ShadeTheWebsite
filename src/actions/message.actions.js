import Axios from 'axios';

import { url } from '../lib/url';

export const LOAD_MESSAGE = 'LOAD_MESSAGE';
export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const ERROR = 'ERROR';
export const VOTE_ON_MESSAGE = 'VOTE_ON_MESSAGE';
export const FLAG_MESSAGE = 'FLAG_MESSAGE';

//GET all Messages
export const loadMessages = () => {
  return (dispatch) => {
    return Axios.get(`${url}messages`)
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

export const loadMessage = (id) => {
  return function(dispatch){
    return Axios.get(`${url + id}`)
    .then(message => {
      dispatch({
        type: LOAD_MESSAGE,
        message: message.data
      });
    });
  }
}

export const flagMessage = (id, user) => {
  return function(dispatch){
    return Axios.put(`${url}messages/${id}/inappropriate`, user)
    .then(message => {
      console.log('FLAG', message.data)
      dispatch({
        type: FLAG_MESSAGE,
        message: message.data
      });
    });
  }
}

export const voteOnMessage = (vote) => {
  return function(dispatch){
    return Axios.put(`${url}messages/${vote.id}/vote`, vote)
    .then(message => {
      console.log('ACTION', message.data)
      dispatch({
        type: VOTE_ON_MESSAGE,
        message: message.data
      });
    });
  }
}