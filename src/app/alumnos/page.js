//import 'flowbite';
import Navbar from "@/components/navbar";
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { useRouter,redirect } from 'next/navigation';
//import Accordion2 from '@/components/accordion/accordion2';
//import Accordion_calificaciones_alumno from '@/components/accordion/accordion_calificaciones_alumno';
import Accordion_calificaciones_alumno from '@/components/accordion/accordion_calificaciones_alumno2';


export default async function Home() {
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
        }else if(profile.role === 'Administrador'){
            redirect('/admin');
        } else{
        console.log(profile.role);
        }
    }

    //
    if(!user){
        redirect('/sign-in');
    }
  return (
    <>
      <Navbar></Navbar>
      <div className='py-4 px-4 mr-4'>
        <Accordion_calificaciones_alumno userId={user ? user.id : null}/>
      </div>
    </>
  )
}