import "./ListImageBox.scss";

interface TabsProps {
  imgsrc: string,
  imgalt: string,
  children: React.ReactNode | React.ReactFragment
}

function ListImageBox(props: TabsProps) {

  return (
    <div className="list-image-box">
      <div className="list-image-image"><img alt={props.imgalt} src={props.imgsrc} /></div>
      <div className="list-image-content">
        {props.children}
      </div>
    </div>
  );
}

export { ListImageBox };