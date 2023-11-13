'use client'
import Image from 'next/image'
import logo2 from '../utilities/photo1.avif'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Pendientes_grupo() {
    const supabase = createClientComponentClient();
    const [alumnos, setAlumnos] = useState([]);
    const [grados, setGrados] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [gradoSeleccionado, setGradoSeleccionado] = useState('');

    
  //traer los alumnos que no tengan grupo en la base de datos
    let profileData = [];
    const fetchAlumnos = async () => {
    const { data, error } = await supabase
        .from('profiles') // Reemplazar 'docentes' con el nombre real de tu tabla
        .select('*'); // Ajustar para seleccionar solo los campos necesarios
 
    if (error) {
        console.error('Error al obtener datos de docentes:', error);
    } else {
        //console.log('Alumnos:', data);
        //profileData = data;
        //filtrar los docentes si no tiene grupo
        profileData = data.filter((alumno) => alumno.role === 'Alumno' && alumno.Grupo === null && alumno.activo === true);
        setAlumnos(profileData);
    }
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

        const obtenerGrupos = async () => {
            if (gradoSeleccionado) {
                console.log('Grado seleccionado:', gradoSeleccionado);
                let { data: gruposObtenidos, error } = await supabase
                    .from('grupos')
                    .select('*')
                    .eq('grado_id', gradoSeleccionado);
                console.log('Grupos obtenidos:', gruposObtenidos);
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
        obtenerGrados();
        fetchAlumnos();
    }, []);

    useEffect(() => {
        obtenerGrupos();
    }, [gradoSeleccionado]);

    const handleGradoChange = (event) => {
        const seleccionado = parseInt(event.target.value, 10);
        setGradoSeleccionado(seleccionado);
    };
    
    
    return (
    <>
      <ToastContainer />
        <center>
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg class="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.1" d="M9 1v16M1 9h16"/>
                </svg>  
            </button>
        </center>
        <ul class="h-40 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
            {alumnos.map((docente) => (
            <li key={docente.id}>
            <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <input
                type="checkbox"
                className="w-5 h-5 rounded-md mr-2"
                
            />
                <Image class="w-6 h-6 mr-2 rounded-full"  src={logo2} alt="Jese image"/>
                <span className='font-bold'>{docente.name}{' '}{docente.lastname} </span>
            </a>
            </li>
            ))}
        </ul>
    
        <center>
        <select className='select select-bordered w-full max-w-xs' value={gradoSeleccionado} onChange={handleGradoChange}>
            <option value="">Seleccione un Grado</option>
            {grados.map((grado) => (
                <option key={grado.id} value={grado.id}>
                    {grado.nombre}
                </option>
            ))}
        </select>
        
        {gradoSeleccionado && (
            <select className='select select-bordered w-full max-w-xs' multiple>
                {grupos.map((grupo) => (
                    <option key={grupo.id} value={grupo.id}>
                        {grupo.nombre}
                    </option>
                ))}
            </select>
        )}

            
        </center>
        
  </>

)
}


