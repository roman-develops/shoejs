import React from 'react'
import './tab-list.css'
import Tab, {TabProps} from "../Tab/Tab";

interface Props {
  tabs: TabProps[];
  className?: string;
  selectedTab: string;
  setSelectedTab: (index: string) => void;
}

const TabList = (props: Props) => {
  return (
      <ul className={`tab-list ${props.className}`}>
        {props.tabs.map((tab) =>
            <Tab
                {...tab}
                selected={tab.text === props.selectedTab}
                onClick={() => props.setSelectedTab(tab.text)}
            />)}
      </ul>
  )
}

export default TabList