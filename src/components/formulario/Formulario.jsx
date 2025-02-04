import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCliente from '../../hooks/useCliente';
import Alerta from '../alerta/Alerta'
import { setMensaje } from '../../store/slices/clienteSlice';

const Formulario = () => {
    const { guardarCliente, cliente, limpiarMensajeHandler } = useCliente();
    const { mensaje } = useSelector((state) => state.clientes)
    const [form, setForm] = useState({ nombre: "", telefono: "", email: "", id: null });
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (cliente?.nombre) {
            setForm({ ...cliente, id: cliente._id });
        }
    }, [cliente]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
   
        if (!form.nombre || !form.telefono || !form.email) {
            
            dispatch(setMensaje({ msg: "Todos los campos son obligatorios", error: true }))
            return;
        }
        guardarCliente(form);
        setForm({ nombre: "", telefono: "", email: "", id: null });
    }

    
    useEffect(() => {
        if (mensaje) {
          const timer = setTimeout(() => {
            limpiarMensajeHandler()
          }, 2000);
          return () => clearTimeout(timer)
        }
      }, [mensaje, limpiarMensajeHandler])
    return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Clientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Añade tus clientes y {''}
                <span className="text-green-600 font-bold">Administralos</span>
            </p>

           
            {mensaje && (
            <Alerta 
                alerta={{
                msg: typeof mensaje === 'string' ? mensaje : mensaje.msg || 'Error desconocido', 
                error: mensaje?.error || false
                }} 
            />
            )}
           


            <form
                className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">Nombre Cliente</label>
                    <input
                        name="nombre"
                        type="text"
                        placeholder="Nombre del cliente"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={form.nombre}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="telefono" className="text-gray-700 uppercase font-bold">Teléfono</label>
                    <input
                        name="telefono"
                        type="text"
                        placeholder="Número de teléfono del cliente"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={form.telefono}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-gray-700 uppercase font-bold">Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email del cliente"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-green-600 w-full p-3 text-white uppercase font-bold hover:bg-green-700 cursor-pointer transition-colors"
                    value={form.id ? "Actualizar Cliente" : "Agregar Cliente"}
                />
            </form>
        </>
    );
};

export default Formulario;
