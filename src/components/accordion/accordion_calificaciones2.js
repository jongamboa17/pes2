'use client';
import useObtenerGradosYGrupos from '@/components/hooks/gradosygrupos';
import { useState, useEffect } from 'react'
import Tabla_alumnos_calificaciones from '@/components/tablas/tabla_alumnos_calificaciones'
export default function page (userId) {
    
    const userId2 = userId;
    //console.log('USERRRR123:', userId2);
    const { gradosConGrupos, obtenerGradosYGrupos } = useObtenerGradosYGrupos();
    useEffect(() => {
        obtenerGradosYGrupos();
        console.log('gradosConGruposFROM ACCORDION CALIFICACIONES:', gradosConGrupos);
    }, []);

    
   
    
    return (
      <div>
        
        {gradosConGrupos.map((grado) => (

        <div className="collapse collapse-arrow bg-base-200 m-3 " key={grado.id}>
            
        <input type="checkbox" id={`accordion-grado-${grado.id}`} className="peer hidden" />
            <label htmlFor={`accordion-grado-${grado.id}`} className="collapse-title text-2xl font-medium">
            {grado.nombre}{' '}Grado
            </label>
            <div className="collapse-content peer-checked:block hidden"> 
                {/** */}
                {grado.grupos.map((grupo) => (
                <div className="collapse collapse-arrow bg-white mb-2" key={grupo.id}>
                    <input type="checkbox" id={`accordion-grupo-${grupo.id}`} className="peer hidden" />
                    <label htmlFor={`accordion-grupo-${grupo.id}`} className="collapse-title text-xl font-medium">
                    Grupo{' '}{grupo.nombre}
                    </label>
                    <div className="collapse-content peer-checked:block hidden"> 
                        
                        <Tabla_alumnos_calificaciones userId={userId2}/>
                    </div>
                </div>
                ))}
                {/** */}
            </div>
        </div>
        ))}

      </div>
    );
  
}
