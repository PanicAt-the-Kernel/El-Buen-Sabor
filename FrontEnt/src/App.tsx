import { BrowserRouter,Routes,Route } from 'react-router-dom'
import DashboardVistaInicio from './paginas/DashboardVistaInicio'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<DashboardVistaInicio />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
