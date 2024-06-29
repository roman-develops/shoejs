import './__text-field/subscribe-page__text-field.css'
import './__subscription-list/subscribe-page__subscription-list.css'
import Button from '../Button/Button'
import TextField from '../TextField/TextField'
import SubscriptionList from "../SubscriptionList/SubscriptionList.tsx";

interface Props {
    subscribeDestination: string;
    onSubscribeDestinationChange: (value: string) => void;
    onSubscribe: () => void;
    onUnsubscribe: (destination: string) => void;
    subscriptionDestinations: string[];
}

const SubscribePage = ({
                           subscribeDestination,
                           onSubscribeDestinationChange,
                           onSubscribe,
                           onUnsubscribe,
                           subscriptionDestinations
                       }: Props) => {
    return (
        <div className='subscribe-page'>
            <div>
                <TextField
                    className='subscribe-page__text-field'
                    value={subscribeDestination}
                    onValueChange={onSubscribeDestinationChange}
                    placeholder='Destination'
                    example='/user/queue/games'
                />
                <Button
                    text='Subscribe'
                    onClick={onSubscribe}
                />
            </div>
            <SubscriptionList
                className='subscribe-page__subscription-list'
                destinations={subscriptionDestinations}
                onUnsubscribe={onUnsubscribe}
            />
        </div>
    )
}

export default SubscribePage