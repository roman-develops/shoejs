import { useState, useEffect } from 'react'
import MessagesPage from "../MessagesPage/MessagesPage"
import RequestsPage from "../RequestsPage/RequestsPage"
import './main.css'
import './__inner-page/main__inner-page.css'
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient: any;

const Main = () => {
  const [messages, setMessages] = useState([]);
  const [connectEndpoint, setConnectEndpoint] = useState(localStorage.getItem('connectEndpoint') || '');
  const [connectHeaders, setConnectHeaders] = useState(localStorage.getItem('connectHeaders') || '');
  const [sendDestination, setSendDestination] = useState(localStorage.getItem('sendDestination') || '');
  const [sendBody, setSendBody] = useState(localStorage.getItem('sendBody') || '');
  const [subscribeDestination, setSubscribeDestination] = useState(localStorage.getItem('subscribeDestination') || '');

  useEffect(() => {
    localStorage.setItem('connectEndpoint', connectEndpoint);
    localStorage.setItem('connectHeaders', connectHeaders);
    localStorage.setItem('subscribeDestination', subscribeDestination);
    localStorage.setItem('sendDestination', sendDestination);
    localStorage.setItem('sendBody', sendBody);
  }, [connectEndpoint, connectHeaders, subscribeDestination, sendDestination, sendBody]);

  
  return (
    <div className='main'>
      <RequestsPage 
        connectEndpoint={connectEndpoint}
        onConnectEndpointChange={newValue => setConnectEndpoint(newValue)}
        connectHeaders={connectHeaders}
        onConnectHeadersChange={newValue => setConnectHeaders(newValue)}
        onConnect={() => connect(connectEndpoint, JSON.parse(connectHeaders || ''))}
        subscribeDestination={subscribeDestination}
        onSubscribeDestinationChange={newValue => setSubscribeDestination(newValue)}
        sendDestination={sendDestination}
        onSendDestinationChange={newValue => setSendDestination(newValue)}
        sendBody={sendBody}
        onSendBodyChange={newValue => setSendBody(newValue)}
        onSend={() => {
          stompClient.send(sendDestination, sendBody);
        }}
        onSubscribe={() => {
            stompClient.subscribe(subscribeDestination, (payload: any) => { 
              setMessages(prevMessages => [...prevMessages, {text: JSON.stringify(payload), type: 'income'}]);
            })
          }
        }
        className='main__inner-page' 
      />
      <MessagesPage className='main__inner-page' messages={messages}/>
    </div>
  )
}

export default Main

const connect = (connectEndpoint: string, headers: any) => {
    const sock = new SockJS(connectEndpoint);
    stompClient = Stomp.over(sock);
    stompClient.connect(headers, onConnected, onError);
};

const onConnected = () => {
  console.log('Connected');
};

const onError = (error: any) => {
  console.log('Failed to connect', error);
};
