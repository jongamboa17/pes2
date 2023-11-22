'use client';
import Editar_calificaciones from '../forms/editar_calificaciones'
import Criterios_evaluacion from '../forms/criterios_evaluacion'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default  function Tabla_alumnos_calificaciones({ userId, periodos, asignaturas, grupoId }) {   
    const supabase = createClientComponentClient();
    //console.log('GRUPOIDDD',grupoId);
    //const userId3 = userId;
    //console.log('USEr34:', userId3);
    //console.log('asignaturas:', asignaturas[0].id);
    const [criteriosAsignadosEnPadre, setCriteriosAsignadosEnPadre] = useState([]);    

    //traer los criterios de evaluacion con con ids igual a criteriosAsignadosEnPadre
    const [criteriosEvaluacion, setCriteriosEvaluacion] = useState([]);
    const [criteriosEvaluacionFiltrados, setCriteriosEvaluacionFiltrados] = useState([]);
    //guardar el grupoId en el estado
    const [grupoIdState, setGrupoIdState] = useState(grupoId);

    const [estudiantes, setEstudiantes] = useState([]);

    //guardar el periodo seleccionado en el estado
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null);
    const [calificaciones, setCalificaciones] = useState([]);

    const fetchCalificaciones = async () => {
        // Suponiendo que 'estudiante.id' y 'asignaturas[0].id' son válidos y existen
        const { data, error } = await supabase
            .from('calificaciones')
            .select('*').eq('periodo', 2)//////////////////////////////////////CAMBIAR EL PERIODO

        if (error) {
            console.error('Error al obtener calificaciones', error);
            return;
        }else {
            //llamar la funcion callback para enviar las calificaciones a la tabla
            //console.log('Calificaciones extosas:', data);
            setCalificaciones(data);
        }
    };

    //funcion para llmar fetchCalificaciones onCalificacionActualizada
    function onCalificacionesActualizadas() {
        fetchCalificaciones();
    }


    //callback para recibir los criterios asignados desde el componente hijo
    function manejarCalificacionesActualizadas(calificaciones) {
        // Lógica para manejar las calificaciones actualizadas
        //console.log('CALIFICACIONES ACTUALIZADAS:', calificaciones);
        //alert('CALIFICACIONES ACTUALIZADAS:', calificaciones);

        //estado para guardar las calificaciones actualizadas
        //setCalificaciones(calificaciones);
    }
    

    // Actualizar el estado cuando se seleccione un nuevo período
    const handlePeriodoChange = (e) => {
        setPeriodoSeleccionado(e.target.value);
        fetchCalificaciones();
        console.log('PERIODO SELECCIONADO:', e.target.value);
    };

    useEffect(() => {
        if (periodos.length > 0) {
            const sortedPeriodos = periodos.sort((a, b) => new Date(b.initial_date) - new Date(a.initial_date));
            const periodoMasReciente = sortedPeriodos[0];
            setPeriodoSeleccionado(periodoMasReciente.id);
        }
    }, [periodos]);
    
    // Función para obtener los estudiantes del grupo
    const fetchEstudiantesDelGrupo = async () => {
        const { data, error } = await supabase
            .from('profiles') // Asumiendo que 'profiles' es tu tabla de estudiantes
            .select('*')
            .eq('Grupo', grupoId); // Asumiendo que 'grupo_id' es la columna que relaciona estudiantes con grupos

        if (error) {
            console.error('Error al obtener estudiantes', error);
        } else {
            setEstudiantes(data);
        }
    };

     // Llamamos a fetchEstudiantesDelGrupo cada vez que cambie el grupoId
     useEffect(() => {
        fetchEstudiantesDelGrupo();
        fetchCalificaciones();
    }, []);

    //funcion para traer los criterios de evaluacion de la base de datos
    const fetchCriteriosEvaluacion = async () => {
        const { data } = await supabase.from('criterios_evaluacion').select('*');
        if (data) {
             console.log('Criterios de evaluacionDESDEFILTRADOS:', data);
             //filrar los criterios de evaluacion que tengan id igual a criteriosAsignadosEnPadre
            const criteriosFiltrados = data.filter(criterio => criteriosAsignadosEnPadre.includes(criterio.id));
            setCriteriosEvaluacion(criteriosFiltrados);

        }
    }

    //fetch para obtener calificaciones de los alumnos
    const fetchCalificiones = async () => {
        const { data, error } = await supabase.from('calificaciones').select(`
            asignatura_id,
            alumno_id,
            periodo,
            metadata: metadata-> criterios 
        `);

        if (error) {
            console.log('error', error);
        }
        else {
            console.log('dataCALIFICACIONES', data);
            console.log('DATA2', data[0].metadata[0].criterioId);
        }


    };

    const fetchCalificiones2 = async () => {
       
        const { data, error } = await supabase.from('calificaciones').select(`
        profiles ( id, name )
        `);


        if (error) {
            console.log('error', error);
        }
        else {
            console.log('dataCALIFICACIONES', data);
            
        }
    };

            
        

    useEffect(() => {
        fetchCriteriosEvaluacion();
    }, [criteriosAsignadosEnPadre]);

  // Define una función para recibir los criterios asignados desde el componente hijo
    const recibirCriteriosAsignados = (criterios) => {
        setCriteriosAsignadosEnPadre(criterios);
    };

    //console.log('criteriosAsignadosEnPadre:', criteriosAsignadosEnPadre);
    return (
        <>
           <div class="flow-root">  
                <p class="float-left font-bold p-2">Tabla Alumnos
                
                    <select className='select select-bordered w-50 max-w-xs m-2 ml-4'  onChange={handlePeriodoChange} value={periodoSeleccionado}>
                            
                            {periodos.map((periodo) => (
                                <option key={periodo.id} value={periodo.id}>{periodo.name}</option>
                                ))}
                        </select>
                    <label htmlFor={`modal_Criterios_${grupoId}`} className="text-white bg-green-600 hover:bg-blue-800 
                                                            focus:ring-4 focus:outline-none focus:ring-blue-300  
                                                            font-medium rounded-lg text-sm px-3 py-2.5 ml-4 text-center 
                                                            inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 
                                                            dark:focus:ring-blue-800">
                        <svg class="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0v3H6V2m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M5 5h8m-5 5h5m-8 0h.01M5 14h.01M8 14h5"/>
                        </svg>
                    </label>
                    
                </p> 
                
                <p class="float-right p-2">
                {/** <button className='text-black' onClick={fetchCalificiones   }>BUTTON</button><br/>
                <button className='text-black' onClick={fetchCalificiones2   }>BUTTON2</button>*/}

                
                
                </p>
            </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    
                    <tr>
                        
                        <th scope="col" class=" invisible sm:visible py-3">
                            <center>
                            Nombre
                            </center>
                        </th>


                        {criteriosEvaluacion.map((criterio) => (
                            <th scope="col" class="invisible sm:visible py-3 " key={criterio.id}>
                                
                                
                                <center>
                                {criterio.name} - {criterio.weight}{' '}{'%'}
                                </center>
                                
                            </th>
                        ))}
                        
                        <th scope="col" class=" py-3 ">
                            <center>    
                            <span className='font-bold '>Nota final</span>
                            </center>
                        </th>
                        <th scope="col" class="invisible sm:visible py-3">
                            <center>
                            
                            </center>
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.map((estudiante) => {
                    // Inicializa la suma de calificaciones para cada estudiante
                    let sumaCalificaciones = 0;
                    let contadorCalificaciones = 0;

                    return (
                    <tr key={estudiante.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="py-4">
                            <center>    
                            {estudiante.name}
                            </center>    
                        </th>
                        {criteriosEvaluacion.map((criterio) => {
                            const calificacionEncontrada = calificaciones.find(calificacion => 
                                calificacion.alumno_id === estudiante.id && calificacion.criterio_id === criterio.id);

                            // Suma la calificación encontrada
                            if (calificacionEncontrada) {
                                sumaCalificaciones += calificacionEncontrada.calificacion;
                                contadorCalificaciones++;
                            }

                            return (
                                <td class="py-4 invisible sm:visible" key={criterio.id}>
                                    <center>
                                        {calificacionEncontrada ? calificacionEncontrada.calificacion : 'Sin calificar'}
                                    </center>
                                </td>
                            );
                        })}
                       
                       
                       

                       <th scope="col" class="py-3">
                            <center> 
                                <span 
                                    className={
                                        `font-bold px-5 py-3 rounded-md text-white ${
                                            contadorCalificaciones > 0 && (sumaCalificaciones / contadorCalificaciones) > 65 
                                            ? 'bg-green-500' 
                                            : 'bg-red-500'
                                        }`
                                    }
                                >
                                    {contadorCalificaciones > 0 
                                        ? (sumaCalificaciones / contadorCalificaciones)
                                        : 'Sin calificar'
                                    }
                                </span>
                            </center>
                        </th>

                        <td class=" py-4">
                            <center>
                                <label htmlFor={`modal_estudiante_${estudiante.id}`} className="text-white bg-green-600 hover:bg-blue-800 
                                                        focus:ring-4 focus:outline-none focus:ring-blue-300  
                                                        font-medium rounded-lg text-sm px-3 py-2.5 text-center 
                                                        inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 
                                                        dark:focus:ring-blue-800">
                                    <svg class="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                        <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z"/>
                                        <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z"/>
                                    </svg>    
                                </label> 
                                
                            </center>
                        </td>
                        
                    </tr>
                    );
                    })}
                </tbody>
            </table>
        
        
            {estudiantes.map((estudiante) => (
                <div key={estudiante.id}>
                    {/**Modal editar*/}
                    <input type="checkbox" id={`modal_estudiante_${estudiante.id}`} className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <Editar_calificaciones
                                                    modalId={`modal_estudiante_${estudiante.id}`}
                                                    grupoId={grupoIdState}
                                                    criteriosEvaluacion={criteriosEvaluacion}
                                                    estudiante={`${estudiante.name} ${estudiante.lastname}`}
                                                    estudianteId={estudiante.id}
                                                    onCalificacionesActualizadas={onCalificacionesActualizadas}
                                                    asignaturas={asignaturas}
                                                    

                            />
                        </div>
                        <label className="modal-backdrop" htmlFor={`modal_estudiante_${estudiante.id}`}>Close</label>
                    </div>
                </div>
            ))}
        
        
        {/**Modal criterios de evaluación*/}
        <input type="checkbox" id={`modal_Criterios_${grupoId}`} className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <Criterios_evaluacion   recibirCriteriosAsignados={recibirCriteriosAsignados} 
                                        modalId={`modal_Criterios_${grupoId}`}
                                        userId={ userId } 
                                        grupoId={grupoIdState} 
                                        asignaturas={asignaturas}
                />
            </div>
            <label className="modal-backdrop"  htmlFor={`modal_Criterios_${grupoId}`}>Close</label>
        </div>
            
        </>
    )


}