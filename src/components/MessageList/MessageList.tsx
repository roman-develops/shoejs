import React from 'react'
import './message-list.css'
import Message, {MessageProps} from '../Message/Message'

interface Props {
    messages: MessageProps[];
}

const MessageList = ({messages}: Props) => {
    return (
        <div className='message-list'>
            {messages.map((message) =>
                <Message {...message} />)}
        </div>
    )
}

export default MessageList