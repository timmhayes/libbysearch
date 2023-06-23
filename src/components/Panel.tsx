import "./Panel.scss";

interface TabsProps {
  children: React.ReactNode | React.ReactFragment,
  title? : string
}

function Panel(props: TabsProps) {

  return (
    <div className="panel">
      { props.title && <div className="panel-header">{props.title}</div> }
      <div className="panel-content">
      {props.children}
      </div>
    </div>
  );
}

export { Panel };