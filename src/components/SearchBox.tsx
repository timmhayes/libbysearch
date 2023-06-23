import { useId } from 'react';
import './SearchBox.scss'

interface Props {
  value: string,
  label: string,
  placeholder: string,
  onChange: (value:string) => void,
  onSubmit?: (value:string) => void
}

function SearchBox(props: Props) {
  const id = useId();

  const keyDownHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') submitIf()
  }

  const submitIf = () => {
    if (props.onSubmit) {
      props.onSubmit(props.value)
    }
  }

  return (
    <div className='search-box'>
      <label htmlFor={id} className='block-label'>{props.label}</label>
      <div className="search-box-panel">
        <input className="search-box-input"
          id={id}
          type="search"
          value={props.value}
          placeholder={props.placeholder}
          onChange={e => props.onChange(e.target.value)}
          onKeyDown={keyDownHandler}
        />
      </div>
    </div>
  )
}

export { SearchBox };