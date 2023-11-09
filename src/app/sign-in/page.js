import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SignIn from 'src/components/Auth/SignIn';

export default async function SignInPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  
  
  if (data?.session) {
    // Obtener el rol del usuario de la tabla 'profiles'
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.session.user.id) // Asegúrate de que 'id' es la clave primaria y coincide con el id de 'auth.users'
      .single();

    if (profileError) {
      // Manejar el error, por ejemplo, registrándolo o mostrando un mensaje
      console.error('Error al obtener el perfil:', profileError);
      return redirect('/error');
    }

    if (profileData) {
      // Redirigir basado en el rol
      if (profileData.role === 'Alumno') {
        return redirect('/alumnos');
      }else if (profileData.role === 'Docente'){
        return redirect('/docentes');
      }else if(profileData.role === 'Administrador'){
        return redirect('/admin');
      }else{
        return redirect('/error');
      }
    }
    
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 shrink-0 flex-col items-center justify-center px-8 text-center sm:px-20"> 
        <SignIn />
      </main>
      
    </div>
    



  );
}
