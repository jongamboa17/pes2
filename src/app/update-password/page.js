import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import UpdatePassword from 'src/components/Auth/UpdatePassword';

export default async function UpdatePasswordPage() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
          <main className="flex w-full flex-1 shrink-0 flex-col items-center justify-center px-8 text-center sm:px-20">
            
          <UpdatePassword />
          </main>
        </div>
  );
}
