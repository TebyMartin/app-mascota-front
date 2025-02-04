import { useDispatch, useSelector } from "react-redux";
import { fetchClientes, guardarCliente, eliminarCliente, setEdicion, limpiarMensaje } from "../store/slices/clienteSlice";

const useCliente = () => {
  const dispatch = useDispatch();
  const { clientes, cliente, status, error, mensaje } = useSelector((state) => state.clientes);

  const limpiarMensajeHandler = () => {
    dispatch(limpiarMensaje());
  };

  return {
    clientes,
    cliente,
    status,
    error,
    mensaje, 
    fetchClientes: () => dispatch(fetchClientes()),
    guardarCliente: (data) => dispatch(guardarCliente(data)),
    eliminarCliente: (id) => dispatch(eliminarCliente(id)),
    setEdicion: (cliente) => dispatch(setEdicion(cliente)),
    limpiarMensajeHandler, 
  };
};

export default useCliente;
