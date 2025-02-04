import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




export const fetchMascotas = createAsyncThunk(
  "mascotas/fetchMascotas",
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
      const { data } = await axios.get('https://app-mascota.vercel.app/api/mascota', config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error al obtener mascota");
    }
  }
);


export const guardarMascotas = createAsyncThunk(
  "mascotas/guardarMascotas",
  async (mascotaData, { dispatch, rejectWithValue }) => {
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
      if (mascotaData.id) {
        const response = await axios.put(`https://app-mascota.vercel.app/api/mascota/${mascotaData.id}`, mascotaData, config);
        data = response.data;
      } else {
        const response = await axios.post('https://app-mascota.vercel.app/api/mascota', mascotaData, config);
        data = response.data;
      }

      dispatch(fetchMascotas()); 
      dispatch(setMensaje({ msg: mascotaData.id ? "Mascota actualizado correctamente." : "Mascota agregado correctamente.", error: false }));
      return data;
    } catch (error) {
      dispatch(setMensaje({ msg: error.response?.data || "Error al guardar mascota", error: true }));
      return rejectWithValue(error.response?.data || "Error al guardar mascota");
    }
  }
);


export const eliminarMascota = createAsyncThunk(
  "mascotas/eliminarMascota",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const confirmar = confirm("¿Estás seguro de eliminar este mascota?");
      if (!confirmar) return rejectWithValue("Eliminación cancelada");

      const token = localStorage.getItem("token");
      if (!token) return rejectWithValue("No hay token de autenticación");

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`https://app-mascota.vercel.app/api/mascota/${id}`, config);
      dispatch(fetchMascotas())
      dispatch(setMensaje({ msg: "Mascota eliminado correctamente.", error: false }));
    } catch (error) {
      dispatch(setMensaje({ msg: error.response?.data || "Error al eliminar mascota", error: true }));
      return rejectWithValue(error.response?.data || "Error al eliminar mascota");
    }
  }
);



const mascotaSlice = createSlice({
  name: "mascotas",
  initialState: {
    mascotas: [],
    mascota: {},
    status: "idle", 
    error: null,
    mensaje: null, 
  },
  reducers: {
    setEdicion: (state, action) => {
      state.mascota = action.payload;
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
      .addCase(fetchMascotas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMascotas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.mascotas = action.payload;
      })
      .addCase(fetchMascotas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setEdicion, setMensaje, limpiarMensaje } = mascotaSlice.actions;
export default mascotaSlice.reducer
