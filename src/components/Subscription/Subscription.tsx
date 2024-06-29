import './subscription.css'
import './__destination/subscription__destination.css'
import Button from "../Button/Button.tsx";

export interface Props {
    destination: string;
    onUnsubscribe: (destination: string) => void;
}

const Subscription = ({destination, onUnsubscribe}: Props) => {
    return (
        <div className='subscription'>
            <div className='subscription__destination'>
                {destination}
            </div>
            <Button text='Unsubscribe' styleType='tertiary' onClick={() => onUnsubscribe(destination)} />
        </div>
    )
}

export default Subscription