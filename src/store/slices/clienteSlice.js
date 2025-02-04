import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL, clienteUrl } from "../../App";
import Swal from "sweetalert2";


// Acción para obtener clientes
export const fetchClientes = createAsyncThunk(
  "clientes/fetchClientes",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No hay token de autenticación");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      };
      const { data } = await axios.get(`${baseURL}${clienteUrl}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error al obtener clientes");
    }
  }
);

// Acción para guardar cliente
export const guardarCliente = createAsyncThunk(
  "clientes/guardarCliente",
  async (clienteData, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No hay token de autenticación");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      };

      let data;
      if (clienteData.id) {
        // Editar cliente
        const response = await axios.put(`${baseURL}${clienteUrl}/${clienteData.id}`, clienteData, config);
        data = response.data;
      } else {
        // Agregar cliente
        const response = await axios.post(`${baseURL}${clienteUrl}`, clienteData, config);
        data = response.data;
      }

      dispatch(fetchClientes())
      dispatch(setMensaje({ msg: clienteData.id ? "Cliente actualizado correctamente." : "Cliente agregado correctamente.", error: false }));
      return data;
    } catch (error) {
      dispatch(setMensaje({ msg: error.response?.data || "Error al guardar cliente", error: true }));
      return rejectWithValue(error.response?.data || "Error al guardar cliente");
    }
  }
);


export const eliminarCliente = createAsyncThunk(
  "clientes/eliminarCliente",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const { isConfirmed } = await Swal.fire({
              title: "¿Estás seguro?",
              text: "Si eliminas este cliente se borrarán todas las mascotas asociadas a él",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Sí, eliminar",
              cancelButtonText: "Cancelar",
            });
      
            if (!isConfirmed) return rejectWithValue("Eliminación cancelada");
      

      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No hay token de autenticación");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      };
      
   
      await axios.delete(`${baseURL}${clienteUrl}/${id}`, config);
      dispatch(fetchClientes()); 
      dispatch(setMensaje({ msg: "Cliente eliminado correctamente.", error: false }));
    } catch (error) {
      dispatch(setMensaje({ msg: error.response?.data || "Error al eliminar cliente", error: true }));
      return rejectWithValue(error.response?.data || "Error al eliminar cliente");
    }
  }
);


const clienteSlice = createSlice({
  name: "clientes",
  initialState: {
    clientes: [],
    cliente: {},
    status: "idle", 
    error: null,
    mensaje: null, 
  },
  reducers: {
    setEdicion: (state, action) => {
      state.cliente = action.payload;
    },
    setMensaje: (state, action) => {
      state.mensaje = action.payload;
    },
    limpiarMensaje: (state) => {
      state.mensaje = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clientes = action.payload;
      })
      .addCase(fetchClientes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setEdicion, setMensaje, limpiarMensaje } = clienteSlice.actions;
export default clienteSlice.reducer;
