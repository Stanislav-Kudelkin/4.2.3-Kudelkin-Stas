import style from './styles.module.scss'

interface CounterProps {
  count: number
  onChange: (newCounter: number) => void
  min: number
}

export const Counter = ({ count, onChange, min }: CounterProps) => {
  return (
    <div className={style.container}>
      <button
        className={style.button}
        onClick={() => {
          if (count > min) onChange(count - 1)
        }}
      >
        <span className={style.span}>-</span>
      </button>
      <span className={style.meaning}>{count}</span>
      <button
        className={style.button}
        onClick={() => {
          if (count < 10) onChange(count + 1)
        }}
      >
        <span className={style.span}>+</span>
      </button>
    </div>
  )
}
