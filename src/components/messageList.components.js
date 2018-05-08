import React from 'react';
import Message from'./message.components';

const MessageList = ({messages}) => {
  console.log(messages, "COMPONENTS");
  return (

    <div className="message-list">
    {
      messages.map((message) => {
        return (
          <Message
          body={message.body}
          user={message.user.username}
          media={message.media}
          key={message.id}
          />
        );
      })
    }
    </div>


  );
}

export default MessageList;