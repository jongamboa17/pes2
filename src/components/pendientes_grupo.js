'use client'
import Image from 'next/image'
import logo2 from '../utilities/photo1.avif'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Pendientes_grupo({alumnosPendientes,onEnviarDatos}) {
    const supabase = createClientComponentClient();
    const [alumnos, setAlumnos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [gradoSeleccionado, setGradoSeleccionado] = useState('');
    const [alumnosSeleccionados, setAlumnosSeleccionados] = useState([]);
    const [grupoSeleccionado, setGrupoSeleccionado] = useState('');
    
    
  //traer los alumnos que no tengan grupo en la base de datos
  useEffect(() => {
    
    // Función para obtener los detalles de los alumnos por ids
    const obtenerDetallesAlumnos = async (ids) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .in('id', ids); // Filtra los alumnos cuyos IDs están en el array 'ids'

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error al obtener detalles de alumnos:', error);
            return [];
        }
    };



    //traer datos de la base de datos cantidad de docentes
    
    let profileData = [];
    const fetchAlumnos = async () => {
    const detallesAlumnosPendientes = await obtenerDetallesAlumnos(alumnosPendientes);    
    const { data, error } = await supabase
        .from('profiles') // Reemplazar 'docentes' con el nombre real de tu tabla
        .select('*'); // Ajustar para seleccionar solo los campos necesarios
 
    if (error) {
        console.error('Error al obtener datos de docentes:', error);
    } else {
        //console.log('Alumnos:', data);
        //profileData = data;
        //filtrar los docentes por rol y campo activo sea igual a false
        
        profileData = data.filter((alumno) => alumno.role === 'Alumno' && alumno.Grupo === null && alumno.activo === true);
        setAlumnos(profileData);
        // Filtrar los duplicados
        const alumnosUnicos = detallesAlumnosPendientes.filter(pendiente => 
            !data.some(activo => activo.id === pendiente.id));

        // Combinar los listados de alumnos sin duplicados
        const alumnosActualizados = [...alumnosUnicos, ...profileData];
        setAlumnos(alumnosActualizados);

        //console.log('Alumnos:', profileData);
    }
    };
    
    
    
     fetchAlumnos();
   }, [alumnosPendientes]);
    
    //useEffect para traer grados
    useEffect(() => {
        //pbetener grados de la base de datos
    const obtenerGrados = async () => {
        let { data: gradosObtenidos, error } = await supabase
            .from('grados')
            .select('*');
    
        if (error) {
            console.log('Error al obtener los grados:', error);
        } else {
            setGrados(reordenarGrados(gradosObtenidos));
        }
    };
    obtenerGrados();
    }, []);

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

        const obtenerGrupos = async () => {
            if (gradoSeleccionado) {
                let { data: gruposObtenidos, error } = await supabase
                    .from('grupos')
                    .select('*')
                    .eq('grado_id', gradoSeleccionado);
        
                if (error) {
                    console.error('Error al obtener grupos:', error);
                } else {
                    setGrupos(gruposObtenidos);
                }
            } else {
                setGrupos([]);
            }
        };
        
        useEffect(() => {
            obtenerGrupos();
        }, [gradoSeleccionado]);

    

    const handleGradoChange = (event) => {
        const seleccionado = parseInt(event.target.value, 10);
        setGradoSeleccionado(seleccionado);
        console.log('Grado seleccionado:', seleccionado);
    };
    
    const handleAlumnoCheckboxChange = (alumnoId) => {
        setAlumnosSeleccionados(prev => {
            const isSelected = prev.includes(alumnoId);
            if (isSelected) {
                return prev.filter(id => id !== alumnoId);
            } else {
                return [...prev, alumnoId];
            }
        });
    };
    
    const handleGrupoChange = (event) => {
        setGrupoSeleccionado(event.target.value);
        console.log('Grupo seleccionado:', event.target.value);
    };
    
    const asignarAlumnosAGrupo = async () => {
        let actualizados = false;
        //llamar funcion para enviar datos al componente padre y enviar seleccionados
        
        
        for (const alumnoId of alumnosSeleccionados) {
            const { error } = await supabase
                .from('profiles') // Asume que 'profiles' es la tabla donde se almacenan los alumnos
                .update({ Grupo: grupoSeleccionado }) // Asume que 'grupo_id' es el campo para el grupo en 'profiles'
                .eq('id', alumnoId);
    
            if (error) {
                console.error('Error al actualizar alumno:', alumnoId, error);
                toast.error(`Error al asignar el alumno con ID: ${alumnoId}`);
            }else
            {
                actualizados = true;
                console.log('Alumno actualizado:', alumnoId);
            }
        }

        if (actualizados) {
            // Filtrar fuera los alumnos que han sido actualizados
            const alumnosRestantes = alumnos.filter(
                alumno => !alumnosSeleccionados.includes(alumno.id)
            );

            setAlumnos(alumnosRestantes);
            setAlumnosSeleccionados([]);
            //vaciar el grupo seleccionado y grado seleccionado
            setGrupoSeleccionado('');
            setGradoSeleccionado('');
            toast.success('Alumno agregado correctamente');
            
            }
    
       
    };

    const enviarDatos = () => {
        onEnviarDatos(alumnosSeleccionados);
    }

    const manejarClick = () => {
        enviarDatos();
        asignarAlumnosAGrupo();
        
        // Puedes agregar más funciones aquí si es necesario
    }

   
    
    
    
    
    return (
    <>
      <ToastContainer />
      {/** {alumnosPendientesGrupo.map((alumno) => (
        <p>{alumno.role}</p>
      ))}
      */}
        <center>
            <button onClick={manejarClick}  type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.1" d="M9 1v16M1 9h16"/>
                </svg>  
            </button>
        </center>
        {/**mensaje cuando no hay alumnos en la lista */}
        
        {alumnos.length===0 ? 
            <center>
            <div className='p-4'>
                <span className='m-4'>No hay alumnos pendientes de grupo</span>
            </div>
            </center>
        : ''}

        <ul class="h-40 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
        {alumnos.map((alumno) => (
            <li key={alumno.id}>
                <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                    <input
                        type="checkbox"
                        className="w-5 h-5 rounded-md mr-2"
                        onChange={() => handleAlumnoCheckboxChange(alumno.id)}
                        checked={alumnosSeleccionados.includes(alumno.id)}
                    />
                    <Image className="w-6 h-6 mr-2 rounded-full" src={logo2} alt={`${alumno.name} ${alumno.lastname}`} />
                    <span className='font-bold'>{alumno.name}{' '}{alumno.lastname}</span>
                </a>
            </li>
        ))}
        </ul>
        
        {alumnos.length===0 ? ''
        :
        <center>
            <select className='select select-bordered w-50 max-w-xs' value={gradoSeleccionado} onChange={handleGradoChange}>
                <option disabled selected value="">Seleccione grado</option>
                {grados.map((grado) => (
                    <option key={grado.id} value={grado.id}>
                        {grado.nombre}{' '}Grado
                    </option>
                ))}
            </select>
            
            {gradoSeleccionado && (
                <select className='select select-bordered w-50 max-w-xs m-2' onChange={handleGrupoChange} value={grupoSeleccionado}>
                    <option disabled value="">Seleccione grupo</option>
                    {grupos.map((grupo) => (
                        <option key={grupo.id} value={grupo.id}>Grupo {grupo.nombre}</option>
                        ))}
                </select>
            )}   
        </center>
        
        }
        
        
  </>

)
}


