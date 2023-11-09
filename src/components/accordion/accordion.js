'use client'
import 'flowbite';
import { useEffect } from 'react';
import Tabla_usuarios_grupos from '../tablas/tabla_usuarios_grupos';
export default function Accordion() {
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
  return (
    <>     
        
        <div id="accordion-collapse" data-accordion="collapse" className='bg-white'>
            <center><h2 className='font-bold py-3'>Grupos</h2></center>
            
        <h2 id="accordion-collapse-heading-1" className='bg-white'>
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
            <span className='px-7'>Primer Grado-A</span>
            {/*<svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
            </svg>* */}
            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">12 Alumnos</span>
            </button>
        </h2>
        <div id="accordion-collapse-body-1" class="hidden" aria-labelledby="accordion-collapse-heading-1">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
            </div>
        </div>
        <h2 id="accordion-collapse-heading-2" className='bg-white'>
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
            <span className='px-7'>Primer Grado-B</span>
            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">12 Alumnos</span>
            </button>
        </h2>
        <div id="accordion-collapse-body-2" class="hidden" aria-labelledby="accordion-collapse-heading-2">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
            </div>
        </div>
        <h2 id="accordion-collapse-heading-3" className='bg-white'>
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
            <span className='px-7'>Segundo Grado-A</span>
            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">12 Alumnos</span>
            </button>
        </h2>
        <div id="accordion-collapse-body-3" class="hidden" aria-labelledby="accordion-collapse-heading-2">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
            </div>
        </div>
        <h2 id="accordion-collapse-heading-4" className='bg-white'>
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-4" aria-expanded="false" aria-controls="accordion-collapse-body-4">
            <span className='px-7'>Segundo Grado-B</span>
            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">12 Alumnos</span>
            </button>
        </h2>
        <div id="accordion-collapse-body-4" class="hidden" aria-labelledby="accordion-collapse-heading-2">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
            </div>
        </div>
        <h2 id="accordion-collapse-heading-5" className='bg-white'>
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-5" aria-expanded="false" aria-controls="accordion-collapse-body-5">
            <span className='px-7'>Tercer Grado-A</span>
            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">12 Alumnos</span>
            </button>
        </h2>
        <div id="accordion-collapse-body-5" class="hidden" aria-labelledby="accordion-collapse-heading-2">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
            </div>
        </div>
        <h2 id="accordion-collapse-heading-6" className='bg-white'>
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-6" aria-expanded="false" aria-controls="accordion-collapse-body-6">
            <span className='px-7'>Tercer Grado-B</span>
            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">12 Alumnos</span>
            </button>
        </h2>
        <div id="accordion-collapse-body-6" class="hidden" aria-labelledby="accordion-collapse-heading-2">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
            </div>
        </div>
        <h2 id="accordion-collapse-heading-6" className='bg-white'>
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-6" aria-expanded="false" aria-controls="accordion-collapse-body-6">
            <span className='px-7'>Tercer Grado-B</span>
            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">12 Alumnos</span>
            </button>
        </h2>
        <div id="accordion-collapse-body-6" class="hidden" aria-labelledby="accordion-collapse-heading-2">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
            </div>
        </div>
        <h2 id="accordion-collapse-heading-6" className='bg-white'>
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-6" aria-expanded="false" aria-controls="accordion-collapse-body-6">
            <span className='px-7'>Tercer Grado-B</span>
            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">12 Alumnos</span>
            </button>
        </h2>
        <div id="accordion-collapse-body-6" class="hidden" aria-labelledby="accordion-collapse-heading-2">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
            </div>
        </div>
        <h2 id="accordion-collapse-heading-6" className='bg-white'>
            <button type="button" class="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800" data-accordion-target="#accordion-collapse-body-6" aria-expanded="false" aria-controls="accordion-collapse-body-6">
            <span className='px-7'>Tercer Grado-B</span>
            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">12 Alumnos</span>
            </button>
        </h2>
        <div id="accordion-collapse-body-6" class="hidden" aria-labelledby="accordion-collapse-heading-2">
            <div class="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <Tabla_usuarios_grupos></Tabla_usuarios_grupos>
            </div>
        </div>
        
        
        </div>
   
    
            
    </>
  )
}