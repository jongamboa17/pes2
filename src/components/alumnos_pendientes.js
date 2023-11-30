'use client'
import Image from 'next/image'
import logo2 from '../utilities/photo1.avif'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Alumnos_pendientes({ alumnosInactivos, onActivarAlumnos }) {
  const [alumnos, setAlumnos] = useState([]);
  
  //estado para manejar usuarios seleccionados
  const [seleccionados, setSeleccionados] = useState([]);
 
  const handleCheckboxChange = (alumnoId) => {
    setSeleccionados(prev => {
      return prev.includes(alumnoId) ? prev.filter(id => id !== alumnoId) : [...prev, alumnoId];
  });
    console.log('Seleccionados:', seleccionados);
};



  
  const activarSeleccionados = async () => {
    if (seleccionados.length > 0) {
        const resultado = await onActivarAlumnos(seleccionados);
        if (resultado) {
            toast.success('Alumnos activados correctamente');
            setSeleccionados([]); // Limpiar la selección después de activar
        } else {
            toast.error('Error al activar alumnos');
        }
    } else {
        toast.error('No hay alumnos seleccionados');
    }
};


  
  //useeffect para observar los seleccionados
  //useEffect(() => {
    //console.log('Seleccionados:', seleccionados);
  //}, [seleccionados]);
    
    
     
       

    
    
    return (
    <>
      <ToastContainer />
      <center>
        <button type="button"
                class=" text-white  bg-green-500 hover:bg-green-700 
                          focus:ring-4 focus:outline-none focus:ring-blue-300 
                          font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                          inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700
                           dark:focus:ring-blue-800"
                onClick={activarSeleccionados}
        >
            <svg class="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.008 8.714c1-.097 1.96-.45 2.792-1.028a25.112 25.112 0 0 0 4.454-5.72 1.8 1.8 0 0 1 .654-.706 1.742 1.742 0 0 1 1.65-.098 1.82 1.82 0 0 1 .97 1.128c.075.248.097.51.065.767l-1.562 4.629M4.008 8.714H1v9.257c0 .273.106.535.294.728a.99.99 0 0 0 .709.301h1.002a.99.99 0 0 0 .71-.301c.187-.193.293-.455.293-.728V8.714Zm8.02-1.028h4.968c.322 0 .64.08.925.232.286.153.531.374.716.645a2.108 2.108 0 0 1 .242 1.883l-2.36 7.2c-.288.813-.48 1.354-1.884 1.354-2.59 0-5.39-1.06-7.504-1.66"/>
            </svg>
        </button>
      </center>
      {/**mensaje cuando no hay alumnos inactivos */}
      {alumnosInactivos.length===0 ? 
            <center>
              <div className='p-4'>
                <span className='m-4'>No hay alumnos inactivos</span>
              </div>
            </center>
          : ''}
      {/**lista de alumnos inactivos */}
      <ul class="h-60 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
        {alumnosInactivos.map((alumno) => (
        <li key={alumno.id}>
          <a href="#" class="ml-6 flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
          <input
            type="checkbox"
            className="w-5 h-5 rounded-md mr-2"
            onChange={() => handleCheckboxChange(alumno.id)}
            checked={seleccionados.includes(alumno.id)}
          />
            
            <span className='font-bold ml-3'>{alumno.name}{' '}{alumno.lastname} </span>
          </a>
        </li>
          ))}
      </ul>
      
      
  </>

)
}


