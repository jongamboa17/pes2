'use client'
import Image from 'next/image'
import logo2 from '../utilities/photo1.avif'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
export default function Alumnos_pendientes() {
  const [alumnos, setAlumnos] = useState([]);
  useEffect(() => {
   //traer datos de la base de datos cantidad de docentes
   const supabase = createClientComponentClient();
   let profileData = [];
   const fetchAlumnos = async () => {
   const { data, error } = await supabase
       .from('profiles') // Reemplazar 'docentes' con el nombre real de tu tabla
       .select('*'); // Ajustar para seleccionar solo los campos necesarios

   if (error) {
       console.error('Error al obtener datos de docentes:', error);
   } else {
       console.log('Alumnos:', data);
       //profileData = data;
       //filtrar los docentes por rol y campo activo sea igual a false

       profileData = data.filter((alumno) => alumno.role === 'Alumno' && alumno.activo === false);
       setAlumnos(profileData);
       
   }
   };
   
    fetchAlumnos();
   

  }, []);
    return (
        
    <ul class="h-60 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
    {alumnos.map((docente, index) => (
    <li key={index}>
      <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>
        <Image class="w-6 h-6 mr-2 rounded-full"  src={logo2} alt="Jese image"/>
        {docente.name}{' '}{docente.lastname}
      </a>
      
    </li>
      ))}
  </ul>


)
}


