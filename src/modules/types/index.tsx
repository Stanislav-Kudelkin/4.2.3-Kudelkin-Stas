export interface Vacancy {
  id: string
  name: string
  salary?: {
    from?: number
    to?: number
    currency?: string
  }
  experience?: {
    id: string
    name: string
  }
  work_format?: {
    id: string
    name: string
  }
  employer: {
    name: string
  }
  area?: {
    name: string
  }
  alternate_url: string
}
