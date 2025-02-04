import { useEffect } from "react";
import { useState } from "react";

function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

useEffect(() => {
      const year = new Date().getFullYear();
      setCurrentYear(year);
    }, []);
    return (
      <footer className="py-10">
           <p className="text-center font-bold">©{currentYear} <span className="text-green-600">AMV</span>  - Administrador de Mascotas de {""} <span className="text-green-600">Veterinaria</span> </p> 
      </footer>
    )
  }
  
  export default Footer