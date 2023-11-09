'use client';

import React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SignOut() {
  const supabase = createClientComponentClient();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      // eslint-disable-next-line no-console
      console.error('ERROR:', error);
    }
  }

  return (
    <div className='px-2'>
    <button type="button" 
            class=" text-white  hover:bg-green-600 focus:ring-4 
                    focus:outline-none focus:ring-blue-300 font-medium 
                    rounded-full text-sm p-2.5 text-center inline-flex 
                    items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                    dark:focus:ring-blue-800 "
                    onClick={handleSignOut}
    >
    <svg class="w-[22px] h-[22px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.9" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
    </svg>
    <span class="sr-only">Icon description</span>
  </button>
  </div>
  );
}

