import { useState, useEffect } from 'react';
import './Checkbox.scss'

interface Props {
  title: string,
  checked?: boolean,
  name?: string,
  value?: string,
  onChange: (checked: boolean) => void
}

function Checkbox (props:Props) {
  const [checked, setChecked] = useState(props.checked || false);
  useEffect(() => {
    if (props.checked !== checked) {
      setChecked(props.checked||false);
    }
  }, [props.checked]);

  const changeHandler = () => {
    const checkState = !checked
    setChecked(checkState)
    props.onChange(checkState)
  }

  return (
    <label className='checkbox-box'>
      <input
        type="checkbox"
        className="checkbox-input"
        name={props.name}
        title={props.title}
        checked={checked}
        onChange={changeHandler}/>
        {props.title}
    </label>
  )
}

export { Checkbox };