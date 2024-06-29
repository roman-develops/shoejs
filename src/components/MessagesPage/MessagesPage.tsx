import React from 'react'
import './messages-page.css'
import './__subtitle/message-page__subtitle.css'
import {MessageProps} from '../Message/Message'
import MessageList from '../MessageList/MessageList'
import Subtitle from '../Subtitle/Subtitle'

interface Props {
    messages: MessageProps[];
    className?: string;
}

const MessagesPage = ({messages, className}: Props) => {
    return (
        <div className={className}>
            <Subtitle
                className='message-page__subtitle'
                text='Messages'
            />
            <MessageList messages={messages}/>
        </div>
    )
}

export default MessagesPage