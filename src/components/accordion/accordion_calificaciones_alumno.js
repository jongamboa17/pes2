'use client';
import 'flowbite-react'
import 'flowbite'
import Tabla_alumnos_calificaciones_alumnos from '../tablas/tabla_alumnos_calificaciones_alumnos'
import Criterios_evaluacion from '../forms/criterios_evaluacion'

import Modal from "@/components/modal_usuario";
import { useState, useEffect } from 'react'
export default function Accordion_calificaciones_alumno(){
  const[showModal3, setShowModal3]=useState(false);

  useEffect(() => {
    // Cerrar todos los acordeones al inicio
    const accordionButtons = document.querySelectorAll("[data-accordion-target]");
    accordionButtons.forEach((button) => {
      const targetId = button.getAttribute("data-accordion-target");
      const targetPanel = document.querySelector(targetId);
      if (targetPanel) {
        targetPanel.classList.add("hidden");
        button.setAttribute("aria-expanded", "false");
      }
    });
  }, []);
    return(
      <>
        
        <div id="accordion-collapse-24" data-accordion="collapse">
          <h2 id="accordion-collapse-heading-24">
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-24" aria-expanded="true" aria-controls="accordion-collapse-body-24">
              <span>2023</span>
              <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
              </svg>
            </button>
          </h2>
          <div id="accordion-collapse-body-24" class="hidden" aria-labelledby="accordion-collapse-heading-1">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              
              {/** <!-- Nested accordion -->*/}
              <div id="accordion-nested-collapse" data-accordion="collapse">
                <h2 id="accordion-nested-collapse-heading-1">
                  <button type="button" class="flex items-center justify-between w-full p-5 rounded-t-xl font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-nested-collapse-body-24" aria-expanded="false" aria-controls="accordion-nested-collapse-body-24">
                    <span>Primer Periodo</span>
                        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                        </svg>
                  </button>
                </h2>
                <div id="accordion-nested-collapse-body-24" class="hidden" aria-labelledby="accordion-nested-collapse-heading-1">
                  <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                    {/**botones de agregar y editar */}
                        <div class="flow-root py-2">  
                            <center>
                                <p class=" font-bold text-xl">Calificaciones</p> 
                            </center>
                            
                        </div>
                    <Tabla_alumnos_calificaciones_alumnos></Tabla_alumnos_calificaciones_alumnos>
                  </div>					
                </div>
                
                
              </div>
              {/*<!-- End: Nested accordion -->*/}
            </div>
          </div>
          
          {/**--2-- */}
          
        </div>


        <Modal isVisible={showModal3} onClose={()=>setShowModal3(false)}>
            <Criterios_evaluacion></Criterios_evaluacion>
        </Modal>
      </>

    )
}