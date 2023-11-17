
import 'flowbite';
import Navbar from '@/components/navbar';
import SignUp from 'src/components/Auth/SignUp';

import Nuevo_usuario from "@/components/forms/nuevo_usuario"
import Nuevo_docente from '@/components/forms/nuevo_docente';
import Nueva_asignatura from "@/components/forms/nueva_asignatura"

import AdminParent from '@/components/adminParent';
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
    let profile2 = [];
    let dataAsignaturas = [];
    let activeUsers = 0;
    let inactiveUsers = 0;
    let numeroDocentes = 0;
    if(user){
        // Obtiene los datos adicionales de la tabla 'profiles'
        let { data: profileData, error } = await supabase
        .from('profiles')
        .select('role') // selecciona todos los campos o especifica los que necesitas, por ejemplo: 'username, role'
        .eq('id',user.id) // asumiendo que 'id' es la clave extranjera que referencia a 'auth.users'
        .single();

        if (!error) {
            profile = profileData;
            
            // Obtiene todos los datos de la tabla 'profiles' *****Inicio****
            let { data: profileData2, error2 } = await supabase
                .from('profiles')
                .select('*');
            
                let { data: asignaturaData, error3 } = await supabase
                .from('asignaturas')
                .select('*');

            if (!error2) {
                profile2 = profileData2;
                //contar usuarios activos
                activeUsers = profile2.filter((user) => user.activo === true);
                activeUsers = activeUsers.length;
                //contar usuarios inactivos
                inactiveUsers = profile2.filter((user) => user.activo === false);
                inactiveUsers = inactiveUsers.length;
                //contar usuarios con rol docente
                numeroDocentes = profile2.filter((user) => user.role === 'Docente');
                numeroDocentes = numeroDocentes.length;
            // Obtiene todos los datos de la tabla 'profiles' *****Final****
            }

            if (!error3) {
                dataAsignaturas = asignaturaData;
                
            }


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

       
        {/**------------------ */}
        <AdminParent/>
        
        <div className="py-5 px-5 grid grid-cols-4 gap-x-2 gap-y-3 grid-flow-row-dense"> 
            <div class="bg-green-600 rounded-md flex flex-col items-center justify-center py-2">
                <dt class="mb-2 text-3xl text-white font-extrabold ">{activeUsers}</dt>
                <dd class="text-white dark:text-gray-400">Usuarios Activos</dd>
            </div>
            <div class="bg-red-600 rounded-md flex flex-col items-center justify-center py-2">
                <dt class="mb-2 text-3xl text-white font-extrabold ">{inactiveUsers}</dt>
                <dd class="text-white dark:text-gray-400">Usuarios Inactivos</dd>
            </div>
            <div class="bg-blue-700 rounded-md flex flex-col items-center justify-center py-2">
                <dt class="mb-2 text-3xl text-white font-extrabold ">{numeroDocentes}</dt>
                <dd class="text-white dark:text-gray-400">Docentes</dd>
            </div>
            <div class="bg-blue-700 rounded-md flex flex-col items-center justify-center py-2">
                <dt class="mb-2 text-3xl text-white font-extrabold ">{dataAsignaturas.length}</dt>
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

        {/**Modal nuevo docente*/}
        <input type="checkbox" id="my_modal_20" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <Nuevo_docente></Nuevo_docente>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_20">Close</label>
        </div>

        {/**Modal nueva asignatura*/}
        <input type="checkbox" id="my_modal_8" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <Nueva_asignatura modalId="my_modal_8"></Nueva_asignatura>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_8">Close</label>
        </div>

    </>
  )
}








