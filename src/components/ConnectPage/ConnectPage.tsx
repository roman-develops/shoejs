import React from 'react'
import './connect-page.css'
import './__label-container/connect-page__label-container.css'
import './__text-area/connect-page__text-area.css'
import './__button/connect-page__button.css'
import './__text-field/connect-page__text-field.css'
import './connect-page.css'
import Button from '../Button/Button'
import TextField from '../TextField/TextField'
import TextArea from '../TextArea/TextArea'

export interface Props {
  connectEndpoint: string;
  onConnectEndpointChange: (value: string) => void;
  connectHeaders?: string;
  onConnectHeadersChange: (value: string) => void;
  onConnect?: () => void;
  connected?: boolean;
  className?: string;
}

const ConnectPage = ({connectEndpoint, onConnectEndpointChange, connectHeaders, onConnectHeadersChange, onConnect, connected, className}: Props) => {
  return (
    <div className={`connect-page ${className}`}>
      <TextField className='connect-page__text-field' placeholder='Endpoint' example='http://localhost:8080/ws' value={connectEndpoint} onValueChange={onConnectEndpointChange}/>
      <TextArea className='connect-page__text-area' placeholder='Headers JSON' example='{“Authorication”: Bearer eyJhbGciOiJSUzI}' value={connectHeaders} onValueChange={onConnectHeadersChange}/>
      <Button text={connected ? 'Disconnect' : 'Connect'} styleType={connected ? 'secondary' : 'primary'} className='connect-page__button' onClick={onConnect} />
    </div>
  )
}

export default ConnectPage