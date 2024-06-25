import React from 'react'
import './__text-field/subscribe-page__text-field.css'
import Button from '../Button/Button'
import TextField from '../TextField/TextField'

interface Props {
  subscribeDestination?: string;
  onSubscribeDestinationChange: (value: string) => void;
  onSubscribe?: () => void;
}

const SubscribePage = ({subscribeDestination, onSubscribeDestinationChange, onSubscribe}: Props) => {
  return (
    <div className='subscribe-page'>
      <TextField className='subscribe-page__text-field' value={subscribeDestination} onValueChange={onSubscribeDestinationChange} placeholder='Destination' example='/user/queue/games' />
      <Button text='Subscribe' onClick={onSubscribe}/>
    </div>
  )
}

export default SubscribePage