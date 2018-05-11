import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flagMessage } from '../actions/message.actions';

const Message = ({id, points, media, shader, victim, status }) => {
    return(
      <div>
        <div className='message-text'>
          { points } upvotes. This shade is so { status }.
        </div>

        <div className='message-shader'>
          { shader } threw shade @ { victim }
        </div>

        <div className='message-body'>
          { media }</div>

      </div>
    )
}


export default Message;