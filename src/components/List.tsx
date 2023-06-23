import "./Lists.scss";

interface ListGenericProps {
  children: React.ReactNode | React.ReactFragment,
  className?: string
}

function List(props: ListGenericProps) {

  return (
    <ul className={props.className ? 'list ' + props.className : 'list'}>
      {props.children}
    </ul>
  );
}

function ListItem(props: ListGenericProps) {
  return (
    <li className={props.className ? 'list-item ' + props.className : 'list-item'}>
      {props.children}
    </li>
  )
}

interface ListItemImageProps {
  src: string,
  alt: string,
  className?: string
}

function ListItemImage(props: ListItemImageProps) {
  return (
    <div className={props.className ? 'list-item-image ' + props.className : 'list-item-image'}>
      <img alt={props.alt} src={props.src} />
    </div>
  )
}

function ListItemContent(props: ListGenericProps) {
  return (
    <div className={props.className ? 'list-item-content ' + props.className : 'list-item-content'}>
      {props.children}
    </div>
  )
}

function ListItemButtons(props: ListGenericProps) {
  return (
    <div className={props.className ? 'list-item-buttons ' + props.className : 'list-item-buttons'}>
      {props.children}
    </div>
  )
}


export { List, ListItem, ListItemImage, ListItemContent, ListItemButtons }