import './send-page.css'
import './__label-container/send-page__label-container.css'
import './__text-area/send-page__text-area.css'
import './__button/send-page__button.css'
import './__text-field/send-page__text-field.css'
import Button from '../Button/Button'
import TextField from '../TextField/TextField'
import TextArea from '../TextArea/TextArea'


interface Props {
    sendDestination: string;
    onSendDestinationChange: (value: string) => void;
    sendBody: string;
    onSendBodyChange: (value: string) => void;
    onSend?: () => void;
}

const SendPage = ({sendDestination, onSendDestinationChange, sendBody, onSendBodyChange, onSend}: Props) => {
    return (
        <div className='send-page'>
            <TextField
                className='send-page__text-field'
                placeholder='Destination'
                example='/app/tables/o20X2mlK6d8VF2vHeqbh/create-game'
                value={sendDestination}
                onValueChange={onSendDestinationChange}
            />
            <TextArea
                className='send-page__text-area'
                placeholder='Body'
                example='{“tableId”: 5}'
                value={sendBody}
                onValueChange={onSendBodyChange}
            />
            <Button
                text='Send'
                className='send-page__button'
                onClick={onSend}
            />
        </div>
    )
}

export default SendPage