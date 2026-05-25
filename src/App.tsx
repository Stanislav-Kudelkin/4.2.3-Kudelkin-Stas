import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './App.scss'
import { VacanciesList } from '@/pages'

function App() {
  return (
    <div>
      <MantineProvider>
        <VacanciesList />
      </MantineProvider>
    </div>
  )
}

export default App
