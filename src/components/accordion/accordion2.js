'use client';
import 'flowbite-react'
import 'flowbite'
import Tabla_usuarios_grupos from '../tablas/tabla_usuarios_grupos'
import Criterios_evaluacion from '../forms/criterios_evaluacion'
import Modal from "../modal_usuario"
import { useState, useEffect } from 'react'
export default function Accordion2(){
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

        <div id="accordion-collapse" data-accordion="collapse">
          <h2 id="accordion-collapse-heading-1">
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
              <span>Primer Grado</span>
              <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
              </svg>
            </button>
          </h2>
          <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              
              {/** <!-- Nested accordion -->*/}
              <div id="accordion-nested-collapse" data-accordion="collapse">
                <h2 id="accordion-nested-collapse-heading-1">
                  <button type="button" class="flex items-center justify-between w-full p-5 rounded-t-xl font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-nested-collapse-body-1" aria-expanded="false" aria-controls="accordion-nested-collapse-body-1">
                    <span>Primer Grado-A</span>
                        <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                        </svg>
                  </button>
                </h2>
                <div id="accordion-nested-collapse-body-1" class="hidden" aria-labelledby="accordion-nested-collapse-heading-1">
                  <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                    {/**botones de agregar y editar */}
                    <center className='py-3'>
                        
                        <button type="button" class=" text-white bg-green-600 hover:bg-blue-800 
                                                      focus:ring-4 focus:outline-none focus:ring-blue-300  
                                                      font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                                      inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                                                      dark:focus:ring-blue-800" onClick={()=>setShowModal3(true)}> 
                            Editar Criterios Evaluación
                        </button>
                        {/**<button type="button" class="text-white bg-green-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
                            Transferir De Grupo
                        </button> */}
                    </center>
                  <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
                  </div>					
                </div>
                <h2 id="accordion-nested-collapse-heading-2">
                  <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-nested-collapse-body-2" aria-expanded="false" aria-controls="accordion-nested-collapse-body-2">
                    <span>Primer Grado-B</span>
                    <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-nested-collapse-body-2" class="hidden" aria-labelledby="accordion-nested-collapse-heading-2">
                  <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                  <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
                  </div>
                </div>
                
              </div>
              {/*<!-- End: Nested accordion -->*/}
            </div>
          </div>
          
          {/**--2-- */}
          <h2 id="accordion-collapse-heading-2">
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-2" aria-expanded="true" aria-controls="accordion-collapse-body-2">
              <span>Segundo Grado</span>
              <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
              </svg>
            </button>
          </h2>
          <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
              
              {/** <!-- Nested accordion -->*/}
              <div id="accordion-nested-collapse" data-accordion="collapse">
                <h2 id="accordion-nested-collapse-heading-3">
                  <button type="button" class="flex items-center justify-between w-full p-5 rounded-t-xl font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-nested-collapse-body-3" aria-expanded="false" aria-controls="accordion-nested-collapse-body-3">
                    <span>Segundo Grado-A</span>
                  <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-nested-collapse-body-3" class="hidden" aria-labelledby="accordion-nested-collapse-heading-3">
                  <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                  <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
                  </div>
                </div>
                <h2 id="accordion-nested-collapse-heading-4">
                  <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-nested-collapse-body-4" aria-expanded="false" aria-controls="accordion-nested-collapse-body-4">
                    <span>Segundo Grado-B</span>
                    <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                    </svg>
                  </button>
                </h2>
                <div id="accordion-nested-collapse-body-4" class="hidden" aria-labelledby="accordion-nested-collapse-heading-2">
                  <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                  <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
                  </div>
                </div>
                
              </div>
              {/*<!-- End: Nested accordion -->*/}
            </div>
          </div>
        </div>


        <Modal isVisible={showModal3} onClose={()=>setShowModal3(false)}>
            <Criterios_evaluacion></Criterios_evaluacion>
        </Modal>
      </>

    )
}