import 'flowbite'
import Image from 'next/image'
import logo from '@/utilities/logo1.png'
import Modal from "@/components/modals/modal_usuario"
import Editar_calificaciones from '../forms/editar_calificaciones'
import { useState, useEffect } from 'react'
export default function Tabla_alumnos_calificaciones() {    
    const[showModal4, setShowModal4]=useState(false);
    return (
        <>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="p-4">
                           
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" class="px-6 py-3">
                            TC - 10 %
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Proy1 - 10 %
                        </th> 
                        <th scope="col" class="px-6 py-3">
                            Proy2 - 10 %
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Tareas - 10 %
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                           
                            
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <Image width="10"  height="10" class="w-10 h-10 rounded-full" src={logo} alt="Jese image"></Image>
                            <div class="pl-3">
                                <div class="text-base font-semibold">Neil Sims</div>
                            </div>  
                        </th>
                        <td class="px-6 py-4">
                            85
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            <button type="button" class=" text-white bg-green-600 hover:bg-blue-800 
                                                        focus:ring-4 focus:outline-none focus:ring-blue-300  
                                                        font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                                        inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                                                        dark:focus:ring-blue-800" onClick={()=>setShowModal4(true)}> 
                                Editar 
                            </button>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                           
                            
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Image width="10"  height="10" class="w-10 h-10 rounded-full" src={logo} alt="Jese image"></Image>
                            <div class="pl-3">
                                <div class="text-base font-semibold">Bonnie Green</div>
                            </div>
                        </th>
                        <td class="px-6 py-4">
                        85
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            <button type="button" class=" text-white bg-green-600 hover:bg-blue-800 
                                                        focus:ring-4 focus:outline-none focus:ring-blue-300  
                                                        font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                                        inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                                                        dark:focus:ring-blue-800" onClick={()=>setShowModal4(true)}> 
                                Editar 
                            </button>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                           
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Image width="10"  height="10" class="w-10 h-10 rounded-full" src={logo} alt="Jese image"></Image>
                            <div class="pl-3">
                                <div class="text-base font-semibold">Jese Leos</div>
                                
                            </div>
                        </th>
                        <td class="px-6 py-4">
                        85
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            <button type="button" class=" text-white bg-green-600 hover:bg-blue-800 
                                                        focus:ring-4 focus:outline-none focus:ring-blue-300  
                                                        font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                                        inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                                                        dark:focus:ring-blue-800" onClick={()=>setShowModal4(true)}> 
                                Editar 
                            </button>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                           
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Image width="10"  height="10" class="w-10 h-10 rounded-full" src={logo} alt="Jese image"></Image>
                            <div class="pl-3">
                                <div class="text-base font-semibold">Thomas Lean</div>
                                
                            </div>
                        </th>
                        <td class="px-6 py-4">
                        85
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            <button type="button" class=" text-white bg-green-600 hover:bg-blue-800 
                                                        focus:ring-4 focus:outline-none focus:ring-blue-300  
                                                        font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                                        inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                                                        dark:focus:ring-blue-800" onClick={()=>setShowModal4(true)}> 
                                Editar 
                            </button>
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                           
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Image  width="10"  height="10" class="w-10 h-10 rounded-full" src={logo} alt="Jese image"></Image>
                            <div class="pl-3">
                                <div class="text-base font-semibold">Leslie Livingston</div>
                                
                            </div>
                        </th>
                        <td class="px-6 py-4">
                        85
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            90
                        </td>
                        <td class="px-6 py-4">
                            <button type="button" class=" text-white bg-green-600 hover:bg-blue-800 
                                                        focus:ring-4 focus:outline-none focus:ring-blue-300  
                                                        font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                                        inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                                                        dark:focus:ring-blue-800" onClick={()=>setShowModal4(true)}> 
                                Editar 
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Modal isVisible={showModal4} onClose={()=>setShowModal4(false)}>
            <Editar_calificaciones></Editar_calificaciones>
        </Modal>
        </>
    )


}