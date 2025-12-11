import style from './styles.module.scss'
import { Card, LoaderIcon } from '@/UI'

export const CardLoading = () => {
  return (
    <Card>
      <div className={style.image}>
        <LoaderIcon />
      </div>
    </Card>
  )
}
