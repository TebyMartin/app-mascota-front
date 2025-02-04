import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import clienteReducer from './slices/clienteSlice'
import mascotaReducer from './slices/mascotaSlice'
import busquedaReducer from "./slices/busqueda"

const store = configureStore({
  reducer: {
    auth: authReducer,
    clientes: clienteReducer,
    mascotas: mascotaReducer,
    busqueda: busquedaReducer
  },
});

export default store
