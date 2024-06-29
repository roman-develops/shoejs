import {useState} from 'react'
import './message.css'
import './_type/message_type_income.css'
import './_type/message_type_outcome.css'
import './_type/message_type_info.css'
import './_type/message_type_error.css'
import './_size/message_size_expanded.css'

export interface MessageProps {
    text: string;
    type?: 'income' | 'outcome' | 'info' | 'error';
}

const Message = ({text, type = 'outcome'}: MessageProps) => {
    const typeStyles = new Map<MessageProps['type'], string>([
        ['income', 'message_type_income'],
        ['outcome', 'message_type_outcome'],
        ['info', 'message_type_info'],
        ['error', 'message_type_error']
    ]);

    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`message ${typeStyles.get(type)} ${(expanded ? ' message_size_expanded' : '')}`}
             onClick={(event) => {
                 if (event.altKey) {
                     setExpanded(!expanded);
                 }
             }
             }>
            {text}
        </div>
    )
}

export default Message