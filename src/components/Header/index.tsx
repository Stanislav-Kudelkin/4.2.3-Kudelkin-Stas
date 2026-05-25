import style from './styles.module.scss'
import { Profile } from '@/UI'

export const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.logos}>
        <p className={style.logo}>hh</p>
        <span className={style.part}> .FrontEnd </span>
      </div>
      <div className={style.insert}>
        <a href="" className={style.title}>
          Вакансии FE
        </a>
        <a href="" className={style.about}>
          <Profile />
          Обо мне
        </a>
      </div>
    </div>
  )
}
