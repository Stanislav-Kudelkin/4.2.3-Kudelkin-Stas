import { Input, Button } from '@mantine/core'
import style from './styles.module.scss'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  loading?: boolean
  placeholder?: string
}

export const SearchBar = ({
  value,
  onChange,
  onSearch,
  loading = false,
  placeholder = 'Должность или название компании',
}: SearchBarProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className={style.searchBox}>
      <Input
        className={style.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button className={style.button} onClick={onSearch} loading={loading}>
        Найти
      </Button>
    </div>
  )
}
