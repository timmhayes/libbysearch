import { useState } from 'react'
import './ButtonDelete.scss'

interface Props {
  onDelete: () => void,
  title?: string
}

function ButtonDelete (props:Props) {

  let [confirmDelete, setConfirmDelete ] = useState(false);

  const title = props.title || 'delete'

  const clickHandler = () => {
    if (confirmDelete) {
      props.onDelete()
    } else {
      setConfirmDelete(true)
    }
  }

  return (
    <div className='button-delete-group'>
      { confirmDelete &&
        <button
          onClick={() => setConfirmDelete(false)}
          className='button-icon-default button-delete button-delete-cancel'
          aria-label={`cancel ${title}`}>
        </button>
      }
      <button
        onClick={clickHandler}
        className={`button-icon-default button-delete ${confirmDelete ? 'button-delete-confirm button-warning': ''}`}
        aria-label={confirmDelete ? `confirm ${title}?` : title}>
      </button>
    </div>
  )
}

export { ButtonDelete };