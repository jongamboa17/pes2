import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import AuthProvider from 'src/components/AuthProvider';

import 'src/styles/globals.css';

// do not cache this layout
export const revalidate = 0;
export const metadata = {
  title: 'Eco Centro Educativo Braulio C.',
  description: '',
}

export default async function RootLayout({ children }) {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  const accessToken = session?.access_token || null;

  return (
    <html lang="en">
      <body>
        <div className="">
          <main className="">
            
            <AuthProvider accessToken={accessToken}>{children}</AuthProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
