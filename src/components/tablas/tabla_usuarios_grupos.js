import Image from 'next/image'
import logo from '../../utilities/logo1.png'
import 'flowbite'
export default function Tabla_usuarios_grupos() {    
    return (
        
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
                            Contacto
                        </th>
                        <th scope="col" class="px-6 py-3">
                            
                        </th> 
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                            <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>
                            
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <Image width="10"  height="10" class="w-10 h-10 rounded-full" src={logo} alt="Jese image"></Image>
                            <div class="pl-3">
                                <div class="text-base font-semibold">Neil Sims</div>
                                <div class="font-normal text-gray-500">neil.sims@gmail.com</div>
                            </div>  
                        </th>
                        <td class="px-6 py-4">
                            88888888
                        </td>
                        <td class="px-6 py-4">
                            {/**<div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                            </div>*/}
                        </td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                            <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>
                            
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Image width="10"  height="10" class="w-10 h-10 rounded-full" src={logo} alt="Jese image"></Image>
                            <div class="pl-3">
                                <div class="text-base font-semibold">Bonnie Green</div>
                                <div class="font-normal text-gray-500">bonnie@gmail.com</div>
                            </div>
                        </th>
                        <td class="px-6 py-4">
                        88888888
                        </td>
                        <td class="px-6 py-4">
                            {/**<div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                            </div>*/}
                        </td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                            <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Image width="10"  height="10" class="w-10 h-10 rounded-full" src={logo} alt="Jese image"></Image>
                            <div class="pl-3">
                                <div class="text-base font-semibold">Jese Leos</div>
                                <div class="font-normal text-gray-500">jese@gmail.com</div>
                            </div>
                        </th>
                        <td class="px-6 py-4">
                        88888888
                        </td>
                        <td class="px-6 py-4">
                            {/**<div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                            </div>*/}
                        </td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                            <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>  
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Image width="10"  height="10" class="w-10 h-10 rounded-full" src={logo} alt="Jese image"></Image>
                            <div class="pl-3">
                                <div class="text-base font-semibold">Thomas Lean</div>
                                <div class="font-normal text-gray-500">thomes@gmail.com</div>
                            </div>
                        </th>
                        <td class="px-6 py-4">
                        88888888
                        </td>
                        <td class="px-6 py-4">
                            {/**<div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                            </div>*/}
                        </td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 pl-6">
                            <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/> 
                        </td>
                        <th scope="row" class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Image  width="10"  height="10" class="w-10 h-10 rounded-full" src={logo} alt="Jese image"></Image>
                            <div class="pl-3">
                                <div class="text-base font-semibold">Leslie Livingston</div>
                                <div class="font-normal text-gray-500">leslie@gmail.com</div>
                            </div>
                        </th>
                        <td class="px-6 py-4">
                        88888888
                        </td>
                        <td class="px-6 py-4">
                            {/**<div class="flex items-center">
                                <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div> Online
                            </div>*/}
                        </td>
                        <td class="px-6 py-4">
                            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Editar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )


}