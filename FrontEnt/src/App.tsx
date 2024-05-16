import { BrowserRouter,Routes,Route } from 'react-router-dom'
import DashboardVistaInicio from './paginas/DashboardVistaInicio'
import DashboardVistaProducto from './paginas/DashboardVistaProducto'
import DashboardVistaEmpleado from './paginas/DashboardVistaEmpleado'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<DashboardVistaInicio />}/>
        <Route path='/productos' element={<DashboardVistaProducto />}/>
        <Route path='/empleados' element={<DashboardVistaEmpleado />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
