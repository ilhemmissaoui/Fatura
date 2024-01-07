import React from 'react';

const MessageItem = ({ chat }) => (
    <div style={{ heigth: '100%', width: '100%' }}>
        {chat.map((message) => {
            const isMe = message.sender === Meteor.userId();
            return (
                <p style={{ padding: '.25em', textAlign: isMe ? 'right' : 'left', overflowWrap: 'normal' }}>
                    <span className={`tag is-medium ${isMe ? 'is-success' : 'is-info'}`}>{message?.content}</span>
                </p>
            )
        }
        )}
    </div>
);

export default MessageItem