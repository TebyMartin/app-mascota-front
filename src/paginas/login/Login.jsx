import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Alerta from '../../components/alerta/Alerta';
import { baseURL, loginUrl } from '../../App';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setAuth } from '../../store/slices/authSlice'

export const Login = () => {
  const [login, setLogin] = useState({
    username: '',
    password: ''
  })
  const [alerta, setAlerta] = useState({})

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = login;

    if ([username, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    try {
      const { data } = await axios.post(`${baseURL}${loginUrl}`, login);
      localStorage.setItem('token', data.token);
      console.log("inicio correcto ",data)
   
      dispatch(setAuth(data));

      navigate('/admin')
      
      
      
    } catch (error) {
      setAlerta({
        msg: error.response?.data?.msg || 'Ocurrió un error al intentar iniciar sesión.',
        error: true
      })
      
    }
    setLogin({username: '', password: ''})
  }

  const { msg } = alerta

  useEffect(() => {
    if (alerta.msg) {
      const timer = setTimeout(() => {
        setAlerta({});
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [alerta])

  return (
    <>
    <div>
      <h1 className="text-green-600 font-black text-6xl ">Inicia Sesion y Administra tus <span className="text-black">Pacientes</span></h1>

    </div>
    <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
    {msg && <Alerta alerta={alerta} />}
   
      <form onSubmit={handleSubmit}>
        <div>
          <label className="uppercase text-gray-600 block text-xl font-bold ">
            Usuario
          </label>
          <input type="username"
                placeholder="Usuario de registro"
                name="username"
                className="border w-full p-3  mt-3 bg-gray-50 rounded"
                value={login.username}
                onChange={handleChange}
          />
        </div>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold ">
            Password
          </label>
          <input type="password"
                placeholder="Tu password"
                name="password"
                className="border w-full p-3  mt-3 bg-gray-50 rounded"
                value={login.password}
                onChange={handleChange}

                
          />
        </div>
        <input
          type="submit"
          value="Iniciar sesion"
          className="bg-green-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer  hover:bg-green-800 md:w-auto"
          
          />
      </form>

      <div>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link
            className='block text-center my-5 text-gray-600 font-bold'
            to="/registrar">¿No tienes una cuenta? Registrate</Link>
        </nav>
      </div>

    </div>
    </>
  )
}
