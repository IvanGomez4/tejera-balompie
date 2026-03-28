import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Inicio from './pages/Inicio'
import Clasificacion from './pages/Clasificacion'
import Jugadores from './pages/Jugadores'
import Partidos from './pages/Partidos'
import DetallePartido from './pages/DetallePartido'
import Estadisticas from './pages/Estadisticas'
import Admin from './pages/Admin'
import Noticias from './pages/Noticias'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"              element={<Inicio />} />
        <Route path="/clasificacion" element={<Clasificacion />} />
        <Route path="/jugadores"     element={<Jugadores />} />
        <Route path="/partidos"      element={<Partidos />} />
        <Route path="/partido/:id"   element={<DetallePartido />} />
        <Route path="/estadisticas"  element={<Estadisticas />} />
        <Route path="/noticias"      element={<Noticias />} />
        <Route path="/admin"         element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
