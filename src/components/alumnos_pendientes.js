'use client'
import Image from 'next/image'
import logo2 from '../utilities/photo1.avif'
export default function Alumnos_pendientes() {
 
    return (
        
    <ul class="h-60 py-2 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
    <li>
      <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>
        <Image class="w-6 h-6 mr-2 rounded-full"  src={logo2} alt="Jese image"/>
        Jese Leos
      </a>
      
    </li>
    <li>
      <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>
        <Image class="w-6 h-6 mr-2 rounded-full" src={logo2} alt="Jese image"/>
        Robert Gough
      </a>
    </li>
    <li>
      <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>
        <Image class="w-6 h-6 mr-2 rounded-full" src={logo2} alt="Jese image"/>
        Bonnie Green
      </a>
    </li>
    <li>
      <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>
        <Image class="w-6 h-6 mr-2 rounded-full" src={logo2} alt="Jese image"/>
        Leslie Livingston
      </a>
    </li>
    <li>
      <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>
        <Image class="w-6 h-6 mr-2 rounded-full" src={logo2} alt="Jese image"/>
        Michael Gough
      </a>
    </li>
    <li>
      <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>
        <Image class="w-6 h-6 mr-2 rounded-full" src={logo2} alt="Jese image"/>
        Joseph Mcfall
      </a>
    </li>
          <li>
      <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>
        <Image class="w-6 h-6 mr-2 rounded-full" src={logo2} alt="Jese image"/>
        Roberta Casas
      </a>
    </li>
    <li>
      <a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        <input  id="link-checkbox" type="checkbox" value="" class="w-5 h-5 rounded-md mr-2"/>
        <Image class="w-6 h-6 mr-2 rounded-full" src={logo2} alt="Jese image"/>
        Neil Sims
      </a>
    </li>
  </ul>


)
}


