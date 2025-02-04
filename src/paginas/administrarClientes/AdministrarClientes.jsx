import { useState } from "react"
import Formulario from "../../components/formulario/Formulario"
import ListadoClientes from "../../components/listadoClientes/ListadoClientes"

const AdministrarClientes = () => {
  const [mostrarFormulario, setMostarFormulario] = useState(false)
  return (
    <>
    <div className="flex flex-col md:flex-row">
      <button type="button" className="bg-green-600 p-3 mx-10 text-white uppercase font-bold  cursor-pointer rounded-md mb-10 md:hidden"
        onClick={()=>{setMostarFormulario(!mostrarFormulario)}}
      >{ mostrarFormulario? 'Ocultar Formulario': 'Mostrar Formulario'}</button>
      <div className={`${mostrarFormulario ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
        <Formulario/>
      </div>
         <div className="md:w-1/2 lg:w-3/5">
        <ListadoClientes/>
      </div>
      </div>
      </>
  )
}

export default AdministrarClientes