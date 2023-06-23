import './CounterPill.scss'

function CounterPill(props: { count: number }) {
  return (
    <span className="counter-pill">{props.count}</span>
  )
}

export { CounterPill };