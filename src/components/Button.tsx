import './Button.scss'

interface Props {
  onClick: () => void,
  className?: string,
  children?: React.ReactNode | React.ReactFragment,
  disabled?: boolean,
  title?: string
}

function Button (props: Props) {

  const title = props.title
  const className = props.className + ' button-default button-primary'

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={className}>
      {props.children || title}
    </button>
  )
}

export { Button };