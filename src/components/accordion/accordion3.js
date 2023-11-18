'use client';
import Tabla_usuarios_grupos from '../tablas/tabla_usuarios_grupos'
import Criterios_evaluacion from '../forms/criterios_evaluacion'
import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useObtenerGradosYGrupos from '@/components/hooks/gradosygrupos';
export default function Accordion3({nuevosAlumnos}){
    const { gradosConGrupos, obtenerGradosYGrupos } = useObtenerGradosYGrupos();
    const supabase = createClientComponentClient();
    //constante para guardar los cambios de nuevosAlumnos
    
    useEffect(() => {
        //console cuando nuevosAlumnos cambia
        console.log('nuevosAlumnosDESDEACORDION:', nuevosAlumnos);
    }, [nuevosAlumnos]);
    

    useEffect(() => {
        obtenerGradosYGrupos();
        
    }, []);
    
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
                                    <p class="float-left font-bold text-xl">Tabla De Alumnos</p> 
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
                            <Tabla_usuarios_grupos nuevoUsuario={nuevosAlumnos} grupoId={grupo.id}></Tabla_usuarios_grupos>
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