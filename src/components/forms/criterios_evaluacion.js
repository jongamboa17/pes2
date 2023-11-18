
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
export default function Criterios_evaluacion() {
    const supabase = createClientComponentClient();
    const [criterios, setCriterios] = useState([]);
    const [criteriosSeleccionados, setCriteriosSeleccionados] = useState([]);
    const [porcentajes, setPorcentajes] = useState([]);
    
    const fetchCriterios = async () => {
        
        try {
            const { data, error } = await supabase
                .from('criterios_evaluacion')
                .select('*');
            console.log('After Supabase call', data, error);
    
           
            setCriterios(data);
        

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        console.log('Criterios updated:', criterios);
    }, [criterios]);
    
        
        useEffect(() => {
            fetchCriterios(); // Obtener criterios inicialmente
            
            // Establecer la suscripción en tiempo real
            const subscription = supabase
                .channel('table-db-changes')
                .on('postgres_changes', {
                    event: '*',
                    schema: 'public',
                    table: 'criterios_evaluacion'
                }, payload => {
                    console.log('Realtime update:', payload);
                    fetchCriterios(); // Re-fetch criterios when a change occurs
                    

                })
                .subscribe();
    
            // Función de limpieza para cancelar la suscripción
            return () => {
                
                supabase.removeChannel(subscription)
            };
        }, []);
    
    return (
        <>
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 ">
                <div class="flex justify-between dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Criterios De Evaluación
                    </h3>
                </div>    
            </div>
            <div className=" px-5 mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-2 grid-flow-row-dense">
            
                <div className="rounded-lg ">
                    
                        <div class="pb-1">
                            <h3 className=" pl-4 pb-2 font-medium">Seleccione los criterios:</h3>
                            {/**Agregar campos */}
                            <ul class="h-60 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                                {criterios.map((criterio) => (
                                    
                                <li key={criterio.id}>
                                    <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        <input id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>
                                        <span class="flex-grow text-sm sm:text-xs">{criterio.name}</span>
                                        <input type="email" id="default-search" class=" w-11 h-10  ml-2 rounded-md" placeholder="%" />
                                        
                                    </a>
                                </li>
                                ))}

                            </ul>
                        </div>
                        
                </div>
                <div className="rounded-lg min-h-[80px] flex flex-col md:flex-row gap-2">
                    <div className="mt-6 w-28">  
                        <div className="py-1  gap-y-3 flex-grow">
                            <input type="text" id="default-search" class="mb-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Criterio" required/>
                            <input type="number" id="default-search" class=" text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="%" required/>                               
                            <center>

                            <button type="button" className="m-1 bg-green-500 hover:bg-green-700 text-white rounded-full w-10 h-10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            </button>  
                            </center>
                        </div> 
                        <input type="number" id="default-search" class=" text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nota mínima aprob" required/>
                    
                    </div>
                 
                </div>
                
                
            </div>
            
           
                
                
            <div className="flex flex-col sm:flex-row gap-2 p-4 justify-end sm:justify-start">
                <button type="submit" className=" bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300">
                    Guardar Cambios
                </button>
                <button type="button" className="bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300">
                    Eliminar criterios
                </button>
            </div>
           
            
            

        </>
    )
}