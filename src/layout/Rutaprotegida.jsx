import { Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { autenticarUsuario } from "../store/slices/authSlice";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";


function RutaProtegida() {
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state.auth);



  

  useEffect(() => {
    if (!auth.token) {
      dispatch(autenticarUsuario());
    }
  }, [dispatch, auth?.token]);

  



  return (
    <>
      <Header />
      {auth?.token ? (
        <main className="container mx-auto mt-10">
          <Outlet />
        </main>
      ) : (
        <Navigate to="/" />  
      )}
      <Footer />
    </>
  );
}

export default RutaProtegida;
