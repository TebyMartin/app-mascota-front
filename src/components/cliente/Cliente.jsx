import { useEffect } from 'react';
import useCliente from '../../hooks/useCliente';


function Clientes({ cliente }) {
   
    
    const { setEdicion, eliminarCliente, limpiarMensajeHandler, mensaje} = useCliente(); 

    const handleEdit = () => {
        console.log("Se va a editar el cliente:", cliente);
        setEdicion(cliente); 
    };

    const handleDelete = () => {
        
        eliminarCliente(cliente._id); 
    }

    useEffect(() => {
        if (mensaje) {
          const timer = setTimeout(() => {
            limpiarMensajeHandler()
          }, 2000);
    
          return () => clearTimeout(timer); 
        }
    }, [mensaje, limpiarMensajeHandler]);
    
  return (
      <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
          <div className="flex justify-center mb-5">
        <img src="/client.png" alt="Mascota"  />
        </div>
          <p className="font-bold uppercase text-green-800 my-2">Nombre: {''}
              
              <span className="font-normal  normal-case text-black">{ cliente.nombre }</span>
              
          </p>
          <p className="font-bold uppercase text-green-800 my-2">Email: {''}
              
              <span className="font-normal  normal-case text-black">{ cliente.email }</span>
              
          </p>
          <p className="font-bold uppercase text-green-800 my-2">Telefono de contacto: {''}
              
              <span className="font-normal  normal-case text-black">{ cliente.telefono }</span>
              
          </p>
     

          <div className="flex justify-between my-5">
              <button
                  type="button"
                  className="py-2 px-10 bg-green-600 hover:bg-green-700 text-white uppercase font-bold rounded-lg"
                  onClick={handleEdit}
                  
              >
                  Editar
              </button>
              <button
                  type="button"
                  className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
                  onClick={handleDelete}
              >
                  Eliminar
              </button>
          </div>
    </div>
  )
}

export default Clientes