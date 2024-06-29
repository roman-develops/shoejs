import React from 'react'
import './subscription-list.css'
import Subscription from "../Subscription/Subscription.tsx";

interface Props {
    destinations: string[];
    className?: string;
    onUnsubscribe: (destination) => void;
}

const SubscriptionList = ({destinations, className = '', onUnsubscribe}: Props) => {
    return (
        <div className={`subscription-list ${className}`}>
            {destinations.map((destination) =>
                <Subscription destination={destination} onUnsubscribe={onUnsubscribe}/>)}
        </div>
    )
}

export default SubscriptionList