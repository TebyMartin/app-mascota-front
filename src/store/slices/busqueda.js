import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL, mascotaBusqueda } from "../../App";


export const fetchMascotasByCliente = createAsyncThunk(
  "mascotas/fetchMascotasByCliente",
  async (clienteNombre, thunkAPI) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No hay token disponible en localStorage');
      return thunkAPI.rejectWithValue('No hay token disponible');
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const state = thunkAPI.getState();
      const clientes = state.clientes.clientes; 
      const cliente = clientes.find((cliente) => cliente.nombre.toLowerCase() === clienteNombre.toLowerCase());
      if (!cliente) {
        throw new Error('Cliente no encontrado');
      }
      const clienteID = cliente._id;
      const response = await axios.get( `${baseURL}${mascotaBusqueda}?cliente=${clienteID}`, config);
      return response.data;

    } catch (error) {
     
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


const busquedaSlice = createSlice({
  name: "busqueda",
  initialState: {
    mascotas: [],
    status: null,
    error: null,
  },
  reducers: {
    clearBusqueda: (state) => {
      state.mascotas = []; 
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMascotasByCliente.pending, (state) => {
        state.status = "loading";  
        state.error = null;
      })
      .addCase(fetchMascotasByCliente.fulfilled, (state, action) => {
        state.mascotas = action.payload;  
        state.status = "success";  
      })
      .addCase(fetchMascotasByCliente.rejected, (state, action) => {
        state.error = action.payload;  
        state.status = "failed";  
      });
  },
})

export const { clearBusqueda } = busquedaSlice.actions;

export default busquedaSlice.reducer;
