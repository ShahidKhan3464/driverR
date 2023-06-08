import React from 'react';
import moment from 'moment';

const Index = ({ id, messages }) => {

    return (
        <div className="messages">
            {messages.map((message, i) => (
                <div key={i} className={`messageContainer ${message.sender === id ? 'left' : 'right'}`}>
                    <div className="messageBox">
                        <p className="messageText">{message.text}</p>
                    </div>
                    <div className='user'>
                        <div className='avatar'>
                            <img src='/images/avatar1.png' alt='avatar' />
                        </div>
                        <div className='date'>
                            <span>{moment(message.createdAt).format('Do MMMM')}</span>
                            <span>{moment(message.createdAt).format('LT')}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Index