import 'flowbite';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import SignOut from '@/components/SignOut';
import { data } from 'autoprefixer';
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
        
            <nav class="bg-green-500 border-gray-200 dark:bg-gray-900">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    
                    <div class="flex items-center md:order-2 px-10">
                        <h3 class="font-semibold text-1xl px-5"><span className='px-1'>{profile.role}:</span>{profile.name} </h3>
                        <button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span class="sr-only">Open user menu</span>
                            <img width="10px" class="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="user photo"/>
                        </button>
                        {/** <!-- Dropdown menu -->*/}
                        <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <div class="px-4 py-3">
                            <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                            <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{authData.user.email}</span>
                            </div>
                            <ul class="py-2" aria-labelledby="user-menu-button">
                           
                            
                            <li>
                                {/** <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cerrar Sesión</a>*/}
                                
                            </li>
                            </ul>
                        </div>
                        <SignOut/>
                        <button data-collapse-toggle="navbar-user" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span class="sr-only">Open main menu</span>
                            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                    <div class="" id="navbar-user">
                            <h1 class=" text-2xl font-semibold block py-2 pl-3 pr-4 text-white rounded  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Eco Centro Educativo Braulio C.</h1>
                    </div>
                </div>
            </nav>
        </>
    );
}