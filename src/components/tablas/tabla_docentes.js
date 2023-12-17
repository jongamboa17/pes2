import Image from 'next/image'
import logo from '../../utilities/logo1.png'
import 'flowbite'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { useData } from '../AsignaturaContext';

export default function Tabla_docentes({docentes = [],onActualizarDocentes, onActualizarDocentes2}) {    
    const supabase = createClientComponentClient();
    const [asignaturas, setAsignaturas] = useState([]);
    const [selectedAsignaturas, setSelectedAsignaturas] = useState({});

    const { refrescarAsignaturas } = useData();

    const [editandoDocenteId, setEditandoDocenteId] = useState(null);
    const [datosEdicion, setDatosEdicion] = useState({ name: '', email: '', number: '' });

    const iniciarEdicion = (docente) => {
        setEditandoDocenteId(docente.id);
        setDatosEdicion({ name: docente.name, email: docente.email, number: docente.number });
    };

    const guardarCambios = async (docenteId) => {
        const datosActualizados = { name: datosEdicion.name, email: datosEdicion.email, number: datosEdicion.number };
        const { data, error } = await supabase
            .from('profiles')
            .update(datosActualizados)
            .eq('id', docenteId);

        if (error) {
            console.error('Error al actualizar el docente:', error);
            // Manejar el error
        } else {
            
            console.log('Datos actualizados:', data); 
                onActualizarDocentes2({ ...datosActualizados, id: docenteId }); // Actualizar el estado global
                setEditandoDocenteId(null); // Salir del modo edición
            
            //toast.success("Docente actualizado con éxito.");
        }
    };

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


    const getAsignaturas = async () => {
        let { data: asignaturas, error } = await supabase
        .from('asignaturas')
        .select('*');
    
        if (error) {
            console.error('Error al obtener asignaturas:', error);
        } else {
            console.log('Asignaturas recibidas:', asignaturas); // Agrega esta línea para depurar
            setAsignaturas(asignaturas || []);
            
        }
    };

    useEffect(() => {
        // Cargar asignaturas
        getAsignaturas();
    }, [refrescarAsignaturas]);

    const handleAsignaturaChange = async (docenteId, newAsignaturaId) => {
        let updateData;

        // Si se selecciona "Sin asignar", establecer docente_id a null
        if (newAsignaturaId === '') {
            updateData = { docente_id: null };
        } else {
            updateData = { docente_id: docenteId };
        }

        const { error } = await supabase
        .from('asignaturas')
        .update(updateData)
        .eq('id', newAsignaturaId === '' ? null : newAsignaturaId);

        if (error) {
            console.error('Error al actualizar la asignatura:', error);
            // Manejar el error (mostrar mensaje al usuario, etc.)
        } else {
            setSelectedAsignaturas(prev => ({
                ...prev,
                [docenteId]: newAsignaturaId
            }));
        }
    };

    useEffect(() => {
        // Esta función se ejecuta solo una vez cuando se monta el componente
        const cargarAsignaturasIniciales = async () => {
            let initialSelected = {};
            for (const docente of docentes) {
                // Aquí se asume que puedes obtener el id de la asignatura de cada docente directamente
                initialSelected[docente.id] = docente.asignaturaId || '';
            }
            setSelectedAsignaturas(initialSelected);
        };

        cargarAsignaturasIniciales();
        getAsignaturas(); // Llama a esta función solo una vez al montar el componente
    }, []);
    
    useEffect(() => {
        // Actualiza solo para los docentes que no tienen una asignatura seleccionada
        const actualizarAsignaturas = {};
        docentes.forEach(docente => {
            if (selectedAsignaturas[docente.id] === undefined || selectedAsignaturas[docente.id] === '') {
                actualizarAsignaturas[docente.id] = asignaturas.find(asignatura => asignatura.docente_id === docente.id)?.id || '';
            }
        });
    
        if (Object.keys(actualizarAsignaturas).length > 0) {
            setSelectedAsignaturas(prev => ({ ...prev, ...actualizarAsignaturas }));
        }
    }, [docentes, asignaturas]);
    

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
                        
                        <th scope="col" class="px-11 py-3">
                            Asignatura
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Activo
                        </th> 
                        <th scope="col" class="px-3 py-3">
                            Acción
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {docentes.map((docente, index) => (
                    <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-2 p-2">
                        {editandoDocenteId === docente.id ? (
                                
                                
                                
                                <svg onClick={() => guardarCambios(docente.id)} class="w-[16px] h-[16px] text-green-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                <path d="M0 6v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6H0Zm13.457 6.707-2.5 2.5a1 1 0 0 1-1.414-1.414l.793-.793H5a1 1 0 0 1 0-2h5.336l-.793-.793a1 1 0 0 1 1.414-1.414l2.5 2.5a1 1 0 0 1 0 1.414ZM9.043.8a2.009 2.009 0 0 0-1.6-.8H2a2 2 0 0 0-2 2v2h11.443L9.043.8Z"/>
                              </svg>  
                              
                            ) : (
                                
                                <svg 
                                    
                                    onClick={() => iniciarEdicion(docente)}
                                    class="w-[16px] h-[16px] text-green-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                    <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                </svg>
                            )}
                        </td>
                        <th scope="row" class="flex items-center px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            {/**<Image width="10"  height="10" class="w-10 h-10 rounded-full" src={logo} alt="Jese image"></Image> */}
                            
                            <div class="pl-2 ">
                            {editandoDocenteId === docente.id ? (
                                <input
                                    type="text"
                                    value={datosEdicion.name}
                                    onChange={(e) => setDatosEdicion({...datosEdicion, name: e.target.value})}
                                    className='block w-full mb-2 rounded-md'
                                />
                            ) : (
                                <div class="text-base font-semibold"> {docente.name}</div>
                            )}

                            {editandoDocenteId === docente.id ? (
                                <input
                                    type="text"
                                    value={datosEdicion.email}
                                    onChange={(e) => setDatosEdicion({...datosEdicion, email: e.target.value})}
                                    className='block w-full mb-2 rounded-md'
                                />
                            ) : (
                                <div class="font-normal text-gray-500">{docente.email}</div>
                            )} 

                            {editandoDocenteId === docente.id ? (
                                <input
                                    type="number"
                                    value={datosEdicion.number}
                                    onChange={(e) => setDatosEdicion({...datosEdicion, number: e.target.value})}
                                    className='block w-full mb-2 rounded-md'
                                />
                            ) : (
                                <div class="font-normal text-gray-500">{docente.number}</div>
                            )} 
                                
                            </div>  
                            
                        </th>
                       
                                
                            
                        <td class="px-10 py-4">
                            <select
                                class="form-select form-select-sm appearance-none block w-full px-4 py-1 text-xs font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                aria-label=".form-select-sm example"
                                value={selectedAsignaturas[docente.id] || ''}
                                onChange={(e) => handleAsignaturaChange(docente.id, e.target.value)}
                            >
                                <option value="">Sin asignar</option>
                                {asignaturas.map((asignatura) => (
                                    <option key={asignatura.id} value={asignatura.id}>{asignatura.name}</option>
                                ))}
                            </select>
                        </td>
                        
                        
                        <td class="px-6 py-4">
                            <div class="flex items-center px-3">
                            <div className={`h-4 w-4 rounded-full mr-2 ${docente.activo ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            </div>
                        </td>
                            

                        
                        <td class="px-3 py-4">
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