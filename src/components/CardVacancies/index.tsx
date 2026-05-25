import { Button, Badge } from '@mantine/core'
import { Card } from '@/UI'
import type { Vacancy } from '@/modules'
import style from './styles.module.scss'

interface VacancyCardProps {
  vacancy: Vacancy
}

export const VacancyCard = ({ vacancy }: VacancyCardProps) => {
  const formatSalary = (): string => {
    if (!vacancy.salary) return 'Зарплата не указана'

    const { from, to, currency } = vacancy.salary
    const currencySymbol = currency === 'RUR' ? '₽' : currency || ''

    if (from && to) {
      return `${from.toLocaleString()} - ${to.toLocaleString()} ${currencySymbol}`
    }
    if (from) {
      return `от ${from.toLocaleString()} ${currencySymbol}`
    }
    if (to) {
      return `до ${to.toLocaleString()} ${currencySymbol}`
    }
    return 'Зарплата не указана'
  }

  const getWorkFormatTag = (): { text: string; className: string } | null => {
    if (!Array.isArray(vacancy.work_format)) {
      return null
    }

    const firstFormat = vacancy.work_format[0]
    if (!firstFormat || typeof firstFormat.name !== 'string') {
      return null
    }

    const formatName = firstFormat.name.toLowerCase()

    if (formatName.includes('удалённо') || formatName.includes('удаленно')) {
      return { text: 'Можно удалённо', className: style.badgeRemotely }
    }
    if (formatName.includes('гибрид')) {
      return { text: 'Гибрид', className: style.badgeHybrid }
    }
    if (formatName.includes('месте')) {
      return { text: 'Офис', className: style.badgeOffice }
    }

    return null
  }

  const workTag = getWorkFormatTag()

  return (
    <Card>
      <h3 className={style.title}>{vacancy.name}</h3>
      <div className={style.info}>
        <div className={style.salary}>{formatSalary()}</div>
        <span className={style.experience}>
          {vacancy.experience?.name || 'Без опыта'}
        </span>
      </div>

      <div className={style.company}>{vacancy.employer.name}</div>
      {workTag && (
        <Badge className={workTag.className} size="xs" radius={4}>
          {workTag.text}
        </Badge>
      )}
      <div className={style.location}>
        {vacancy.area?.name || 'Город не указан'}
      </div>

      <div className={style.actions}>
        <Button className={style.view}>Смотреть вакансию</Button>
        <Button
          component="a"
          href={vacancy.alternate_url}
          target="_blank"
          className={style.reply}
        >
          Откликнуться
        </Button>
      </div>
    </Card>
  )
}
