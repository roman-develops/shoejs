import {useEffect, useState} from 'react'
import MessagesPage from "../MessagesPage/MessagesPage"
import RequestsPage from "../RequestsPage/RequestsPage"
import './main.css'
import './__inner-page/main__inner-page.css'
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient;

const Main = () => {
    const [messages, setMessages] = useState([]);
    const [connectEndpoint, setConnectEndpoint] = useState(localStorage.getItem('connectEndpoint') || '');
    const [connectHeaders, setConnectHeaders] = useState(localStorage.getItem('connectHeaders') || '');
    const [sendDestination, setSendDestination] = useState(localStorage.getItem('sendDestination') || '');
    const [sendBody, setSendBody] = useState(localStorage.getItem('sendBody') || '');
    const [subscribeDestination, setSubscribeDestination] = useState(localStorage.getItem('subscribeDestination') || '');
    const [connected, setConnected] = useState(false);
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        localStorage.setItem('connectEndpoint', connectEndpoint);
        localStorage.setItem('connectHeaders', connectHeaders);
        localStorage.setItem('subscribeDestination', subscribeDestination);
        localStorage.setItem('sendDestination', sendDestination);
        localStorage.setItem('sendBody', sendBody);
    }, [connectEndpoint, connectHeaders, subscribeDestination, sendDestination, sendBody]);


    const switchConnection = () => {
        if (connected) {
            setConnected(false);
            pushMessageToTop({text: 'Disconnected', type: 'info'});
            stompClient.disconnect();
        } else {
            pushMessageToTop({text: 'Trying to connect...', type: 'info'});
            const sock = new SockJS(connectEndpoint);
            stompClient = Stomp.over(sock);
            stompClient.connect(JSON.parse(connectHeaders || ''), onConnected, onError);
        }
    };

    const send = () => {
        if (connected) {
            pushMessageToTop({text: 'Sent to ' + sendDestination, type: 'info'});
            stompClient.send(sendDestination, sendBody);
        } else {
            pushMessageToTop({text: 'You are not connected to send a message', type: 'error'});
        }
    };

    const subscribe = () => {
        pushSubscriptionToTop(subscribeDestination, stompClient.subscribe(subscribeDestination, (payload) => {
            pushMessageToTop({text: JSON.stringify(payload), type: 'income'});
        }));
    };

    const unsubscribe = (destination) => {
        subscriptions
            .filter(subscription => subscription.destination == destination)
            .forEach(subscription => subscription.subscription.unsubscribe());

        setSubscriptions(subscriptions.filter(subscription => subscription.destination !== destination));
    };

    const onConnected = () => {
        setConnected(true);
        pushMessageToTop({text: 'Connected to ' + connectEndpoint, type: 'info'});
        console.log('Connected');
    };

    const onError = (error) => {
        pushMessageToTop({text: JSON.stringify(error), type: 'error'});
        console.log('Failed to connect', error);
    };

    const pushMessageToTop = (message) => {
        setMessages(prevMessages => [message, ...prevMessages]);
    };

    const pushSubscriptionToTop = (destination, subscription) => {
        setSubscriptions(prevSubscriptions => [
            {
                destination: destination,
                subscription: subscription
            }, ...prevSubscriptions]);
    };

    return (
        <div className='main'>
            <RequestsPage
                connectEndpoint={connectEndpoint}
                onConnectEndpointChange={setConnectEndpoint}
                connectHeaders={connectHeaders}
                onConnectHeadersChange={setConnectHeaders}
                onConnect={switchConnection}
                subscribeDestination={subscribeDestination}
                onSubscribeDestinationChange={setSubscribeDestination}
                sendDestination={sendDestination}
                onSendDestinationChange={setSendDestination}
                sendBody={sendBody}
                onSendBodyChange={setSendBody}
                onSend={send}
                onSubscribe={subscribe}
                onUnsubscribe={unsubscribe}
                subscriptionDestinations={subscriptions.map(subscription => subscription.destination)}
                connected={connected}
                className='main__inner-page'
            />
            <MessagesPage className='main__inner-page' messages={messages}/>
        </div>
    )
}

export default Main