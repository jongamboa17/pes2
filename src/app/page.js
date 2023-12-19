import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import SignOut from 'src/components/SignOut';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }else{
    //
    let { data: profileData, error } = await supabase
        .from('profiles')
        .select('role') // selecciona todos los campos o especifica los que necesitas, por ejemplo: 'username, role'
        .eq('id',user.id) // asumiendo que 'id' es la clave extranjera que referencia a 'auth.users'
        .single();

      if (profileData.role === 'Docente') {
          redirect('/docentes');
      }else if(profileData.role === 'Alumno'){
          redirect('/alumnos');
      } else{
        redirect('/admin');
      //console.log(profile.role);
      }
    //
  }

  return (
    <div className="card">
      <h2>Bienvenido</h2>
      <code className="highlight">{user.role}</code>
      <Link className="button" href="/profile">
        Ir a página de inicio
      </Link>
      <SignOut />
    </div>
  );
}
