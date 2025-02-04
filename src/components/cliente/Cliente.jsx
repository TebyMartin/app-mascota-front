import { useEffect } from 'react';
import useCliente from '../../hooks/useCliente';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientes } from '../../store/slices/clienteSlice'; 

function Clientes({ cliente }) {
    const { setEdicion, eliminarCliente, limpiarMensajeHandler, mensaje } = useCliente();
    const dispatch = useDispatch();
    const { status } = useSelector((state) => state.clientes); 

    useEffect(() => {
        dispatch(fetchClientes());
    }, [dispatch]);

    useEffect(() => {
        if (mensaje) {
            const timer = setTimeout(() => {
                limpiarMensajeHandler();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [mensaje, limpiarMensajeHandler]);

    const handleEdit = () => {
        
        setEdicion(cliente);
    };

    const handleDelete = () => {
        eliminarCliente(cliente._id);
    };

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <div className="flex justify-center mb-5">
                <img src="/client.png" alt="Cliente" />
            </div>
            <p className="font-bold uppercase text-green-800 my-2">
                Nombre: <span className="font-normal normal-case text-black">{cliente.nombre}</span>
            </p>
            <p className="font-bold uppercase text-green-800 my-2">
                Email: <span className="font-normal normal-case text-black">{cliente.email}</span>
            </p>
            <p className="font-bold uppercase text-green-800 my-2">
                Teléfono de contacto: <span className="font-normal normal-case text-black">{cliente.telefono}</span>
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

export default Clientes;
