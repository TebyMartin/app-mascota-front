const Alerta = ({ alerta }) => {
  const { msg, error } = alerta || {}
  
    return (
      <div 
        className={`${error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`}
      >
        {msg || "Ha ocurrido un error inesperado."}
      </div>
    );
  };
  
  export default Alerta
  