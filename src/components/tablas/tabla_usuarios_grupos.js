import Image from 'next/image'
import logo from '../../utilities/logo1.png'
import 'flowbite'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
export default function Tabla_usuarios_grupos({grupoId,nuevoUsuario, fetchAlumnos2, manejarDatosDesdeAccordion}) {    
    const [alumnos, setAlumnos] = useState([]);
    const supabase = createClientComponentClient();
    const [loading, setLoading] = useState(false);
    // Función para obtener detalles de los usuarios por sus IDs
    const obtenerDetallesUsuarios = async (idsUsuarios) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .in('id', idsUsuarios).eq('Grupo', grupoId);

        if (error) {
            console.error('Error al obtener detalles de usuarios:', error);
            return [];
        }

        return data;
    }

    useEffect(() => {
        // Actualiza la lista de alumnos cuando hay nuevos usuarios
        if (nuevoUsuario && nuevoUsuario.length > 0) {
            obtenerDetallesUsuarios(nuevoUsuario).then(nuevosDetalles => {
                // Combina los nuevos detalles con los alumnos existentes
                setAlumnos(prevAlumnos => [...prevAlumnos, ...nuevosDetalles]);
            });
        }
    }, [nuevoUsuario,grupoId]);

    const fetchAlumnos = async () => {
        const { data, error } = await supabase
            .from('profiles') // Asume que 'profiles' es la tabla donde se almacenan los alumnos
            .select('*')
            .eq('Grupo', grupoId)
            .eq('activo', true); // Asume que 'grupo_id' es la columna que relaciona al alumno con el grupo y que activo sea igual a true

        if (error) {
            console.error('Error al obtener alumnos:', error);
        } else {
            setAlumnos(data);
        }
    };

    useEffect(() => {
        if (grupoId) {
            fetchAlumnos();
        }
    }, [grupoId]);

    // Función para cambiar el grupo de un usuario
    const cambiarGrupo = async (userId) => {
        if (window.confirm("¿Estás seguro de que quieres quitar este usuario del grupo?")) {
            setLoading(true);
            const actualizacion = { Grupo: null };
    
            const { error } = await supabase
                .from('profiles')
                .update(actualizacion)
                .eq('id', userId);
        
            if (error) {
                console.error('Error al actualizar el grupo del usuario:', error);
            } else {
                manejarDatosDesdeAccordion(userId);
                // Recarga los alumnos usando fetchAlumnos
                fetchAlumnos2();
                fetchAlumnos();

            }
            setLoading(false);
        }
    };
    
    // Función para inactivar un usuario
    const actualizarActivo = async (userId, nuevoEstadoActivo) => {
        if (window.confirm("¿Estás seguro de que quieres desactivar este usuario?")) {
        setLoading(true);
        // Actualiza el estado del usuario en la base de datos
        const actualizacion = nuevoEstadoActivo 
            ? { activo: true } 
            : { activo: false, Grupo: null };

        const { error } = await supabase
            .from('profiles')
            .update(actualizacion)
            .eq('id', userId);
    
        if (error) {
            console.error('Error al actualizar el estado del usuario:', error);
        } else {
            if (!nuevoEstadoActivo) {
                // Recarga los alumnos usando fetchAlumnos
                fetchAlumnos2();
                fetchAlumnos();
            } else {
                
                
                // Actualiza la lista de alumnos para reflejar el cambio
                setAlumnos(alumnos.map(alumno =>
                    alumno.id === userId ? { ...alumno, activo: nuevoEstadoActivo } : alumno
                ));
            }
        }
        setLoading(false);
        }
    };
    
    

    return (
        
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
            
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
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                
                {alumnos.map((alumno) => (
                    <tr key={alumno.id} class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                            {/**<input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/> */}
                            
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            {/**
                             * 
                             
                            <Image width="10"  height="10" class="w-10 h-10 rounded-full" src={logo} alt="Jese image"></Image>*/}
                            <div class="">
                                <div class="text-base font-semibold">{alumno.name}{' '}{alumno.lastname}</div>
                                <div class="font-normal text-gray-500">{alumno.email}</div>
                            </div>  
                        </th>
                        <td class="px-6 py-4">
                            {alumno.number}
                        </td>
                        <td class="px-6 py-4">
                            {/**<div class="flex items-center px-3">
                            <div className={`h-4 w-4 rounded-full mr-2 ${alumno.activo ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            </div>*/}
                        </td>
                        <td class="px-6 py-4">
                        {alumno.activo ?
                                    <button type="button" 
                                    class="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={() => actualizarActivo(alumno.id, false)}
                                            >
                                        <svg class="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.992 11.287c-1 .097-1.96.45-2.792 1.029a25.118 25.118 0 0 0-4.454 5.721 1.803 1.803 0 0 1-.655.705 1.742 1.742 0 0 1-1.648.096 1.786 1.786 0 0 1-.604-.457 1.874 1.874 0 0 1-.432-1.439l1.562-4.626m9.023-1.03H19V2.03c0-.273-.106-.535-.294-.728A.99.99 0 0 0 17.997 1h-1.002a.99.99 0 0 0-.71.301 1.042 1.042 0 0 0-.293.728v9.258Zm-8.02 1.03H3.003c-.322 0-.64-.08-.925-.233a2.022 2.022 0 0 1-.716-.645 2.108 2.108 0 0 1-.242-1.883l2.36-7.2C3.769 1.54 3.96 1 5.365 1c2.59 0 5.39 1.06 7.504 1.66"/>
                                        </svg>
                                    </button>:
                                    <button type="button" 
                                    class="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={() => actualizarActivo(alumno.id, false)}
                                            >
                                        <svg class="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.992 11.287c-1 .097-1.96.45-2.792 1.029a25.118 25.118 0 0 0-4.454 5.721 1.803 1.803 0 0 1-.655.705 1.742 1.742 0 0 1-1.648.096 1.786 1.786 0 0 1-.604-.457 1.874 1.874 0 0 1-.432-1.439l1.562-4.626m9.023-1.03H19V2.03c0-.273-.106-.535-.294-.728A.99.99 0 0 0 17.997 1h-1.002a.99.99 0 0 0-.71.301 1.042 1.042 0 0 0-.293.728v9.258Zm-8.02 1.03H3.003c-.322 0-.64-.08-.925-.233a2.022 2.022 0 0 1-.716-.645 2.108 2.108 0 0 1-.242-1.883l2.36-7.2C3.769 1.54 3.96 1 5.365 1c2.59 0 5.39 1.06 7.504 1.66"/>
                                        </svg>
                                    </button>
                                }
                        <button type="button" 
                                class="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => cambiarGrupo(alumno.id)}
                        >
                           <svg class="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 15">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3"/>
                            </svg>
                        </button>
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