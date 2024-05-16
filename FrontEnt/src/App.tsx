import { BrowserRouter,Routes,Route } from 'react-router-dom'
import DashboardVistaInicio from './paginas/DashboardVistaInicio'
import DashboardVistaProducto from './paginas/DashboardVistaProducto'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<DashboardVistaInicio />}/>
        <Route path='/productos' element={<DashboardVistaProducto />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
