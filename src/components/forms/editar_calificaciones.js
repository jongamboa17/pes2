import { stringify } from "postcss";

export default function Editar_calificaciones({grupoId, estudiante,criteriosEvaluacion, modalId, periodoSeleccionado, asignaturas}){
    //console.log('GRUPOID:',grupoId);
    //console.log('ESTUDIANTE:',estudiante);
    //console.log('CRITERIOSEVALUACION:',criteriosEvaluacion);
    //console.log('MODALID:',modalId);
    //console.log('PERIODOSELECCIONADO:',periodoSeleccionado);
    //console.log('ASIGNATURAS:',asignaturas[0].id);
    return (
        <>
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Editar Calificaciones
                        </h3>
                    </div>
                    <form action="#">
                        <div class="grid gap-4 mb-4 sm:grid-cols-1">
                            <center>
                                <div>
                                    <h2 className="font-bold">{estudiante}</h2>
                                    <h2 className="font-bold">{periodoSeleccionado}</h2>
                                    
                                </div> 
                            </center>
                        </div>
                        
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 py-5">       
                        {criteriosEvaluacion.map((criterio) => (
                             <div key={criterio.id}>
                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{criterio.name} - {criterio.weight}% </label>
                                <input type="number" id="cr1" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0-100" required/>
                            </div>
                             ))}
                        </div>
                        <button type="submit" class="text-white inline-flex items-center bg-lime-700 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            
                            Guardar
                        </button>
                    </form>
                </div>
        </>
    )
}