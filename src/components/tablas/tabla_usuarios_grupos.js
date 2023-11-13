import Image from 'next/image'
import logo from '../../utilities/logo1.png'
import 'flowbite'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
export default function Tabla_usuarios_grupos({grupoId}) {    
    const [alumnos, setAlumnos] = useState([]);
    const supabase = createClientComponentClient();

    useEffect(() => {
        const fetchAlumnos = async () => {
            const { data, error } = await supabase
                .from('profiles') // Asume que 'profiles' es la tabla donde se almacenan los alumnos
                .select('*')
                .eq('Grupo', grupoId); // Asume que 'grupo_id' es la columna que relaciona al alumno con el grupo

            if (error) {
                console.error('Error al obtener alumnos:', error);
            } else {
                setAlumnos(data);
            }
        };

        if (grupoId) {
            fetchAlumnos();
        }
    }, [grupoId]);

    return (
        
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="p-4">
                           
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Contacto
                        </th>
                        <th scope="col" class="px-6 py-3">
                            
                        </th> 
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                
                {alumnos.map((alumno) => (
                    <tr key={alumno.id} class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                            <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>
                            
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <Image width="10"  height="10" class="w-10 h-10 rounded-full" src={logo} alt="Jese image"></Image>
                            <div class="pl-3">
                                <div class="text-base font-semibold">{alumno.name}{' '}{alumno.lastname}</div>
                                <div class="font-normal text-gray-500">{alumno.email}</div>
                            </div>  
                        </th>
                        <td class="px-6 py-4">
                            {alumno.number}
                        </td>
                        <td class="px-6 py-4">
                            {/**<div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                            </div>*/}
                        </td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                        </td>
                    </tr>
                    
                ))}
                
                </tbody>
                
            </table>
            {alumnos.length > 0 ? '': 
                    <center>
                    <div className='p-4'>
                        <span className='m-4'>No hay alumnos asignados al grupo</span>
                    </div>
                    </center>
                }
        </div>

    )


}