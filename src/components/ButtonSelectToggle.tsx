import { useState, useEffect } from 'react'
import './ButtonSelectToggle.scss'

interface Props {
  selected: boolean,
  onAdd: () => void,
  onRemove: () => void,
  title?: string
}

function ButtonSelectToggle (props: Props) {

  const [selected, setSelected] = useState(props.selected)

  useEffect(() => {
    if (props.selected !== selected) {
      setSelected(props.selected);
    }
  }, [props.selected]);

  let title, ariaLabel, ariaSuffix

  const onClick = () => {
    setSelected(!selected)
    selected ? props.onRemove() : props.onAdd()
  }

  ariaSuffix = props.title ? ' ' + props.title : ''

  let className = 'button-icon-default button-select-toggle'
  if (selected) {
    className += ' button-select-toggle-on'
    title = ''
    ariaLabel = 'Remove' + ariaSuffix
  } else {
    className += ' button-primary'
    title = 'Add'
    ariaLabel = 'Add' + ariaSuffix
  }

  return (
    <button
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}> {title}
    </button>
  )
}

export { ButtonSelectToggle };