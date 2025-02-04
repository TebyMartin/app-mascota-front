
import { useEffect } from "react";
import useCliente from "../../hooks/useCliente"
import Clientes from "../cliente/Cliente"


function ListadoClientes() {
  const { clientes, fetchClientes } = useCliente();

  useEffect(() => {
      fetchClientes()
  }, []);


  return (
    <>
      
      {clientes.length  > 0 ? (
        <>
            <h2 className="font-bold text-3xl text-center">Listado de cliente</h2>
            <p className="text-xl mt-5 mb-10 text-center">Administra tus { ''} <span className="text-green-600 font-bold">clientes</span></p>
          {clientes.map(cliente => (
            <Clientes
              key={cliente._id}
              cliente={cliente}
            />
          ))
            
            }
        </>
      ) :
      (
        <>
          <h2 className="font-bold text-3xl text-center">No hay clientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">Comieza agregando Clientes { ''} <span className="text-green-600 font-bold">y apareceran en este lugar</span></p>
        </>
      )}
    
    </>
  )
}

export default ListadoClientes