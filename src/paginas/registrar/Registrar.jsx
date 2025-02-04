import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Alerta from '../../components/alerta/Alerta';
import axios from 'axios';
import { setAuth } from '../../store/slices/authSlice'
import { baseURL, registrarUrl } from '../../App';


export const Registrar = () => {
  const [register, setRegister] = useState({
    username: '',
    email: '',
    password: '',
    repetirPassword: ''
  })
  const [alerta, setAlerta] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
      [name]: value 
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { username, email, password, repetirPassword } = register
    if ([username, email, password, repetirPassword ].includes('')) {
      setAlerta({msg: "Hay campos vacios", error: true})
        return 
    }

    if (password !== repetirPassword) {
      setAlerta({msg: "Los Passwords no coinciden", error: true})
      return
    }
    if (password.length < 6) {
      setAlerta({msg: "El Password es muy corto, agrega minimo 6 caracteres", error: true})
      return
    }

    setAlerta({})

    try {
      await axios.post( `${baseURL}${registrarUrl}`, { username, email, password })
      setAlerta({
        msg: "Creado correctamente",
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data?.msg,
        error: true
      })
    }
    setRegister({username: '', email: '', password: '', repetirPassword: ''})
  }

  useEffect(() => {
    if (alerta.msg) {
      const timer = setTimeout(() => {
        setAlerta({});
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [alerta])

  const {msg} = alerta
  return (
    <>
    <div>
        <h1 className="text-green-600 font-black text-6xl ">Crea tu cuenta y Administra {""}<span className="text-black">tus Pacientes</span></h1>

      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      {msg &&  <Alerta
          alerta={alerta}
        />}
        <form
          onSubmit={handleSubmit}
        >
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold ">
              Usuario
            </label>
            <input type="text"
                  name='username'
                  placeholder="Tu nombre"
                  className="border w-full p-3  mt-3 bg-gray-50 rounded"
                  value={register.username}
                  onChange={handleChange}
            />
          </div>
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold ">
              Email
            </label>
            <input type="email"
                  name='email'
                  placeholder="Email de registro"
                  className="border w-full p-3  mt-3 bg-gray-50 rounded"
                  value={register.email}
                  onChange={handleChange}
            />
          </div>

          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold ">
              Password
            </label>
            
            <input type="password"
                  name='password'
                  placeholder="Ingresa tu password"
                  className="border w-full p-3  mt-3 bg-gray-50 rounded"
                  value={register.password}
                  onChange={handleChange}
            />
          </div>
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold ">
              Repetir Password
            </label>

            <input type="password"
                  name='repetirPassword'
                  placeholder="Ingresa nuevamente password"
                  className="border w-full p-3  mt-3 bg-gray-50 rounded"
                  value={register.repetirPassword}
                  onChange={handleChange}
            />
          </div>
         
          <input
            type="submit"
            value="Crear Cuenta"
            className="bg-green-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer  hover:bg-green-800 md:w-auto"
          />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
            <Link
              className='block text-center my-5 text-gray-600 font-bold'
              to="/">¿Ya tienes una cuenta? Inicia sesion</Link>
           
          </nav>
        </div>
      
      </>
  )
}
