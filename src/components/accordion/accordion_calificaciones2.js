'use client';
import useObtenerGradosYGrupos from '@/components/hooks/gradosygrupos';
import { useState, useEffect } from 'react'
import Tabla_alumnos_calificaciones from '@/components/tablas/tabla_alumnos_calificaciones'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
export default function page ({ userId }) {
    const supabase = createClientComponentClient();
    const [periodos, setPeriodos] = useState([]);
    const [asignaturas, setAsignaturas] = useState([]);
    const [asignaturaFiltrada, setAsignaturaFiltrada] = useState([]);
    //const userId2 = userId;
    //console.log('USERRRR123:', userId2);
    const { gradosConGrupos, obtenerGradosYGrupos } = useObtenerGradosYGrupos();

    //get periodos de la base de datos
    const fetchPeriodos = async () => { 
        const { data } = await supabase.from('periodos').select('*');
        if (data) {
            setPeriodos(data);
        }
    }

    const fetchAsignaturas = async () => {
        const { data } = await supabase.from('asignaturas').select('*');
        if (data) {
            //console.log('Asignaturas:', data);
            // para guardar el registro en donde docente_id = userId
            const asignaturasDocente = data.filter(asignatura => asignatura.docente_id === userId);
            setAsignaturaFiltrada(asignaturasDocente[0]);

            setAsignaturas(data);
        }else {
            console.log('No hay datos en asignaturas');
        }
    }

    

    useEffect(() => {
        fetchPeriodos();
        obtenerGradosYGrupos();
        fetchAsignaturas();
        
        //console.log('gradosConGruposFROM ACCORDION CALIFICACIONES:', gradosConGrupos);
    }, []);

    
   
    
    return (
      <div>
         {asignaturaFiltrada?

             gradosConGrupos.map((grado) => (
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
                                <Tabla_alumnos_calificaciones grupoId= {grupo.id} userId={ userId } periodos={periodos} asignaturas={asignaturas}/>
                            </div>

                        </div>
                        ))}
                        {/** */}
                    </div>
                </div>
                ))


         :(
            <center>

            <div className="alert alert-warning w-[300px]">No tienes una asignatura en este momento. Por favor contacta a la administración.</div>
            </center>
            )}
        {/**if para desplegar mensaje en lugar de los accordiones si asignaturaFiltrada es igual a null */}

        
       

      </div>
    );
  
}
