'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ToastContainer, toast } from 'react-toastify';

export default function Nueva_asignatura({ modalId }){
    //supabase client instance
    const supabase = createClientComponentClient();
    //estados para manejar los grados seleccionados
    const [nombreAsignatura, setNombreAsignatura] = useState('');
    const [gradosSeleccionados, setGradosSeleccionados] = useState([]);
    const [grados, setGrados] = useState([]);
    const [docentes, setDocentes] = useState([]);
    const [docenteSeleccionado, setDocenteSeleccionado] = useState('');
    let profileData = [];
    
    const cerrarModal = () => {
        document.getElementById(modalId).checked = false;
    };

    const seleccionarTodosGrados = () => {
        const todosLosIds = grados.map(grado => grado.id);
        setGradosSeleccionados(todosLosIds);
    };

    //pbetener grados de la base de datos
    const obtenerGrados = async () => {
        let { data: grados, error } = await supabase
            .from('grados') // Asegúrate de que 'grados' es el nombre correcto de tu tabla
            .select('*');
    
        if (error) {
            console.log('Error al obtener los grados:', error);
        } else {
            //setGrados(grados);
            setGrados(reordenarGrados(grados));
            console.log('Grados:', reordenarGrados(grados));
        }
    };
    const reordenarGrados = (grados) => {
        if (grados.length > 1) {
            // Extrae el segundo elemento
            const [primerGrado, segundoGrado, ...resto] = grados;
    
            // Reorganiza el arreglo colocando el segundo grado al principio
            const gradosReorganizados = [segundoGrado, primerGrado, ...resto];
    
            return gradosReorganizados;
        }
        return grados;
        };
    
        const fetchDocentes = async () => {
            const { data, error } = await supabase
                .from('profiles') // Reemplazar 'docentes' con el nombre real de tu tabla
                .select('*'); // Ajustar para seleccionar solo los campos necesarios
        
            if (error) {
                console.error('Error al obtener datos de docentes:', error);
            } else {
                console.log('Docentes:', data);
                //profileData = data;
                //filtrar los docentes por rol
                profileData = data.filter((docente) => docente.role === 'Docente');
                setDocentes(profileData);
                console.log('DocentesSSS:', profileData);
            }
            };
            

    useEffect(() => {
        obtenerGrados();
        fetchDocentes();
    }, []); 

    
    

    //estados para manejar cambio en el input de nombre de asignatura y grados seleccionados
    const handleAsignaturaChange = (e) => {
        setNombreAsignatura(e.target.value);
    };

    const handleDocenteChange = (event) => {
        event.preventDefault();
        setDocenteSeleccionado(event.target.value);
        console.log('Docente seleccionado:', event.target.value);
    };
    
    const handleCheckboxChange = (gradoId) => {
        const nuevosGrados = gradosSeleccionados.includes(gradoId)
            ? gradosSeleccionados.filter(g => g !== gradoId)
            : [...gradosSeleccionados, gradoId];
        setGradosSeleccionados(nuevosGrados);
    };
    


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Insertar la asignatura
        const response = await supabase
            .from('asignaturas')
            .insert([{ name: nombreAsignatura, docente_id: docenteSeleccionado }]);
    
        let asignaturaInsertada;
    
        if (response.error) {
            console.error('Error al insertar asignatura:', response.error);
            return;
        } else if (!response.data || response.data.length === 0) {
            console.log('No se recibieron datos en la respuesta de la inserción. Recuperando la última asignatura insertada.');
    
            // Consultar la última asignatura insertada
            const { data: asignaturaRecuperada, error: errorRecuperacion } = await supabase
                .from('asignaturas')
                .select('*')
                .order('id', { ascending: false })
                .limit(1)
                .single();
    
            if (errorRecuperacion) {
                console.error('Error al recuperar la asignatura insertada:', errorRecuperacion);
                return;
            }
    
            asignaturaInsertada = asignaturaRecuperada;
        } else {
            asignaturaInsertada = response.data[0];
        }
    
        console.log('Asignatura insertada:', asignaturaInsertada);
    
        // Insertar en la tabla intermedia
        const relaciones = gradosSeleccionados.map(gradoId => ({
            grado_id: gradoId,
            asignatura_id: asignaturaInsertada.id,
            docente_id: docenteSeleccionado
        }));
    
        const responseRelaciones = await supabase
            .from('asignatura_grado')
            .insert(relaciones);
    
        if (responseRelaciones.error) {
            console.error('Error al insertar relaciones:', responseRelaciones.error);
        } else {
            //alert('Asignatura creada con éxito y relaciones establecidas');
            toast.success('Asignatura creada con éxito y asignada a los grados seleccionados');
            cerrarModal(); // Cierra el modal
            setNombreAsignatura(''); // Restablecer el nombre de la asignatura
            setGradosSeleccionados([]); // Limpiar los grados seleccionados
            setDocenteSeleccionado(''); // Limpiar el docente seleccionado
        }
    };
    
    
    
    
    return (
        <>
        <ToastContainer />
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Nueva Asignatura
                        </h3>
                    </div>
                    <form action="#">
                        <div class="grid gap-4 mb-4 sm:grid-cols-1">
                            <div>
                                <input  type="text" 
                                        name="asignatura" 
                                        value={nombreAsignatura}
                                        id="asignatura" 
                                        onChange={handleAsignaturaChange}
                                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nombre de la asignatura" required=""/>
                            </div> 
                        </div>
                        <div class="flow-root">  
                                <p class="float-left font-bold ">Asignar a:</p> 
                                <p class="float-right">
                                    <button type='button' onClick={seleccionarTodosGrados} className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Todos
                                    </button> 
                                    <select className='select select-bordered w-30 max-w-xs m-2' onChange={handleDocenteChange} value={docenteSeleccionado}>
                                        <option disabled value="">Docente:</option>
                                        {docentes.map((docente, index) => (
                                            <option key={docente.id} value={docente.id}> {docente.name}</option>
                                            ))}
                                    </select> 
                                    
                                </p>
                            </div>
                        
                        
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 py-5">    
                        {/**map de grados */}
                        {grados.map((grado, index) => (

                            <div key={index} class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                <input  id={grado.id}
                                        type="checkbox" 
                                        checked={gradosSeleccionados.includes(grado.id)}
                                        value={grado.id}
                                        name="bordered-checkbox" 
                                        onChange={() => handleCheckboxChange(grado.id)}
                                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="bordered-checkbox-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{grado.nombre}</label>
                            </div>
                            ))}
                            
                              

                        </div>
                        <button type="submit"
                                onClick={handleSubmit}
                                class="text-white inline-flex items-center bg-lime-700 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            
                            Crear Asignatura
                        </button>
                    </form>
                </div>
        </>
    )
}