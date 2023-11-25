'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Accordion3 from '@/components/accordion/accordion3';
import Alumnos_pendientes from '@/components/alumnos_pendientes';
import Pendientes_grupo from '@/components/pendientes_grupo';
import Accordion_docentes2 from '@/components/accordion/accordion_docentes2';
export default function AdminParent() {
    const supabase = createClientComponentClient();
    // Estado para mantener la lista de alumnos
    //const [alumnos, setAlumnos] = useState([]);
    const [alumnosInactivos, setAlumnosInactivos] = useState([]);
    //estado para manejar alumnos pendientes de grupo
    const [alumnosPendientes, setAlumnosPendientes] = useState([]);
    //estado para los alumnos que se va a asignar a un grupo y vienen del componente pendientes_grupo
    //const [alumnosAsignados, setAlumnosAsignados] = useState([]);
    //constante para enviar alumnosAsignados a accordion3
    const [alumnosAsignadosGrupos, setAlumnosAsignadosGrupos] = useState([]);

    const manejarDatosPendienteGrupo = (datos) => {
        //vaciar alumnosAsignados a grupos antes de agregar nuevos datos
        //setAlumnosAsignadosGrupos([]);
        //console.log('datosDESDEADMIN:', datos);
        //setAlumnosAsignados(datos);
        //set timer para que se ejecute despues de 1 segundo
        setTimeout(() => {
        setAlumnosAsignadosGrupos(datos);
        }, 3000);
        //limpiar despues de asignar alumnos a grupos
        //setAlumnosPendientes([]);
        //vacia el estado alumnosPendientes
    }

    

    //useEffect  cuando cambia el estado de alumnosAsignados y dar un console.log
    /**useEffect(() => {
        console.log('alumnosAsignadosXXXXQQQ:', alumnosAsignados);
        console.log('alumnosAsignadosGrupos:', alumnosAsignadosGrupos);
    }, [alumnosAsignados]);*/
    
    //traer datos de la base de datos cantidad de docentes
        
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
        //filtrar los docentes por rol y campo activo sea igual a false
 
        profileData = data.filter((alumno) => alumno.role === 'Alumno' && alumno.activo === false);
        //setAlumnos(profileData);
        setAlumnosInactivos(profileData);
        //console.log('AlumnossSSSSSSSSS:', profileData);
    }
    };
    
    useEffect(() => {
        
         fetchAlumnos();
       }, []);


       //funcion para activar alumnos
       const activarAlumnos = async (idsActivados) => {
        console.log('idsActivados:', idsActivados);
        setAlumnosPendientes(idsActivados);
        console.log('alumnosPendientes:', alumnosPendientes);
        let actualizados = false;
        for (const alumnoId of idsActivados) {
            const { data, error } = await supabase
                .from('profiles')
                .update({ activo: true })
                .eq('id', alumnoId);
        
            if (error) {
                console.error('Error al actualizar alumno:', alumnoId, error);
                return false; // Devuelve false si hay un error
            } else {
                actualizados = true;
                //agregar al array de alumnos activos y sin grupo en alumnos pendientes
            }
        }
        //pasar id de los alumnos activados a setAlumnosPendientes
        
        
        if (actualizados) {
            const nuevosAlumnosInactivos = alumnosInactivos.filter(
                alumno => !idsActivados.includes(alumno.id)
            );
            setAlumnosInactivos(nuevosAlumnosInactivos);
        }
        return actualizados; // Devuelve true si todos los alumnos se han actualizado correctamente
    };
    
    
    return (
    <>
      <div className="py-1 px-5 grid grid-cols-1 gap-x-2 gap-y-3 grid-flow-row-dense">
            
            {/**botones */}
            {/*div de los botones*/}
            <div className="rounded-lg min-h-[50px] row-span-2">
                <div className="p-1 text-center">
                    <button className=" px-5 sm:p-5 text-white bg-blue-700 hover:bg-blue-800 
                                        focus:outline-none font-medium text-sm rounded-lg py-2.5 text-center mr-5 ">
                        <label htmlFor="my_modal_20" className="">Nuevo Docente</label>
                    </button>
                    <button className=" px-5 sm:p-5 text-white bg-blue-700 hover:bg-blue-800 
                                        focus:outline-none font-medium text-sm rounded-lg py-2.5 text-center mr-5 ">
                        <label htmlFor="my_modal_7" className="">Nuevo Alumno</label>
                    </button>
                    <button className=" px-5 sm:p-5 text-white bg-blue-700 hover:bg-blue-800 
                                        focus:outline-none font-medium text-sm rounded-lg py-2.5 text-center mr-5 ">
                        <label htmlFor="my_modal_8" className="">Nueva Asignatura</label>
                    </button>
                    
                </div>    
            </div> 
            

            <div className="py-1 px-5 grid grid-cols-2   gap-y-3 grid-flow-row-dense ">
                <div className="bg-white rounded-lg shadow-xl min-h-[400px] row-span-5 ">
                    <Accordion3 nuevosAlumnos={alumnosAsignadosGrupos} fetchAlumnos2={fetchAlumnos}></Accordion3>
                </div>
                <div className="bg-white rounded-lg  min-h-[400px] row-span-5">
                    <div className=" px-5 grid grid-cols-1 gap-x-2 gap-y-3 grid-flow-row-dense">
                            <Accordion_docentes2></Accordion_docentes2>
                    </div>
                    <div className="py-1 px-5 grid grid-cols-2 gap-x-2 gap-y-3 grid-flow-row-dense">
                        <div className="bg-white shadow-xl rounded-lg  min-h-[400px] row-span-5">
                            <center>
                                
                                <h2 className='font-bold py-3'>Alumnos Pendientes {'  '}    
                                
                                    {/**
                                 * <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-300">12</span>
                                 */}
                                </h2>
                                
                                
                            </center>
                            <Pendientes_grupo onEnviarDatos={manejarDatosPendienteGrupo} alumnosPendientes={alumnosPendientes}/>
                        </div>
                        <div className="bg-white shadow-xl rounded-lg  min-h-[400px] row-span-5">
                            <center>
                                <h2 className='font-bold py-3'>Alumnos Inactivos {'  '}
                                {/**
                                 * <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-300">12</span>
                                 */}
                                </h2>
                            </center>
                            <Alumnos_pendientes alumnosInactivos={alumnosInactivos} onActivarAlumnos={activarAlumnos}></Alumnos_pendientes>
                        </div>
                    </div>
                    
                </div> 
            </div>
        </div>
      
      
  </>

)
}


