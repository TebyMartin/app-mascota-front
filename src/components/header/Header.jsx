import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();
  
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <header className="py-10 bg-green-600">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <Link to="/admin"><h1 className="font-bold text-2xl text-green-200 text-center"> <span className="text-white font-black">AMV -</span>   Administrador de Mascotas de {''} <span className="text-white font-black">Veterinaria</span></h1></Link> 
        <nav className='flex flex-col items-center lg:flex-row gap-4 mt-5 lg:mt-0'>
            <Link to='/admin' className='text-white text-sm uppercase font-bold'>Clientes</Link>
            <Link to='mascota' className='text-white text-sm uppercase font-bold'>Mascotas</Link>
            <button type='button ' className='text-white text-sm uppercase font-bold' onClick={cerrarSesion}>Cerrar Sesion</button>
        </nav>
      </div>
      
    </header>
  )
}

export default Header