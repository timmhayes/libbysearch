import React, { useState, useId} from "react";
import { CounterPill } from "./CounterPill";
import "./Tabs.scss";

interface TabsProps {
  children: React.ReactElement<TabPanelProps>[];
  defaultTabIndex?: number;
}

function Tabs(props: TabsProps) {
  const [activeTab, setActiveTab] = useState(props.children[props.defaultTabIndex||0].props.title);
  const tabsID = useId();

  return (
    <div className="tabs">
      <div className="tablist">
        {props.children.map((child: React.ReactElement, index:number)=> {
          const { title, counter } = child.props;
          const selected = activeTab === title;
          return (
            <button
              id={tabsID + index + "-tab"}
              onClick={() => setActiveTab(title)}
              key={title}
              disabled={child.props.disabled}
              aria-current={selected}
              aria-controls={tabsID + index + "-panel"}
              className={'tab ' + (selected ? "tab-active" : "")}>
              <span>{title}</span>{typeof counter === 'number' && <CounterPill count={counter}/>}
            </button>
          );
        })}
      </div>
      {props.children.map((child:React.ReactElement, index:number) => {
        const selected = activeTab === child.props.title;
        return (
        <div
          id={tabsID + index + "-panel"}
          aria-labelledby={tabsID + index + "-tab"}
          className={'tab-panel ' + (selected ? "tab-panel-active" : "")}
          key={child.props.title}
        >
          {child.props.children}
        </div>
        )
      })}
    </div>
  );
}

interface TabPanelProps {
  title: string;
  counter?: number;
  disabled?: boolean;
  children: React.ReactNode | React.ReactFragment
}

function TabPanel( props: TabPanelProps) {
  return (
    <div className="tab-panel">
      {props.children}
    </div>
  )
}

export { Tabs, TabPanel}