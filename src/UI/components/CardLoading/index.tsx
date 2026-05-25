import style from './styles.module.scss'

export const CardLoading = () => {
  return (
    <div className={style.skeletonCard}>
      <div className={style.skeletonTitle} />
      <div className={style.skeletonSalary} />
      <div className={style.skeletonCompany} />
      <div className={style.skeletonInfo} />
      <div className={style.skeletonLocation} />
    </div>
  )
}
