import { useEffect, useState } from "react";
import './Toast.scss'

function Toast(props:{message: string}) {

  let [className, setClassName] = useState('toast');

  useEffect(() => {
    if (props.message) {
      setClassName('toast toast-active')
      const timer = setTimeout(() => {
        setClassName('toast')
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [props.message]);

  return (
    <div className={className} aria-live="polite">
      <p>{props.message}</p>
    </div>
  );

}

export { Toast };