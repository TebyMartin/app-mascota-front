import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { Login } from './paginas/login/Login'
import AuthLayout from "./layout/AuthLayout";
import { Registrar } from "./paginas/registrar/Registrar";
import RutaProtegida from "./layout/Rutaprotegida";
import AdministrarClientes from "./paginas/administrarClientes/AdministrarClientes";
import AdministrarMascotas from "./paginas/administrarMascotas/AdministrarMascotas";


export const baseURL = import.meta.env.VITE_BASE_URL
export const loginUrl = import.meta.env.VITE_LOGIN_URL
export const registrarUrl = import.meta.env.VITE_REGISTER_URL
export const perfilUrl = import.meta.env.VITE_PERFIL_URL
export const clienteUrl = import.meta.env.VITE_CLIENTE_URL
export const mascotaUrl = import.meta.env.VITE_MASCOTA_URL
export const mascotaBusqueda = import.meta.env.VITE_MASCOTA_BUSQUEDA

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      
        <Route path='/' element={<AuthLayout/>}>
          <Route index element={<Login />} />
          <Route path='registrar' element={<Registrar />} />
        </Route>

        <Route path="/admin" element={<RutaProtegida />} >
          <Route index element={<AdministrarClientes />} />
          <Route path="mascota"  element={<AdministrarMascotas/>} />
        </Route>
        
       
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
