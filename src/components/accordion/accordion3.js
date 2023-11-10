'use client';
import Tabla_usuarios_grupos from '../tablas/tabla_usuarios_grupos'
import Criterios_evaluacion from '../forms/criterios_evaluacion'
import Modal from "../modal_usuario"
import { useState, useEffect } from 'react'
export default function Accordion2(){
  const[showModal3, setShowModal3]=useState(false);

 
    return(
      <>
        <div className="collapse collapse-arrow bg-base-200 m-3 ">
            <input type="checkbox" id="accordion-item-18" className="peer hidden" />
            <label htmlFor="accordion-item-18" className="collapse-title text-2xl font-bold">
            Primer Grado 
            </label>
            <div className="collapse-content peer-checked:block hidden"> 
                {/** */}
                <div className="collapse collapse-arrow bg-white mb-2">
                    <input type="checkbox" id="accordion-item-1" className="peer hidden" />
                    <label htmlFor="accordion-item-1" className="collapse-title text-xl font-bold">
                    Primer Grado A
                    </label>
                    <div className="collapse-content peer-checked:block hidden"> 
                        <div class="flow-root py-2">  
                           
                            <div class="flow-root">  
                                <p class="float-left font-bold ">Tabla Alumnos</p> 
                                <p class="float-right">
                                    <button type="button"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        
                                        <label htmlFor="my_modal_12" className="">Criterios Evaluación</label>
                                    </button>
                                    <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <label htmlFor="my_modal_12" className="">Agregar Alumnos</label>
                                    </button>
                                    
                                </p>
                            </div>
                            
                        </div>
                        <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-white mb-2">
                    <input type="checkbox" id="accordion-item-2" className="peer hidden" />
                    <label htmlFor="accordion-item-2" className="collapse-title text-xl font-medium">
                        Primer Grado B
                    </label>
                    <div className="collapse-content peer-checked:block hidden"> 
                    <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-white mb-2">
                    <input type="checkbox" id="accordion-item-3" className="peer hidden" />
                    <label htmlFor="accordion-item-3" className="collapse-title text-xl font-medium">
                        Primer Grado C
                    </label>
                    <div className="collapse-content peer-checked:block hidden"> 
                    <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
                    </div>
                </div>
                {/** */}
            </div>
        </div>

        <input type="checkbox" id="my_modal_12" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <Criterios_evaluacion></Criterios_evaluacion>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_12">Close</label>
        </div>
        
      </>

    )
}