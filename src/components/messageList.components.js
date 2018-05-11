import React from 'react';
import Message from'./message.components';

const MessageList = ({messages}) => {
  console.log(messages, "COMPONENTS");
  return (

    <div className="message-list">
    {
      messages.map((message) => {
        console.log(message.message_status.name);
        return (
          <Message
          key={message.id}
          points={message.points}
          media={message.media}
          shader={message.shader.username}
          victim={message.shader.username}
          status={message.message_status.name}
          />
        );
      })
    }
    </div>


  );
}

export default MessageList;