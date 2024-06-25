import React, { ReactNode, useState } from 'react'
import './tab-list.css'
import Tab, { TabProps } from "../Tab/Tab";

interface Props {
  tabs: TabProps[];
  className?: string;
  selectedTab: string;
  setSelectedTab: (index: string) => void;
}

const TabList = ({tabs, className, selectedTab, setSelectedTab}: Props) => {
  return (
    <ul className={`tab-list ${className}`}>
      {tabs.map((tab, index) => 
      <Tab 
        {...tab} 
        selected={tab.text === selectedTab}
        onClick={ () => setSelectedTab(tab.text)}
      />)}
    </ul>
  )
}

export default TabList