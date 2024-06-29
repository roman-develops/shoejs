import {useState} from 'react'
import './requests-page.css'
import './__subtitle/requests-page__subtitle.css'
import './__content/request-page__content.css'
import './__tab-list/request-page__tab-list.css'
import Subtitle from '../Subtitle/Subtitle'
import TabList from '../TabList/TabList'
import ConnectPage from '../ConnectPage/ConnectPage'
import SubscribePage from '../SubscribePage/SubscribePage'
import SendPage from '../SendPage/SendPage'

interface Props {
    connectEndpoint: string;
    onConnectEndpointChange: (value: string) => void;
    connectHeaders: string;
    onConnectHeadersChange: (value: string) => void;
    onConnect: () => void;
    subscribeDestination: string;
    onSubscribeDestinationChange: (value: string) => void;
    sendDestination: string;
    onSendDestinationChange: (value: string) => void;
    sendBody: string;
    onSendBodyChange: (value: string) => void;
    onSend: () => void;
    onSubscribe: () => void;
    onUnsubscribe: (destination: string) => void;
    subscriptionDestinations: string[];
    connected?: boolean;
    className?: string;
}

const tabComponents = {
    'Connect': (props: Props) => (
        <ConnectPage
            connected={props.connected}
            connectEndpoint={props.connectEndpoint}
            onConnectEndpointChange={props.onConnectEndpointChange}
            connectHeaders={props.connectHeaders}
            onConnectHeadersChange={props.onConnectHeadersChange}
            onConnect={props.onConnect}
        />
    ),
    'Subscribe': (props: Props) => (
        <SubscribePage
            subscribeDestination={props.subscribeDestination}
            onSubscribeDestinationChange={props.onSubscribeDestinationChange}
            onSubscribe={props.onSubscribe}
            onUnsubscribe={props.onUnsubscribe}
            subscriptionDestinations={props.subscriptionDestinations}
        />
    ),
    'Send': (props: Props) => (
        <SendPage
            sendDestination={props.sendDestination}
            onSendDestinationChange={props.onSendDestinationChange}
            sendBody={props.sendBody}
            onSendBodyChange={props.onSendBodyChange}
            onSend={props.onSend}
        />
    ),
};

const RequestsPage = (props: Props) => {
    const [selectedTab, setSelectedTab] = useState('Connect');

    const SelectedTabComponent = tabComponents[selectedTab];

    return (
        <div className={`requests-page ${props.className}`}>
            <Subtitle className='requests-page__subtitle' text='Requests'/>
            <TabList
                className='request-page__tab-list'
                tabs={Object.keys(tabComponents).map(tab => ({text: tab}))}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />
            <div className='request-page__content'>
                {SelectedTabComponent && <SelectedTabComponent {...props} />}
            </div>
        </div>
    )
}

export default RequestsPage