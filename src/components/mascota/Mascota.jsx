import { useEffect } from 'react';
import useMascota from '../../hooks/useMascota';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientes } from '../../store/slices/clienteSlice';

function Mascotas({ mascota, clientes }) {
  const { setEdicion, eliminarMascota, limpiarMensajeHandler, mensaje } = useMascota();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.clientes); 
  const cliente = clientes ? clientes.find(c => c._id === mascota?.cliente._id) : null;

  useEffect(() => {
    dispatch(fetchClientes())
  }, [dispatch]);

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        limpiarMensajeHandler();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [mensaje, limpiarMensajeHandler]);

  const handleEdit = () => {
    setEdicion(mascota);
  };

  const handleDelete = () => {
    eliminarMascota(mascota._id);
  };


  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (cliente) return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
      <div className="flex justify-center mb-5">
        <img src="/pets.png" alt="Mascota" />
      </div>
  
      <p className="font-bold uppercase text-green-800 my-2">
        Nombre: <span className="font-normal normal-case text-black">{mascota.nombre}</span>
      </p>
      <p className="font-bold uppercase text-green-800 my-2">
        Propietario: <span className="font-normal normal-case text-black">{cliente?.nombre || 'No disponible'}</span>
      </p>
      <p className="font-bold uppercase text-green-800 my-2">
        Nombre de la Especie: <span className="font-normal normal-case text-black">{mascota.especie}</span>
      </p>
      <p className="font-bold uppercase text-green-800 my-2">
        Raza de la mascota: <span className="font-normal normal-case text-black">{mascota.raza}</span>
      </p>
      <p className="font-bold uppercase text-green-800 my-2">
        Edad de la mascota: <span className="font-normal normal-case text-black">{mascota.edad}</span>
      </p>
      <p className="font-bold uppercase text-green-800 my-2">
        Describe los síntomas: <span className="font-normal normal-case text-black">{mascota.sintomas}</span>
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
  );
}

export default Mascotas;
