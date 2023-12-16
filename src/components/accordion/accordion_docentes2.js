'use client'
import { useEffect, useState } from 'react';
import Tabla_docentes from '../tablas/tabla_docentes';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
export default function Accordion_docentes2() {
    const [docentes, setDocentes] = useState([]);
   useEffect(() => {
    //traer datos de la base de datos cantidad de docentes
    const supabase = createClientComponentClient();
    let profileData = [];
    const fetchDocentes = async () => {
    const { data, error } = await supabase
        .from('profiles') // Reemplazar 'docentes' con el nombre real de tu tabla
        .select('*'); // Ajustar para seleccionar solo los campos necesarios

    if (error) {
        console.error('Error al obtener datos de docentes:', error);
    } else {
        console.log('Docentes:', data);
        //profileData = data;
        //filtrar los docentes por rol
        profileData = data.filter((docente) => docente.role === 'Docente');
        setDocentes(profileData);
    }
    };
    fetchDocentes();
   }, []);

   //actualizar datos de docentes
   const actualizarDocentes = (docentesActualizados) => {
    setDocentes(docentesActualizados);
  };

  const actualizarDocentes2 = (docentesActualizados) => {
    setDocentes(prevDocentes =>
      prevDocentes.map(doc => 
          doc.id === docentesActualizados.id ? { ...doc, ...docentesActualizados } : doc
      )
  );
  };
    
  
  return (
    <>     
        
        <div>
        <div className="collapse collapse-arrow bg-base-200 m-3 ">
        <input type="checkbox" id="accordion-item-12" className="peer hidden" />
            <label htmlFor="accordion-item-12" className="collapse-title text-2xl  font-bold ">
            Docentes
            </label>
            <div className="collapse-content peer-checked:block hidden"> 
                {/** */}
                <Tabla_docentes docentes={docentes} onActualizarDocentes={actualizarDocentes} onActualizarDocentes2={actualizarDocentes2}></Tabla_docentes>
                
                {/** */}
            </div>
        </div>
            

      </div>
    </>
  )
}