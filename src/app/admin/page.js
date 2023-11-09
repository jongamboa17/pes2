
import 'flowbite';
import Navbar from '@/components/navbar';
import Accordion_docentes from '@/components/accordion/accordion_docentes';
import Accordion2 from '@/components/accordion/accordion2';
import Modal from "@/components/modals/modal_usuario"
import Nuevo_usuario from "@/components/forms/nuevo_usuario"
import Nueva_asignatura from "@/components/forms/nueva_asignatura"
import Alumnos_pendientes from '@/components/alumnos_pendientes';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function page() {
    const supabase = createServerComponentClient({ cookies });
    const {
        data: { user },
      } = await supabase.auth.getUser();
    
    //restringir acceso a la página si no es administrador
    let profile = null;
    if(user){
        // Obtiene los datos adicionales de la tabla 'profiles'
        let { data: profileData, error } = await supabase
        .from('profiles')
        .select('role') // selecciona todos los campos o especifica los que necesitas, por ejemplo: 'username, role'
        .eq('id',user.id) // asumiendo que 'id' es la clave extranjera que referencia a 'auth.users'
        .single();

        if (!error) {
            profile = profileData;
        } else {
            // Manejar el error, como mostrar un mensaje al usuario
            console.error('Error al obtener datos del perfil:', error);
        }

        if (profile.role === 'Docente') {
            redirect('/docentes');
        }else if(profile.role === 'Alumno'){
            redirect('/alumnos');
        } else{
        console.log(profile.role);
        }
    }

    //restringir acceso a la página si no hay usuario
    if(!user){
        redirect('/sign-in');
    }
    
  return (
    <>  
        <Navbar></Navbar>
        <div className="py-1 px-5 grid grid-cols-1 gap-x-2 gap-y-3 grid-flow-row-dense">
            
            {/**botones */}
            {/*div de los botones*/}
            <div className="rounded-lg min-h-[50px] row-span-2">
                <div className="p-1 text-center">
                    <button className=" px-5 sm:p-5 text-white bg-blue-700 hover:bg-blue-800 
                                        focus:outline-none font-medium text-sm rounded-lg py-2.5 text-center mr-5 ">
                        <label htmlFor="my_modal_7" className="">Nuevo Usuario</label>
                    </button>
                    <button className=" px-5 sm:p-5 text-white bg-blue-700 hover:bg-blue-800 
                                        focus:outline-none font-medium text-sm rounded-lg py-2.5 text-center mr-5 ">
                        <label htmlFor="my_modal_8" className="">Nueva Asignatura</label>
                    </button>
                    
                </div>    
            </div> 
            

            <div className="py-1 px-5 grid grid-cols-2  gap-x-2 gap-y-3 grid-flow-row-dense ">
                <div className="bg-white rounded-lg shadow-xl min-h-[400px] row-span-5"><Accordion2></Accordion2></div>
                <div className="bg-white rounded-lg shadow-xl min-h-[400px] row-span-5">
                    <div className=" px-5 grid grid-cols-1 gap-x-2 gap-y-3 grid-flow-row-dense">
                        <div className="bg-white shadow-xl rounded-lg  min-h-[100px] row-span-5">
                            
                            <Accordion_docentes ></Accordion_docentes>
                        </div>
                        
                    </div>
                    <div className="py-1 px-5 grid grid-cols-2 gap-x-2 gap-y-3 grid-flow-row-dense">
                        <div className="bg-white shadow-xl rounded-lg  min-h-[400px] row-span-5">
                            <center>
                                <h2 className='font-bold py-3'>Alumnos Pendientes {'  '}                                    
                                    <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-300">12</span>
                                </h2>
                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="w-[19px] h-[19px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.1" d="M9 1v16M1 9h16"/>
                                </svg>  
                                </button>
                            </center>

                            <Alumnos_pendientes></Alumnos_pendientes>
                        </div>
                        <div className="bg-white shadow-xl rounded-lg  min-h-[400px] row-span-5">
                            <center>
                                <h2 className='font-bold py-3'>Alumnos Inactivos {'  '}
                                <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-300">12</span>
                                
                                </h2>
                                
                                <button type="button" class=" text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg class="w-[19px] h-[19px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                    <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
                                </svg>
                                </button>
                            </center>
                            <Alumnos_pendientes></Alumnos_pendientes>
                        </div>
                    </div>
                    
                </div> 
            </div>
        </div>
        <div className="py-5 px-5 grid grid-cols-4 gap-x-2 gap-y-3 grid-flow-row-dense"> 
            <div class="bg-green-600 rounded-md flex flex-col items-center justify-center py-2">
                <dt class="mb-2 text-3xl text-white font-extrabold ">73</dt>
                <dd class="text-white dark:text-gray-400">Usuarios Activos</dd>
            </div>
            <div class="bg-red-600 rounded-md flex flex-col items-center justify-center py-2">
                <dt class="mb-2 text-3xl text-white font-extrabold ">20</dt>
                <dd class="text-white dark:text-gray-400">Usuarios Inactivos</dd>
            </div>
            <div class="bg-blue-700 rounded-md flex flex-col items-center justify-center py-2">
                <dt class="mb-2 text-3xl text-white font-extrabold ">20</dt>
                <dd class="text-white dark:text-gray-400">Docentes</dd>
            </div>
            <div class="bg-blue-700 rounded-md flex flex-col items-center justify-center py-2">
                <dt class="mb-2 text-3xl text-white font-extrabold ">15</dt>
                <dd class="text-white dark:text-gray-400">Asignaturas</dd>
            </div>
        </div>

        {/**Modal nuevo alumno*/}
        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <Nuevo_usuario></Nuevo_usuario>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
        </div>

        {/**Modal nuevo alumno*/}
        <input type="checkbox" id="my_modal_8" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <Nueva_asignatura></Nueva_asignatura>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_8">Close</label>
        </div>


        
       
    </>
  )
}