import { Select } from '@mantine/core'
import style from './styles.module.scss'

interface CitySelectProps {
  value: number | null
  onChange: (value: number | null) => void
}

const cities = [
  { value: 0, label: 'Все города' },
  { value: 1, label: 'Москва' },
  { value: 2, label: 'Санкт-Петербург' },
]

export const CitySelect = ({ value, onChange }: CitySelectProps) => {
  const handleChange = (selectedValue: string | null) => {
    const newValue = selectedValue !== null ? Number(selectedValue) : null
    onChange(newValue)
  }

  return (
    <div className={style.container}>
      <Select
        className={style.select}
        placeholder="Выберите город"
        value={value !== null ? String(value) : '0'}
        onChange={handleChange}
        data={cities.map((city) => ({
          value: String(city.value),
          label: city.label,
        }))}
        clearable={false}
      />
    </div>
  )
}
