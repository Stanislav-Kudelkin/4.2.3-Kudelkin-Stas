import { Input, Button, Pill } from '@mantine/core'
import { useState } from 'react'
import style from './styles.module.scss'

interface FiltersProps {
  skills: string[]
  onAddSkill: (skill: string) => void
  onRemoveSkill: (skill: string) => void
}

export const Filters = ({
  skills,
  onAddSkill,
  onRemoveSkill,
}: FiltersProps) => {
  const [newSkill, setNewSkill] = useState('')

  const handleAdd = () => {
    if (newSkill.trim()) {
      onAddSkill(newSkill.trim())
      setNewSkill('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  return (
    <div className={style.filters}>
      <div className={style.skillsSection}>
        <label className={style.skillsLabel}>Ключевые навыки</label>
        <div className={style.addSkill}>
          <Input
            placeholder="Добавить навык"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button onClick={handleAdd}>+</Button>
        </div>
        <div className={style.skillsList}>
          {skills.map((skill) => (
            <Pill
              className={style.pill}
              key={skill}
              withRemoveButton
              onRemove={() => onRemoveSkill(skill)}
              size="md"
            >
              {skill}
            </Pill>
          ))}
        </div>
      </div>
    </div>
  )
}
