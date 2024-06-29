import {useEffect, useState} from 'react'
import MessagesPage from "../MessagesPage/MessagesPage"
import RequestsPage from "../RequestsPage/RequestsPage"
import './main.css'
import './__inner-page/main__inner-page.css'
import {Client, StompConfig} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient: Client;

const Main = () => {
    const [messages, setMessages] = useState([]);
    const [connectEndpoint, setConnectEndpoint] = useState(localStorage.getItem('connectEndpoint') || '');
    const [connectHeaders, setConnectHeaders] = useState(localStorage.getItem('connectHeaders') || '');
    const [sendDestination, setSendDestination] = useState(localStorage.getItem('sendDestination') || '');
    const [sendBody, setSendBody] = useState(localStorage.getItem('sendBody') || '');
    const [subscribeDestination, setSubscribeDestination] = useState(localStorage.getItem('subscribeDestination') || '');
    const [connected, setConnected] = useState(false);
    const [subscriptionDestinations, setSubscriptionDestinations] = useState([]);

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
            stompClient.deactivate();
        } else {
            pushMessageToTop({text: 'Trying to connect...', type: 'info'});
            let stompConfig: StompConfig = {
                webSocketFactory: () => new SockJS(connectEndpoint),
                beforeConnect: function() {
                    this.connectHeaders = JSON.parse(connectHeaders || '');
                },
                onConnect: () => {
                    setConnected(true);
                    pushMessageToTop({text: 'Connected to ' + connectEndpoint, type: 'info'});
                    console.log('Connected');
                },
                onStompError: (error) => {
                    pushMessageToTop({text: JSON.stringify(error), type: 'error'});
                    console.log('Failed to connect', error);
                },
                debug: (log: string) => {
                    let type: string = 'info';

                    if (log.startsWith('>>>')) {
                        type = 'outcome';
                    } else if (log.startsWith('<<<')) {
                        type = 'income';
                    }

                    pushMessageToTop({text: log, type: type});
                    console.log(log);
                },
            };

            stompClient = new Client(stompConfig);
            stompConfig

            stompClient.activate();
        }
    };

    const send = () => {
        if (connected) {
            pushMessageToTop({text: 'Sent to ' + sendDestination, type: 'info'});
            stompClient.publish({destination: sendDestination, body: sendBody });
        } else {
            pushMessageToTop({text: 'You are not connected to send a message', type: 'error'});
        }
    };

    const subscribe = () => {
        pushSubscriptionToTop(subscribeDestination, stompClient.subscribe(subscribeDestination, () => {}));
    };

    const unsubscribe = (destination) => {
        subscriptionDestinations
            .filter(subscription => subscription.destination == destination)
            .forEach(subscription => subscription.subscription.unsubscribe());

        setSubscriptionDestinations(subscriptionDestinations.filter(subscription => subscription.destination !== destination));
    };

    const pushMessageToTop = (message) => {
        setMessages(prevMessages => [message, ...prevMessages]);
    };

    const pushSubscriptionToTop = (destination, subscription) => {
        setSubscriptionDestinations(prevSubscriptions => [
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
                subscriptionDestinations={subscriptionDestinations.map(subscription => subscription.destination)}
                connected={connected}
                className='main__inner-page'
            />
            <MessagesPage className='main__inner-page' messages={messages}/>
        </div>
    )
}

export default Main