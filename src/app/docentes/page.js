import 'flowbite';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SignOut from 'src/components/SignOut';
import { useRouter,redirect } from 'next/navigation';
import Navbar from "@/components/navbar";
import Accordion_calificaciones from '@/components/accordion/accordion_calificaciones';
import Accordion_calificaciones2 from '@/components/accordion/accordion_calificaciones2';

export default async function Home() {
    const supabase = createServerComponentClient({ cookies });
    
    const {
        data: { user },
      } = await supabase.auth.getUser();
      
    
    
    //console.log('USERID:',userId);
    
    //console.log('USERIDDOCENTE:',user.id);
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

        if (profile.role === 'Alumno') {
            redirect('/alumnos');
        }else if(profile.role === 'Administrador'){
            redirect('/admin');
        } else{
        console.log(profile.role);
        }
    }

  

    //restringir acceso a la página si no ha iniciado sesión
    if(!user){
        redirect('/sign-in');
        //limpiar constante userId
        
    } 
    
    return (
        
           
            <>
            
            <Navbar/>
            
            <div className='py-4 px-4 mr-4'>
                {/**enviar user.id en el componente hijo */}
                <Accordion_calificaciones2 userId={user ? user.id : null} />
            </div>
            
            </>

    );
}


