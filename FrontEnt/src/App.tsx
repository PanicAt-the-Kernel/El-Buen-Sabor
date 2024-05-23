import { BrowserRouter,Routes,Route } from 'react-router-dom'
import DashboardVistaInicio from './paginas/DashboardVistaInicio'
import DashboardVistaProducto from './paginas/DashboardVistaProducto'
import DashboardVistaEmpleado from './paginas/DashboardVistaEmpleado'
import DashboardVistaInsumo from './paginas/DashboardVistaInsumo'
import DashboardVistaCategoria from './paginas/DashboardVistaCategoria'
import DashboardVistaEmpresa from './paginas/DashboardVistaEmpresa'
import DashboardVistaPromocion from './paginas/DashboardVistaPromocion'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<DashboardVistaInicio />}/>
        <Route path='/empresas' element={<DashboardVistaEmpresa />}/>
        <Route path='/categorias' element={<DashboardVistaCategoria />}/>
        <Route path='/productos' element={<DashboardVistaProducto />}/>
        <Route path='/empleados' element={<DashboardVistaEmpleado />}/>
        <Route path='/promociones' element={<DashboardVistaPromocion />}/>
        <Route path='/insumos' element={<DashboardVistaInsumo />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
