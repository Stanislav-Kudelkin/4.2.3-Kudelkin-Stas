import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux.hookcs'
import {
  fetchVacancies,
  selectVacancies,
  selectVacanciesLoading,
  selectVacanciesError,
  selectCurrentPage,
  selectTotalPages,
  selectSearchFiled,
  setPage,
  setSearchFiled,
  selectArea,
  setArea,
  selectSkills,
  removeSkill,
  addSkill,
} from '@/store/vanciesSlise'
import { Header, VacancyCard, Filters } from '@/components'
import { Button, Pagination } from '@mantine/core'
import style from './styles.module.scss'
import { CardLoading } from '@/UI'
import { CitySelect } from '@/components/CitySelect'
import { SearchBar } from '@/components/SearchBar'

export const VacanciesList = () => {
  const dispatch = useAppDispatch()

  const vacancies = useAppSelector(selectVacancies)
  const loading = useAppSelector(selectVacanciesLoading)
  const error = useAppSelector(selectVacanciesError)
  const currentPage = useAppSelector(selectCurrentPage)
  const totalPages = useAppSelector(selectTotalPages)
  const searchFiled = useAppSelector(selectSearchFiled)
  const area = useAppSelector(selectArea)
  const skills = useAppSelector(selectSkills)

  const [localSearch, setLocalSearch] = useState(searchFiled)
  const [localCity, setLocalCity] = useState(area)

  useEffect(() => {
    dispatch(fetchVacancies())
  }, [dispatch])

  useEffect(() => {
    setLocalSearch(searchFiled)
  }, [searchFiled])

  useEffect(() => {
    setLocalCity(area)
  }, [area])

  const refreshVacancies = () => {
    dispatch(setPage(0))
    dispatch(fetchVacancies())
  }

  const handleSearch = () => {
    dispatch(setSearchFiled(localSearch))
    refreshVacancies()
  }

  const handleCityChange = (value: number | null) => {
    setLocalCity(value)
    dispatch(setArea(value))
    refreshVacancies()
  }

  const handleAddSkill = (skill: string) => {
    dispatch(addSkill(skill))
    refreshVacancies()
  }

  const handleRemoveSkill = (skill: string) => {
    dispatch(removeSkill(skill))
    refreshVacancies()
  }

  const handlePageChange = (page: number) => {
    dispatch(setPage(page - 1))
    dispatch(fetchVacancies())
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (error) {
    return (
      <div className={style.error}>
        <p>
          Сервис временно недоступен. <br /> {error}
        </p>
        <Button onClick={() => dispatch(fetchVacancies())}>
          Попробовать снова
        </Button>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.wrapper}>
          <div className={style.titleBox}>
            <h2 className={style.title}>Список вакансий</h2>
            <p className={style.addition}>по профессии Frontend-разработчик</p>
          </div>
          <SearchBar
            value={localSearch}
            onChange={setLocalSearch}
            onSearch={handleSearch}
            loading={loading}
          />
        </div>
        <div className={style.wrapper}>
          <div className={style.box}>
            <Filters
              skills={skills}
              onAddSkill={handleAddSkill}
              onRemoveSkill={handleRemoveSkill}
            />
            <CitySelect value={localCity} onChange={handleCityChange} />
          </div>
          <div className={style.vacanciesList}>
            {loading ? (
              [...Array(10)].map((_, index) => <CardLoading key={index} />)
            ) : vacancies.length === 0 ? (
              <div className={style.empty}>
                <p>Ничего не найдено</p>
                <p>Попробуйте изменить параметры поиска</p>
              </div>
            ) : (
              vacancies.map((vacancy) => (
                <VacancyCard key={vacancy.id} vacancy={vacancy} />
              ))
            )}
          </div>
        </div>
        {totalPages > 1 && (
          <div className={style.pagination}>
            <Pagination
              className={style.pagination}
              total={totalPages}
              value={currentPage + 1}
              onChange={handlePageChange}
              disabled={loading}
              siblings={1}
              boundaries={1}
            />
          </div>
        )}
      </div>
    </>
  )
}
