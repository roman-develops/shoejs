import {useEffect, useState} from 'react'
import MessagesPage from "../MessagesPage/MessagesPage"
import RequestsPage from "../RequestsPage/RequestsPage"
import './main.css'
import './__inner-page/main__inner-page.css'
import {Client, StompConfig, StompSubscription} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {MessageProps} from "../Message/Message.tsx";

let stompClient: Client;

interface SubscriptionDestination {
    destination: string;
    subscription: StompSubscription;
}

const Main = () => {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [connectEndpoint, setConnectEndpoint] = useState(localStorage.getItem('connectEndpoint') || '');
    const [connectHeaders, setConnectHeaders] = useState(localStorage.getItem('connectHeaders') || '');
    const [sendDestination, setSendDestination] = useState(localStorage.getItem('sendDestination') || '');
    const [sendBody, setSendBody] = useState(localStorage.getItem('sendBody') || '');
    const [subscribeDestination, setSubscribeDestination] = useState(localStorage.getItem('subscribeDestination') || '');
    const [connected, setConnected] = useState(false);
    const [subscriptionDestinations, setSubscriptionDestinations] = useState<SubscriptionDestination[]>([]);

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
            const stompConfig: StompConfig = {
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

                    pushMessageToTop({text: log, type: type as MessageProps['type']});
                    console.log(log);
                },
            };

            stompClient = new Client(stompConfig);

            stompClient.activate();
        }
    };

    const send = () => {
        if (connected) {
            stompClient.publish({destination: sendDestination, body: sendBody });
        } else {
            pushMessageToTop({text: 'You are not connected to send a message', type: 'error'});
        }
    };

    const subscribe = () => {
        pushSubscriptionToTop(subscribeDestination, stompClient.subscribe(subscribeDestination, (payload) => {
            pushMessageToTop({text: payload.body, type: "income"});
        }));
    };

    const unsubscribe = (destination: string) => {
        subscriptionDestinations
            .filter(subscription => subscription.destination == destination)
            .forEach(subscription => subscription.subscription.unsubscribe());

        setSubscriptionDestinations(subscriptionDestinations.filter(subscription => subscription.destination !== destination));
    };

    const pushMessageToTop = (message: MessageProps) => {
        setMessages(prevMessages => [message, ...prevMessages]);
    };

    const pushSubscriptionToTop = (destination: string, subscription: StompSubscription) => {
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
            <MessagesPage
                className='main__inner-page'
                messages={messages}
            />
        </div>
    )
}

export default Main