'use client';
import Tabla_usuarios_grupos from '../tablas/tabla_usuarios_grupos'
import Criterios_evaluacion from '../forms/criterios_evaluacion'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
export default function Accordion3(){
    const [gradosConGrupos, setGradosConGrupos] = useState([]);
    const supabase = createClientComponentClient();

    useEffect(() => {
        const obtenerGradosYGrupos = async () => {
            // Aquí va la lógica para obtener los grados y grupos de la base de datos
            let { data: gradosObtenidos, error: errorGrados } = await supabase
                .from('grados')
                .select('*');

            let { data: gruposObtenidos, error: errorGrupos } = await supabase
                .from('grupos')
                .select('*');

            if (!errorGrados && !errorGrupos) {
                const gradosYGrupos = gradosObtenidos.map(grado => ({
                    ...grado,
                    grupos: gruposObtenidos.filter(grupo => grupo.grado_id === grado.id)
                }));

                
                //setGradosConGrupos(gradosYGrupos);
                setGradosConGrupos(reordenarGrados(gradosYGrupos));
                //console.log('GRADOS Y GRUPOS',gradosYGrupos);
                //obtener id de primer grado y el nombre de los grupos
                //let idPrimerGrado = gradosYGrupos[0].id;
                //let nombreGrupos = gradosYGrupos[0].grupos.map(grupo => grupo.nombre);
                //console.log('ID PRIMER GRADO',idPrimerGrado);
                //console.log('NOMBRE GRUPOS',nombreGrupos);
            }
        };

        obtenerGradosYGrupos();
    }, []);

    const reordenarGrados = (grados) => {
        if (grados.length > 1) {
            // Extrae el segundo elemento
            const [primerGrado, segundoGrado, ...resto] = grados;
    
            // Reorganiza el arreglo colocando el segundo grado al principio
            const gradosReorganizados = [segundoGrado, primerGrado, ...resto];
    
            return gradosReorganizados;
        }
        return grados;
        };
    
    return(
      <>
        {gradosConGrupos.map((grado) => (
            <div className="collapse collapse-arrow bg-base-200 m-3 "  key={grado.id}>
                <input type="checkbox" id={`accordion-grado-${grado.id}`} className="peer hidden" />
                <label htmlFor={`accordion-grado-${grado.id}`} className="collapse-title text-2xl font-bold">
                {grado.nombre}{' '}Grado
                </label>
                <div className="collapse-content peer-checked:block hidden"> 
                    {/** */}
                    {/**map para   */}
                    {grado.grupos.map((grupo) => (
                    <div className="collapse collapse-arrow bg-white mb-2" key={grupo.id}>
                        <input type="checkbox" id={`accordion-grupo-${grupo.id}`} className="peer hidden" />
                        <label htmlFor={`accordion-grupo-${grupo.id}`} className="collapse-title text-xl font-bold">
                        Grupo{' '}{grupo.nombre}
                        </label>
                        <div className="collapse-content peer-checked:block hidden"> 
                            <div class="flow-root py-2">  
                            
                                <div class="flow-root">  
                                    <p class="float-left font-bold ">Tabla Alumnos</p> 
                                    <p class="float-right">
                                        <button type="button"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            
                                            <label htmlFor="my_modal_12" className="">Criterios Evaluación</label>
                                        </button>
                                        {/**<button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <label htmlFor="my_modal_12" className="">Agregar Alumnos</label>
                                        </button>
                                        */}
                                        
                                    </p>
                                </div>
                                
                            </div>
                            <Tabla_usuarios_grupos grupoId={grupo.id}></Tabla_usuarios_grupos>
                        </div>
                    </div>
                    ))}
                    {/** */}
                </div>
                <input type="checkbox" id="my_modal_12" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <Criterios_evaluacion></Criterios_evaluacion>
                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_12">Close</label>
                </div>
            </div>
                        
        ))}
      
        

       
        
      </>

    )
}