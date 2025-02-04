import { useState } from "react"
import FormularioMascota from "../../components/formularioMascota/FormularioMascota"
import ListadoMascotas from "../../components/listadoMascotas/ListadoMascotas"


const AdministrarMascotas = () => {
     const [mostrarFormulario, setMostarFormulario] = useState(false)
  return (
    <>
    <div className="flex flex-col md:flex-row">
      <button type="button" className="bg-green-600 p-3 mx-10 text-white uppercase font-bold  cursor-pointer rounded-md mb-10 md:hidden"
        onClick={()=>{setMostarFormulario(!mostrarFormulario)}}
      >{ mostrarFormulario? 'Ocultar Formulario': 'Mostrar Formulario'}</button>
      <div className={`${mostrarFormulario ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
        <FormularioMascota/>
      </div>
         <div className="md:w-1/2 lg:w-3/5">
        <ListadoMascotas/>
      </div>
      </div>
      </>
  )
}

export default AdministrarMascotas