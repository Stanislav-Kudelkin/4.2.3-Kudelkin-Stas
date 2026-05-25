import style from './styles.module.scss'

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={style.card}>
      <div>{children}</div>
    </div>
  )
}
