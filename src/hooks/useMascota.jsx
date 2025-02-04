import { useDispatch, useSelector } from "react-redux";
import { eliminarMascota, fetchMascotas, guardarMascotas, setEdicion, limpiarMensaje } from "../store/slices/mascotaSlice";


const useMascota = () => {
  const dispatch = useDispatch();
  const { mascotas, mascota, status, error, mensaje } = useSelector((state) => state.mascotas);

  const limpiarMensajeHandler = () => {
    dispatch(limpiarMensaje());
  };

  return {
    mascotas,
    mascota,
    status,
    error,
    mensaje, 
    fetchMascotas: () => dispatch(fetchMascotas()),
    guardarMascotas: (data) => dispatch(guardarMascotas(data)),
    eliminarMascota: (id) => dispatch(eliminarMascota(id)),
    setEdicion: (mascota) => dispatch(setEdicion(mascota)),
    limpiarMensajeHandler, 
  };
};

export default useMascota;
