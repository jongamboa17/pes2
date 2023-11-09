import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import SignUp from 'src/components/Auth/SignUp';

export default async function SignUpPage() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  

  
  if (data?.session) {
    redirect('/');
  } 
  
  

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 shrink-0 flex-col items-center justify-center px-8 text-center sm:px-20"> 
        <SignUp />
      </main>
    </div>

  );
  
}
