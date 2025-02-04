import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL, perfilUrl } from '../../App';

const initialState = {
  auth: localStorage.getItem('token')
      ? { token: localStorage.getItem('token'), username: null, email: null }
      : null, 
  cargando: true,
};

// Acción para autenticar al usuario
export const autenticarUsuario = createAsyncThunk(
  'auth/autenticarUsuario',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return rejectWithValue('No hay token disponible');
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.get(`${baseURL}${perfilUrl}`, config);
      return data;
    } catch (error) {
      console.log('Error en el backend:', error.response?.data?.msg);
      return rejectWithValue(error.response?.data?.msg || 'Error en autenticación');
    }
  }
);

// Slice de auth
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(autenticarUsuario.pending, (state) => {
        state.cargando = true;
      })
      .addCase(autenticarUsuario.fulfilled, (state, action) => {
        state.auth = action.payload;
        state.cargando = false;
      })
      .addCase(autenticarUsuario.rejected, (state) => {
        state.auth = { token: null, username: null, email: null };
        state.cargando = false;
      });
  },
});

export const { cerrarSesion, setAuth } = authSlice.actions;

export default authSlice.reducer;
