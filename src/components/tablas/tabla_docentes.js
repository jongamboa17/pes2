import Image from 'next/image'
import logo from '../../utilities/logo1.png'
import 'flowbite'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export default function Tabla_docentes({docentes,onActualizarDocentes}) {    
    const supabase = createClientComponentClient();

    const actualizarActivo = async (docenteId, activoActual) => {
        const { error } = await supabase
        .from('profiles') // Asegúrate de que 'profiles' es el nombre de tu tabla
        .update({ activo: !activoActual }) // Cambiar el estado 'activo'
        .eq('id', docenteId);

        if (error) {
        console.error('Error al actualizar docente:', docenteId, error);
        } else {
        // Actualizar el estado de 'docentes' para reflejar los cambios
        const docentesActualizados = docentes.map((doc) => 
            doc.id === docenteId ? { ...doc, activo: !activoActual } : doc
        );

        // Actualizar el estado de 'docentes' en el componente padre
        onActualizarDocentes(docentesActualizados);

        // Determina el mensaje en función del nuevo estado
        const mensajeToast = activoActual ? "Docente desactivado con éxito." : "Docente activado con éxito.";
        toast.success(mensajeToast);
        }
    };

    //crear toast para mostrar mensaje de confirmacion
    
    return (
        <>
        <div class="relative overflow-y-auto h-80 overflow-x-auto shadow-md sm:rounded-lg">
        <ToastContainer />
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    
                    <tr>
                        <th scope="col" class="p-4">
                            
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nombre
                        </th>
                        
                        <th scope="col" class="px-6 py-3">
                            Asignatura
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Activo
                        </th> 
                        <th scope="col" class="px-6 py-3">
                            Accion
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {docentes.map((docente, index) => (
                    <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 p-4">
                            
                        </td>
                        <th scope="row" class="flex items-center px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            {/**<Image width="10"  height="10" class="w-10 h-10 rounded-full" src={logo} alt="Jese image"></Image> */}
                            
                            <div class="pl-3 px-5">
                                <div class="text-base font-semibold"> {docente.name}</div>
                                <div class="font-normal text-gray-500">{docente.email}</div>
                                <div class="font-normal text-gray-500">{docente.number}</div>
                            </div>  
                        </th>
                        
                        <td class="px-10 py-4">
                            Ingles
                        </td>
                        <td class="px-6 py-4">
                            <div class="flex items-center px-3">
                            <div className={`h-4 w-4 rounded-full mr-2 ${docente.activo ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                        {docente.activo ?  
                                    <button type="button" 
                                            class=" text-white  bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={() => actualizarActivo(docente.id, docente.activo)}
                                            >
                                        <svg class="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.992 11.287c-1 .097-1.96.45-2.792 1.029a25.118 25.118 0 0 0-4.454 5.721 1.803 1.803 0 0 1-.655.705 1.742 1.742 0 0 1-1.648.096 1.786 1.786 0 0 1-.604-.457 1.874 1.874 0 0 1-.432-1.439l1.562-4.626m9.023-1.03H19V2.03c0-.273-.106-.535-.294-.728A.99.99 0 0 0 17.997 1h-1.002a.99.99 0 0 0-.71.301 1.042 1.042 0 0 0-.293.728v9.258Zm-8.02 1.03H3.003c-.322 0-.64-.08-.925-.233a2.022 2.022 0 0 1-.716-.645 2.108 2.108 0 0 1-.242-1.883l2.36-7.2C3.769 1.54 3.96 1 5.365 1c2.59 0 5.39 1.06 7.504 1.66"/>
                                        </svg>
                                    </button>: 
                                    <button type="button"
                                            class=" text-white  bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            onClick={() => actualizarActivo(docente.id, docente.activo)}
                                            >
                                        <svg class="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.008 8.714c1-.097 1.96-.45 2.792-1.028a25.112 25.112 0 0 0 4.454-5.72 1.8 1.8 0 0 1 .654-.706 1.742 1.742 0 0 1 1.65-.098 1.82 1.82 0 0 1 .97 1.128c.075.248.097.51.065.767l-1.562 4.629M4.008 8.714H1v9.257c0 .273.106.535.294.728a.99.99 0 0 0 .709.301h1.002a.99.99 0 0 0 .71-.301c.187-.193.293-.455.293-.728V8.714Zm8.02-1.028h4.968c.322 0 .64.08.925.232.286.153.531.374.716.645a2.108 2.108 0 0 1 .242 1.883l-2.36 7.2c-.288.813-.48 1.354-1.884 1.354-2.59 0-5.39-1.06-7.504-1.66"/>
                                        </svg>
                                    </button>}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )


}