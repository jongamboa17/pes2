import Image from 'next/image'
import logo from '../../utilities/logo1.png'
import 'flowbite'
import Modal from "../modal_usuario"
import Editar_calificaciones from '../forms/editar_calificaciones'
import { useState, useEffect } from 'react'
export default function Tabla_alumnos_calificaciones_alumnos() {    
    const[showModal4, setShowModal4]=useState(false);
    return (
        <>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="p-4">
                           
                        </th>
                        <th scope="col" class="px-9 py-3">
                            Asignatura
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
                            Examen 1
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                           
                            
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            
                            <div class="pl-3">
                                <div class="text-base font-semibold">Asignatura 1</div>
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
                            90
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                           
                            
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            
                            <div class="pl-3">
                                <div class="text-base font-semibold">Asignatura 2</div>
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
                            90
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                           
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            
                            <div class="pl-3">
                                <div class="text-base font-semibold">Asignatura 3</div>
                                
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
                            90
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                           
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            
                            <div class="pl-3">
                                <div class="text-base font-semibold">Asignatura 4</div>
                                
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
                            90
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                           
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            
                            <div class="pl-3">
                                <div class="text-base font-semibold">Asignatura 5</div>
                                
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
                            90
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