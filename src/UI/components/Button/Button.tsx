import style from './styles.module.scss'
import type { MouseEventHandler, ReactNode } from 'react'

interface ButtonProps {
  icon: ReactNode
  title: string
  id?: number
  onClick: MouseEventHandler<HTMLButtonElement>
  variant: 'card' | 'header'
  quantity?: number
}

export const Button = ({
  icon,
  title,
  variant = 'card',
  onClick,
  quantity,
}: ButtonProps) => {
  return (
    <button
      type="submit"
      className={`${style.button} ${style[variant]}`}
      onClick={onClick}
    >
      {quantity && quantity > 0 && (
        <span className={style.quantity}>{quantity}</span>
      )}
      {title}
      {icon && <span className={style.icon}>{icon}</span>}
    </button>
  )
}
