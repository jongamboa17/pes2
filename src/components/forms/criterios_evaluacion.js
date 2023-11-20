'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ToastContainer, toast } from 'react-toastify';
export default function Criterios_evaluacion({ userId, asignaturas, modalId }) {
    const supabase = createClientComponentClient();
    const [criterios, setCriterios] = useState([]);
    //const [asignaturas, setAsignaturas] = useState([]);
    //const [porcentajes, setPorcentajes] = useState([]);
    //const [forceUpdate, setForceUpdate] = useState(0);

    const [newCriteria, setNewCriteria] = useState('');
    const [porcentage, setPorcentage] = useState('');

    const [selectedCriterios, setSelectedCriterios] = useState([]);
    const [criterioWeights, setCriterioWeights] = useState({});
    
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    //filter asignaturas por docente_id
    //const asignaturasDocente = asignaturas.filter(asignatura => asignatura.docente_id === userId);
    //console.log('Asignaturas del docente:', asignaturasDocente);
    console.log('Asignaturas del docente:', asignaturas[0].name);


    const cerrarModal = () => {
        document.getElementById(modalId).checked = false;
    };

    //obteer criterios seleccionados por el usuario
    const updateCriterioWeightsInDatabase = async () => {
        const updates = selectedCriterios.map((id) => ({
          id: id,
          weight: criterioWeights[id],
    }));

    const { error } = await supabase.from('criterios_evaluacion').upsert(updates, { onConflict: ['id'] });
        if (error) {
            console.error('Error al actualizar los pesos de los criterios:', error);
        } else {
            console.log('Actualización exitosa');
            
            setSuccessMessage('Los criterios se actualizaron correctamente');
            // Muestra el mensaje de éxito
            setShowSuccessMessage(true);

            // Cierra el mensaje después de un tiempo (por ejemplo, después de 3 segundos)
            setTimeout(() => {
            setShowSuccessMessage(false);
            setSuccessMessage('');
            cerrarModal(); // Cierra el modal
            }, 1500);

            
            //limpiar los estados
            setSelectedCriterios([]);
            setCriterioWeights({});
            // Actualizar la lista de criterios hasta que se agregue el nuevo
            await fetchCriterios();
        }
    };

    //obtener usuario logueado
    const userActual = userId;
    console.log(userActual);
    
    const fetchCriterios = async () => {
        const { data } = await supabase.from('criterios_evaluacion').select('*').eq('user_id', userActual);
        if (data) {
            setCriterios(data); 
        }
    }

    

    

    const addCriteria = async () => {
        await supabase
          .from('criterios_evaluacion')
          .insert([
            { 
                name: newCriteria,
                weight: porcentage,
                user_id: userActual,
            },
          ]);
          
        

        // Actualizar la lista de criterios hasta que se agregue el nuevo
        await fetchCriterios();
        setNewCriteria('');
        setPorcentage('');
      }
      
     

    useEffect(() => {
        
        fetchCriterios(); // Obtener criterios inicialmente
        
        
    }, []);
    
        
        //console.log('Criterios before rendering:', criterios);
    return (
        <>
         
        
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 ">
                
                <center>
                    <div class="flex  items-center justify-center  dark:border-gray-600">
                        <h3 class="text-lg  font-semibold text-gray-900 dark:text-white">
                            Criterios De Evaluación
                 
                        </h3>
                    </div>    
                </center>
            </div>
            <div className=" px-5 mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-2 grid-flow-row-dense">
            
                <div className="rounded-lg ">
                    
                        <div class="pb-1 items-center justify-center">
                            <h3 className="   font-medium p-2">Seleccione los criterios:</h3>
                            
                            {/**Agregar campos */}
                            <ul class="h-60 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                                {criterios.map((criterio) => (
                                    
                                <li >
                                    <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                        <input 
                                            checked={selectedCriterios.includes(criterio.id)}
                                            onChange={(e) => {
                                            const id = criterio.id;
                                            const isChecked = e.target.checked;
                                
                                            // Actualiza el array de IDs seleccionados
                                            setSelectedCriterios((prevSelected) => {
                                                if (isChecked) {
                                                return [...prevSelected, id];
                                                } else {
                                                return prevSelected.filter((selectedId) => selectedId !== id);
                                                }
                                            });
                                
                                            // Actualiza el objeto de pesos de criterios
                                            setCriterioWeights((prevWeights) => {
                                                if (isChecked) {
                                                return { ...prevWeights, [id]: criterio.weight };
                                                } else {
                                                const { [id]: _, ...newWeights } = prevWeights;
                                                return newWeights;
                                                }
                                            });
                                            }}
                                            id="link-checkbox" 
                                            type="checkbox" 
                                            class="w-5 h-5 rounded-md mr-2"
                                        />

                                        <span class="flex-grow text-sm sm:text-xs">{criterio.name}</span>

                                        <input 
                                            type="number" 
                                            id="default-search" 
                                            class=" w-16 h-10  ml-2 text-sm text-gray-900 border
                                                    border-gray-300 rounded-lg bg-gray-50
                                                    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                                                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                                                    dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                            placeholder={criterio.weight} 
                                            value={criterioWeights[criterio.id] || ''}
                                            onChange={(e) => {
                                                const newWeight = e.target.value;
                                                setCriterioWeights((prevWeights) => ({
                                                ...prevWeights,
                                                [criterio.id]: newWeight,
                                                }));
                                            }}
                                            required
                                        />
                                    </a>
                                        
                                </li>
                              ))} 

                            </ul>
                        </div>
                        
                </div>
                <div className="rounded-lg min-h-[80px] flex flex-col md:flex-row gap-2">
                    <center>
                        <div className="py-1  gap-y-3 flex-grow">
                            <input 
                            value={newCriteria} onChange={(e) => {
                                setNewCriteria(e.target.value);
                            }}
                            type="text" id="default-search" class="m-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Criterio" required/>
                            <input 
                            value={porcentage} onChange={(e) => {
                                setPorcentage(e.target.value);
                            }}
                            type="number" id="default-search" class=" text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="%" required/>                               
                            

                            <button onClick={addCriteria} type="button" className="m-4 p-4 bg-green-500 hover:bg-green-700 text-white rounded-md  h-10 flex items-center justify-center">
                                Agregar
                            </button>  
                            <input type="number" id="default-search" class=" text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nota mínima aprob" required/>
                        </div> 
                    </center>
                </div>
            </div>
            
            <center>   
            {showSuccessMessage && (
                <div className="text-white bg-green-500 rounded-md m-2 "> {successMessage} </div>
            )} 
                <button 
                    onClick={updateCriterioWeightsInDatabase}
                    type="submit" 
                    className="m-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-colors duration-300">
                    
                    Guardar Cambios
                </button>
                
            </center>
        </>
    )
}