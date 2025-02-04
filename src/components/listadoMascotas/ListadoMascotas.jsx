import { useEffect, useState } from "react";
import useMascota from "../../hooks/useMascota";
import Mascotas from "../mascota/Mascota";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientes } from "../../store/slices/clienteSlice";
import { fetchMascotasByCliente } from "../../store/slices/busqueda"
import { clearBusqueda } from "../../store/slices/busqueda";

function ListadoMascotas() {
  const { mascotas, fetchMascotas } = useMascota();
  const dispatch = useDispatch()
  const mascotasFiltradas = useSelector((state) => state.busqueda.mascotas) || [];
  console.log("Mascotas filtradas:", mascotasFiltradas);

  const clientes = useSelector((state) => state.clientes.clientes) || [];

  const [clienteBusqueda, setClienteBusqueda] = useState("")


  useEffect(() => {
    dispatch(fetchClientes());
    fetchMascotas();
  }, [dispatch]);

  useEffect(() => {
    console.log(mascotas)
  }, [mascotas]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (clienteBusqueda.trim() === "") {
      fetchMascotas();
    } else {
      dispatch(fetchMascotasByCliente(clienteBusqueda));
    }
  };

  return (
    <div>
      {mascotas.length > 0 ? (
        <>
          <h2 className="font-bold text-3xl text-center">Listado de mascotas</h2>
          <p className="text-xl mt-5 mb-10 text-center">Administra tus {''} <span className="text-green-600 font-bold">Mascotas</span></p>
          <div className="flex justify-start w-full px-4">
              <form
                className="flex flex-col md:flex-row items-center md:space-x-4 w-full max-w-4xl mx-auto space-y-4 md:space-y-0"
                onSubmit={handleSearch}
              >
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-green-500 focus:border-green-500 block w-full md:w-80 pl-10 p-2.5 rounded-lg"
                  placeholder="Nombre del cliente..."
                  value={clienteBusqueda}
                  onChange={(e) => setClienteBusqueda(e.target.value)}
                />
                <div className="flex md:space-x-4 w-full md:w-auto">
                  <button
                    type="submit"
                    className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg w-full md:w-auto"
                  >
                    Buscar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setClienteBusqueda("");
                      dispatch(clearBusqueda());
                      fetchMascotas();
                    }}
                    className="py-2 px-4 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg w-full md:w-auto"
                  >
                    Limpiar búsqueda
                  </button>
                </div>
              </form>
            </div>

          {(mascotasFiltradas && mascotasFiltradas.length > 0 ? mascotasFiltradas : mascotas).map((mascota) => (
            <Mascotas key={mascota._id} mascota={mascota} clientes={clientes} />
          ))}
        </>
      ) : (<>
      <h2 className="font-bold text-3xl text-center">No hay mascotas</h2>
      <p className="text-xl mt-5 mb-10 text-center">Comieza agregando mascotas { ''} <span className="text-green-600 font-bold">y apareceran en este lugar</span></p>
    </>
      )}
    </div>
  );
}

export default ListadoMascotas;
