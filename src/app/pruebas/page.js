'use client';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
export default function Criterios_evaluacion() {
    const supabase = createClientComponentClient();
    const [notes, setNotes] = useState(null);
    const [newCriteria, setNewCriteria] = useState('');

    const fetchNotes = async () => {
        const { data } = await supabase.from('criterios_evaluacion').select('*');
    
        if (data) {
          setNotes(data);
        }
      }

      const addNotes = async () => {
        await supabase
          .from('criterios_evaluacion')
          .insert([
            { name: newCriteria },
          ]);
    
        await fetchNotes();
        setNewCriteria('');
      }
      useEffect(() => {
        
        fetchNotes();
        /** 
        supabase
          .channel('table-db-changes')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'notes',
            },
            (payload) => {
              fetchNotes();
            }
          )
          .subscribe()
          */
      }, [])
        
        
    return (
        <>
            <div>
       <div>
        My Notes:
        {notes && (
          <div>
            {notes.map(notes => (
              <div>
                {notes.name}
              </div>
            ))}
          </div>
        )}
        <div>
          <br />
          <br />

          <input placeholder='Add Note' value={newCriteria} onChange={(e) => {
            setNewCriteria(e.target.value);
          }} />

          <button onClick={addNotes}> Save Note </button>
        </div>

        <br />
     
      </div> 

      

    </div>
           
            
            

        </>
    )
}