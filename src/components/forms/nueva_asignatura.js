export default function Nueva_asignatura(){
    return (
        <>
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Nueva Asignatura
                        </h3>
                    </div>
                    <form action="#">
                        <div class="grid gap-4 mb-4 sm:grid-cols-1">
                            <div>
                                <input type="text" name="asignatura" id="asignatura" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nombre de la asignatura" required=""/>
                            </div> 
                        </div>
                        <center>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Asignar a:</label>
                        </center>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 py-5">                        
                            <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="bordered-checkbox-1" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Primer Grado</label>
                            </div>
                            <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                <input id="bordered-checkbox-2" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="bordered-checkbox-2" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Segundo Grado</label>
                            </div>
                            <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                <input id="bordered-checkbox-3" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="bordered-checkbox-3" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tercer Grado</label>
                            </div>
                            <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                <input id="bordered-checkbox-4" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="bordered-checkbox-4" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cuarto Grado</label>
                            </div>
                            <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                <input id="bordered-checkbox-5" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="bordered-checkbox-5" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Quinto Grado</label>
                            </div>
                            <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                <input id="bordered-checkbox-6" type="checkbox" value="" name="bordered-checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="bordered-checkbox-6" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sexto Grado</label>
                            </div>
                        </div>
                        <button type="submit" class="text-white inline-flex items-center bg-lime-700 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                            Crear Asignatura
                        </button>
                    </form>
                </div>
        </>
    )
}