import React, { useState } from 'react'
import './requests-page.css'
import './__subtitle/requests-page__subtitle.css'
import './__content/request-page__content.css'
import './__tab-list/request-page__tab-list.css'
import Subtitle from '../Subtitle/Subtitle'
import TabList from '../TabList/TabList'
import TabProps from '../Tab/Tab'
import MessageProps from '../Message/Message'
import ConnectPage from '../ConnectPage/ConnectPage'
import SubscribePage from '../SubscribePage/SubscribePage'
import SendPage from '../SendPage/SendPage'
import MessagesPage from '../MessagesPage/MessagesPage'

interface Props {
  connectEndpoint?: string;
  onConnectEndpointChange: (value: string) => void;
  connectHeaders?: string;
  onConnectHeadersChange: (value: string) => void;
  onConnect?: () => void;
  subscribeDestination?: string;
  onSubscribeDestinationChange: (value: string) => void;
  sendDestination?: string;
  onSendDestinationChange: (value: string) => void;
  sendBody?: string;
  onSendBodyChange: (value: string) => void;
  onSend?: () => void;
  onSubscribe?: () => void;
  connected?: boolean;
  className?: string;
}

const RequestsPage = ({connectEndpoint, 
                        onConnectEndpointChange, 
                        connectHeaders, 
                        onConnectHeadersChange, 
                        onConnect, 
                        subscribeDestination, 
                        onSubscribeDestinationChange, 
                        sendDestination, 
                        onSendDestinationChange, 
                        sendBody, 
                        onSendBodyChange, 
                        onSend,
                        onSubscribe, 
                        connected,
                        className}: Props)=> {
  const [selectedTab, setSelectedTab] = useState('Connect');
  
  return (
    <div className={`requests-page ${className}`}>
      <Subtitle className='requests-page__subtitle' text='Requests'/>
      <TabList className='request-page__tab-list' tabs={
        [
          { 
            text: 'Connect'
          },
          { 
            text: 'Subscribe'
          },
          { 
            text: 'Send'
          }
      ]}
      selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>

      <div className="request-page__content">
      {selectedTab === 'Connect' && <ConnectPage connected={connected} connectEndpoint={connectEndpoint} onConnectEndpointChange={onConnectEndpointChange} connectHeaders={connectHeaders} onConnectHeadersChange={onConnectHeadersChange} onConnect={onConnect} /> }
      {selectedTab === 'Subscribe' && <SubscribePage subscribeDestination={subscribeDestination} onSubscribeDestinationChange={onSubscribeDestinationChange} onSubscribe={onSubscribe}/> }
      {selectedTab === 'Send' && <SendPage sendDestination={sendDestination} onSendDestinationChange={onSendDestinationChange} sendBody={sendBody} onSendBodyChange={onSendBodyChange} onSend={onSend} /> }
      </div>
    </div>
  )
}

export default RequestsPage