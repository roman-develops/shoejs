import './tab.css'
import './__selected-indicator/tab__selected-indicator.css'
import './__selected-indicator/_state/_show/tab_state_show.css'
import './__li/tab__li.css'
import './_state/tab_state_selected.css'
import './_state/tab_state_unselected.css'

export interface TabProps {
    text: string;
    selected?: boolean;
    onClick?: () => void;
}

const Tab = ({text, selected, onClick}: TabProps) => {
    return (
        <div className={"tab " + (selected ? "tab_state_selected" : "tab_state_unselected")}>
            <li onClick={onClick} className='tab__li' title={text}>{text}</li>
            <div className={'tab__selected-indicator ' + (selected && 'tab_state_show')}/>
        </div>
    )
}

export default Tab