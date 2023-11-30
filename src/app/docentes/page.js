import 'flowbite';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SignOut from 'src/components/SignOut';
import { useRouter,redirect } from 'next/navigation';
import Navbar from "@/components/navbar";
import Accordion_calificaciones from '@/components/accordion/accordion_calificaciones';
import Accordion_calificaciones2 from '@/components/accordion/accordion_calificaciones2';
import StatsDocente from '../../components/statsDocente';
export default async function Home() {
    const supabase = createServerComponentClient({ cookies });
    
    const {
        data: { user },
      } = await supabase.auth.getUser();
      
    
    
    //console.log('USERID:',userId);
    
    //console.log('USERIDDOCENTE:',user.id);
    //restringir acceso a la página si no es administrador
    let profile = null;
    let isSuspended = false;
    if(user){
        // Obtiene los datos adicionales de la tabla 'profiles'
        let { data: profileData, error } = await supabase
        .from('profiles')
        .select('role, activo') // selecciona todos los campos o especifica los que necesitas, por ejemplo: 'username, role'
        .eq('id',user.id) // asumiendo que 'id' es la clave extranjera que referencia a 'auth.users'
        .single();

       
        

        
        if (!error) {
            profile = profileData;
            // Verifica si el campo 'activo' es false
            isSuspended = profile.activo === false;
            //if (profile.activo === false) {
              //  return <div>Tu usuario se encuentra suspendido, por favor contacta al centro educativo</div>;
           // }
            
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
    


    

    if (isSuspended) {
        return(
            <>
            <Navbar/>
            <center>
            <div className="alert alert-warning w-[300px] md:w-[600px] mt-8">Tu cuenta se encuentra suspendida por el momento. Por favor contacta al centro educativo.</div>
            </center>
            </>
        ); 
    } else {
        return (
            <>
                <Navbar/>
                <div className='py-4 px-4 mr-4'>
                    <Accordion_calificaciones2 userId={user ? user.id : null} />
                </div>
                <StatsDocente userId={user ? user.id : null}/>
            </>
        );
    }
}


