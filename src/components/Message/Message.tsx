import React from 'react'
import './message.css'
import './_type/message_type_income.css'
import './_type/message_type_outcome.css'

export interface MessageProps {
  text: string;
  type?: 'income' | 'outcome';
}

const Message = ({text, type = 'outcome'}: MessageProps) => {
  let typeStyles = new Map([
    ['income', 'message_type_income'],
    ['outcome', 'message_type_outcome']
  ]);
  
  return (
    <div className={'message ' + typeStyles.get(type)}>{text}</div>
  )
}

export default Message