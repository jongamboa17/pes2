import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import SignOut from 'src/components/SignOut';

export default async function Profile() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="card">
      <h2>Perfíl</h2>
      <code className="highlight">{user.email}</code>
      <div className="heading">Ultima sesión</div>
      <code className="highlight">{new Date(user.last_sign_in_at).toUTCString()}</code>
      <Link className="button" href="/">
        Ir al Inicio
      </Link>
      <SignOut />
    </div>
  );
}
