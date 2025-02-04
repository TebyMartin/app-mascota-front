import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useMascota from '../../hooks/useMascota';
import Alerta from '../alerta/Alerta';
import { fetchClientes } from '../../store/slices/clienteSlice'
import { setMensaje } from '../../store/slices/mascotaSlice';


const FormularioMascota = () => {
  const { guardarMascotas, mascota, limpiarMensajeHandler } = useMascota();
  const { mensaje } = useSelector((state) => state.mascotas)
  const { clientes, status, error } = useSelector((state) => state.clientes);
  const [form, setForm] = useState({ nombre: "", cliente: "", especie: "", raza: "", edad: "", sintomas: "", id: null });
  const dispatch = useDispatch();



  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchClientes());
    }
  }, [dispatch, status])


  useEffect(() => {
    if (mascota?.nombre) {
      setForm({ ...mascota, id: mascota._id });
    }
  }, [mascota]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cliente') {
    
      const clienteSeleccionado = clientes.find((cliente) => cliente._id === value);
      setForm({ ...form, [name]: clienteSeleccionado });
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!form.nombre || !form.cliente?._id || !form.especie || !form.raza || !form.edad || !form.sintomas) {
      dispatch(setMensaje({ msg: "Todos los campos son obligatorios", error: true }));
      return;
    } 
    
    guardarMascotas(form);
    setForm({ nombre: "", cliente: "", especie: "", raza: "", edad: "", sintomas: "", id: null });
  };

  

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
      <h2 className="font-black text-3xl text-center">Administrador de Mascotas</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Añade tus mascotas y {''}
        <span className="text-green-600 font-bold">Administralas</span>
      </p>
      {mensaje && (
  <Alerta 
    alerta={{
      msg: mensaje?.msg || 'Error desconocido',
      error: mensaje?.error || false,
    }} 
  />
)}


      <form
        className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label htmlFor="nombre" className="text-gray-700 uppercase font-bold">
            Nombre Mascota
          </label>
          <input 
            name="nombre"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={form.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
  <label htmlFor="cliente" className="text-gray-700 uppercase font-bold">
    Selecciona un Cliente:
  </label>
  <select 
    name="cliente" 
    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md bg-white text-gray-700"
    value={form.cliente._id}
    onChange={handleChange}
  >
    <option value="">Seleciona un propietario</option>
    {status === "loading" && <option>Cargando clientes...</option>}
    {status === "failed" && <option>{error}</option>}
    {status === "succeeded" &&
      clientes.map((cliente, index) => (
        <option key={index} value={cliente._id}>
          {cliente.nombre}
        </option>
      ))}
  </select>
      </div>
        <div className="mb-5">
          <label htmlFor="especie" className="text-gray-700 uppercase font-bold">
            Especie
          </label>
          <input 
            name="especie"
            type="text"
            placeholder="Nombre de la Especie"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={form.especie}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="raza" className="text-gray-700 uppercase font-bold">
            Raza
          </label>
          <input 
            name="raza"
            type="text"
            placeholder="Raza de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={form.raza}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="edad" className="text-gray-700 uppercase font-bold">
            Edad de la Mascota
          </label>
          <input 
            name="edad"
            type="text"
            placeholder="Edad de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={form.edad}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="text-gray-700 uppercase font-bold">
            Síntomas
          </label>
          <textarea 
            name="sintomas"
            placeholder="Describe los Síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={form.sintomas}
            onChange={handleChange}
          />
        </div>
        <input
          type="submit"
          className="bg-green-600 w-full p-3 text-white uppercase font-bold hover:bg-green-700 cursor-pointer transition-colors"
          value={form.id ? 'Guardar Cambios' : "Agregar Mascota"}
        />
      </form>
    </>
  );
}

export default FormularioMascota;
