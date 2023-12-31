import 'flowbite';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SignOut from '@/components/SignOut';
import { data } from 'autoprefixer';
import Image from 'next/image'
import logo2 from '@/utilities/logo1.png'
export default async function Navbar() {
    const supabase = createServerComponentClient({ cookies });
    const { data: authData } = await supabase.auth.getUser();
    
    let profile = {};

    if(authData.user){
        // Obtiene los datos adicionales de la tabla 'profiles'
        let { data: profileData, error } = await supabase
        .from('profiles')
        .select('*') // selecciona todos los campos o especifica los que necesitas, por ejemplo: 'username, role'
        .eq('id',authData.user.id) // asumiendo que 'id' es la clave extranjera que referencia a 'auth.users'
        .single();

        if (!error) {
            profile = profileData;
        } else {
            // Manejar el error, como mostrar un mensaje al usuario
            console.error('Error al obtener datos del perfil:', error);
        }
    }
   
    return(
        <>

            <div className="navbar bg-green-500 ">
                
                <div className="flex-1 pl-10">
                <h1 class="hidden md:block text-2xl font-semibold  py-2 pl-3 pr-4 text-white rounded  md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Eco Centro Educativo Braulio C.</h1>
                <Image class="w-10 h-10 mr-2 rounded-full md:hidden"  src={logo2} alt=""/>
                </div>
                <h3 class="font-semibold text-white text-1xl px-5 pr-5  block">
                    <span className=''>{profile.name} {' '}{profile.lastname}</span>
                </h3>
                <div className="flex-none">
                    <SignOut/>
                </div>
            </div>
        </>
    );
}

