import React from 'react';
import moment from 'moment';
import { useGlobalContext } from 'contextApi';

const Index = ({ id, profilePicture, messages }) => {
    const { logo } = useGlobalContext()

    return (
        <div className="messages">
            {messages.map((message, i) => (
                <div key={i} className={`messageContainer ${message.sender === id ? 'left' : 'right'}`}>
                    <div className="messageBox">
                        <p className="messageText">{message.text}</p>
                    </div>
                    <div className='user'>
                        <div className='avatar'>
                            <img
                                alt='avatar'
                                src={message.sender === id ? profilePicture : logo}
                            />
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