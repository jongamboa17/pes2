
import Image from 'next/image'
import logo from '@/utilities/logo1.png'
import Modal from "@/components/modals/modal_usuario"
import Editar_calificaciones from '../forms/editar_calificaciones'
import Criterios_evaluacion from '../forms/criterios_evaluacion'
import { useState, useEffect } from 'react'
export default function Tabla_alumnos_calificaciones() {    
    
    return (
        <>
           <div class="flow-root">  
                <p class="float-left font-bold p-2">Tabla Alumnos
                    <label htmlFor="my_modal_13" className="text-white bg-green-600 hover:bg-blue-800 
                                                            focus:ring-4 focus:outline-none focus:ring-blue-300  
                                                            font-medium rounded-lg text-sm px-3 py-2.5 ml-4 text-center 
                                                            inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 
                                                            dark:focus:ring-blue-800">
                        <svg class="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0v3H6V2m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M5 5h8m-5 5h5m-8 0h.01M5 14h.01M8 14h5"/>
                        </svg>
                    </label>
                    
                </p> 
                <p class="float-right p-2">
                    
                    
                    
                </p>
            </div>
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        
                        <th scope="col" class=" invisible sm:visible py-3">
                            <center>
                            Nombre
                            </center>
                        </th>
                        
                        <th scope="col" class="invisible sm:visible py-3 ">
                            <center>
                            TC - 10 %
                            </center>
                            
                        </th>
                        <th scope="col" class="invisible sm:visible py-3 ">
                            <center>    
                            TC - 10 %
                            </center>
                            
                        </th>
                        <th scope="col" class="invisible sm:visible py-3 ">
                            <center>    
                            TC - 10 %
                            </center>
                        </th>
                        <th scope="col" class="invisible sm:visible py-3 ">
                            <center>    
                            TC - 10 %
                            </center>
                        </th>
                        
                        <th scope="col" class=" py-3 ">
                            <center>    
                            <span className='font-bold '>Nota final</span>
                            </center>
                        </th>
                        <th scope="col" class="invisible sm:visible py-3">
                            <center>
                            Acciones
                            </center>
                        </th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" class="py-4">
                            <center>    
                            Neil Sims
                            </center>    
                        </th>
                        
                        <td class=" py-4 invisible sm:visible">
                            <center>

                            85
                            </center>
                        </td>
                        <td class=" py-4 invisible sm:visible">
                            <center>

                            85
                            </center>
                        </td>
                        <td class=" py-4 invisible sm:visible">
                            <center>

                            85
                            </center>
                        </td>
                        <td class=" py-4 invisible sm:visible">
                            <center>
                            85
                            </center>
                        </td>
                        <th scope="col" class=" py-3">
                            <center>    
                                <span className='font-bold bg-green-300 px-5 py-5'>100</span>
                            </center>
                        </th>
                        <td class=" py-4">
                            <center>
                                <button type="button" class=" text-white bg-green-600 hover:bg-blue-800 
                                                                focus:ring-4 focus:outline-none focus:ring-blue-300  
                                                                font-medium rounded-lg text-sm px-3 py-2.5 text-center 
                                                                inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 
                                                                dark:focus:ring-blue-800">
                                        <label htmlFor="my_modal_30" className="">Editar</label> 
                                </button>
                            </center>
                        </td>
                        
                    </tr>
                    
                </tbody>
            </table>
        
        

        {/**Modal editar*/}
        <input type="checkbox" id="my_modal_30" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <Editar_calificaciones></Editar_calificaciones>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_30">Close</label>
        </div>
        
        {/**Modal criterios de evaluación*/}
        <input type="checkbox" id="my_modal_13" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <Criterios_evaluacion></Criterios_evaluacion>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_13">Close</label>
        </div>
            
        </>
    )


}