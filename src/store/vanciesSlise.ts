import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Vacancy } from '@/modules'
import { VACANCIES } from '@/modules/data/vacancies'

interface VacanciesResponse {
  items: Vacancy[]
  found: number
  pages: number
  page: number
  per_page: number
}

interface VacanciesState {
  items: Vacancy[]
  loading: boolean
  error: string | null
  page: number
  perPage: number
  totalFound: number
  totalPages: number
  searchFiled: string
  area: number | null
  skills: string[]
  useMockData: boolean
}

const initialState: VacanciesState = {
  items: [],
  loading: false,
  error: null,
  page: 0,
  perPage: 10,
  totalFound: 0,
  totalPages: 0,
  searchFiled: '',
  area: 0,
  skills: ['TypeScript', 'React', 'Redux'],
  useMockData: false,
}

export const fetchVacancies = createAsyncThunk(
  'vacancies/fetchVacancies',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { vacancies: VacanciesState }
      const { page, perPage, searchFiled, area, skills, useMockData } =
        state.vacancies

      if (useMockData) {
        console.log('Использую моковые данные')
        const start = page * perPage
        const end = start + perPage
        const paginatedItems = VACANCIES.items.slice(start, end)

        return {
          items: paginatedItems,
          found: VACANCIES.found,
          pages: Math.ceil(VACANCIES.items.length / perPage),
          page: page,
          per_page: perPage,
        }
      }

      const params = new URLSearchParams()
      params.append('per_page', perPage.toString())
      params.append('page', page.toString())
      params.append('professional_role', '96')

      if (searchFiled.trim()) params.append('text', searchFiled)
      if (area && area !== 0) params.append('area', area.toString())
      if (skills.length > 0) params.append('skill_set', skills.join(','))

      const response = await fetch(
        `https://api.hh.ru/vacancies?${params.toString()}`,
        {
          headers: { 'User-Agent': 'VacancyApp' },
        },
      )

      if (response.status === 403) {
        return rejectWithValue('Сервис временно недоступен (ошибка 403)')
      }

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`)
      }

      return await response.json()
    } catch (e) {
      return rejectWithValue(e instanceof Error ? e.message : 'Ошибка загрузки')
    }
  },
)

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setSearchFiled: (state, action: PayloadAction<string>) => {
      state.searchFiled = action.payload
    },
    setArea: (state, action: PayloadAction<number | null>) => {
      state.area = action.payload ?? 0
    },
    addSkill: (state, action: PayloadAction<string>) => {
      if (!state.skills.includes(action.payload)) {
        state.skills.push(action.payload)
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter((skill) => skill !== action.payload)
    },
    enableMockData: (state) => {
      state.useMockData = true
      state.error = null
      state.page = 0
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchVacancies.fulfilled,
        (state, action: PayloadAction<VacanciesResponse>) => {
          state.loading = false
          state.items = action.payload.items
          state.totalFound = action.payload.found
          state.totalPages = action.payload.pages
        },
      )
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Ошибка загрузки'
      })
  },
})

export const {
  setPage,
  setSearchFiled,
  setArea,
  addSkill,
  removeSkill,
  enableMockData,
} = vacanciesSlice.actions

export const selectVacancies = (state: { vacancies: VacanciesState }) =>
  state.vacancies.items
export const selectVacanciesLoading = (state: { vacancies: VacanciesState }) =>
  state.vacancies.loading
export const selectVacanciesError = (state: { vacancies: VacanciesState }) =>
  state.vacancies.error
export const selectCurrentPage = (state: { vacancies: VacanciesState }) =>
  state.vacancies.page
export const selectTotalPages = (state: { vacancies: VacanciesState }) =>
  state.vacancies.totalPages
export const selectSearchFiled = (state: { vacancies: VacanciesState }) =>
  state.vacancies.searchFiled
export const selectArea = (state: { vacancies: VacanciesState }) =>
  state.vacancies.area
export const selectSkills = (state: { vacancies: VacanciesState }) =>
  state.vacancies.skills
export const selectUseMockData = (state: { vacancies: VacanciesState }) =>
  state.vacancies.useMockData

export default vacanciesSlice.reducer
