import React from 'react'
import './send-page.css'
import './__label-container/send-page__label-container.css'
import './__text-area/send-page__text-area.css'
import './__button/send-page__button.css'
import './__text-field/send-page__text-field.css'
import './send-page.css'
import Button from '../Button/Button'
import TextField from '../TextField/TextField'
import TextArea from '../TextArea/TextArea'


interface Props {
  sendDestination?: string;
  onSendDestinationChange: (value: string) => void;
  sendBody?: string;
  onSendBodyChange: (value: string) => void;
  onSend?: () => void;
}

const SendPage = ({sendDestination, onSendDestinationChange, sendBody, onSendBodyChange, onSend}: Props) => {
  return (
    <div className='send-page'>
      <TextField className='send-page__text-field' placeholder='Endpoint' example='http://localhost:8080/ws' value={sendDestination} onValueChange={onSendDestinationChange} />
      <TextArea className='send-page__text-area' placeholder='Body' example='{“Authorication”: Bearer eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJSb21hbjIiLCJleHAiOjE3MT
}' value={sendBody} onValueChange={onSendBodyChange} />
      <Button text='Send' className='send-page__button' onClick={onSend}/>
    </div>
  )
}

export default SendPage