import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flagMessage,  } from '../actions/message.actions';
import ReactPlayer from 'react-player';

const Message = ({id, points, media, shader, victim, status }) => {
  let url =  `https://d4fzdcljjl4gc.cloudfront.net/${ media }`;
  return(
    <div>
      <div className='message-text'>
        { points } upvotes. This shade is so { status }.
      </div>

      <div className='message-shader'>
        { shader } threw shade @ { victim }
      </div>

      <div className='message-body'>

          <ReactPlayer
            url={ url }
            controls={ true }
            width='30%'
            height='100%'
          />

      </div>

    </div>
  )
}


export default Message;