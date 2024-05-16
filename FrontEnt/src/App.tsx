import { BrowserRouter,Routes,Route } from 'react-router-dom'
import DashboardVistaInicio from './paginas/DashboardVistaInicio'
import DashboardVistaProducto from './paginas/DashboardVistaProducto'
import DashboardVistaEmpleado from './paginas/DashboardVistaEmpleado'
import DashboardVistaInsumo from './paginas/DashboardVistaInsumo'
import DashboardVistaCategoria from './paginas/DashboardVistaCategoria'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<DashboardVistaInicio />}/>
        <Route path='/categorias' element={<DashboardVistaCategoria />}/>
        <Route path='/productos' element={<DashboardVistaProducto />}/>
        <Route path='/empleados' element={<DashboardVistaEmpleado />}/>
        <Route path='/insumos' element={<DashboardVistaInsumo />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
