import { stringify } from "postcss";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
export default function Editar_calificaciones({grupoId, estudiante, estudianteId,criteriosEvaluacion, modalId, asignaturas}){
    const supabase = createClientComponentClient();
    //console.log('GRUPOID:',grupoId);
    //console.log('ESTUDIANTE:',estudiante);
    //console.log('CRITERIOSEVALUACION:',criteriosEvaluacion);
    //console.log('MODALID:',modalId);
    //console.log('PERIODOSELECCIONADO:',periodoSeleccionado);
    //console.log('ASIGNATURAS:',asignaturas[0].id);

    const [calificaciones, setCalificaciones] = useState({});
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState(null);
    
    const fetchUltimoPeriodo = async () => {
        const { data, error } = await supabase
            .from('periodos') // Reemplaza 'periodos' con el nombre de tu tabla de períodos
            .select('*')
            .order('initial_date', { ascending: false }) // Asegúrate de usar el campo correcto para ordenar
            .limit(1); // Obtén solo el período más reciente
    
        if (error) {
            console.error('Error al obtener el último período', error);
        } else {
            // Suponiendo que tu campo de período se llama 'id'
            return data[0].id; 
        }
    };

    useEffect(() => {
        const obtenerYEstablecerUltimoPeriodo = async () => {
            const ultimoPeriodo = await fetchUltimoPeriodo();
            setPeriodoSeleccionado(ultimoPeriodo);
        };
    
        obtenerYEstablecerUltimoPeriodo();
    }, []); 

    
    //obtener calificaciones de la base de datos
        const fetchCalificaciones = async () => {
            // Suponiendo que 'estudiante.id' y 'asignaturas[0].id' son válidos y existen
            const { data, error } = await supabase
                .from('calificaciones')
                .select('*')
                .eq('alumno_id', estudianteId)
                .eq('asignatura_id', asignaturas[0].id)
                .eq('periodo', periodoSeleccionado);

            if (error) {
                console.error('Error al obtener calificaciones', error);
                return;
            }else {
                console.log('Calificaciones extosas:', data);
                setCalificaciones(data);
                
            }

            /*const calificacionesTransformadas = data.reduce((acc, item) => {
                acc[item.criterio_id] = {
                    calificacion: item.calificacion,
                    porcentaje: ((item.calificacion / 100) * item.peso).toFixed(2)
                };
                return acc;
            }, {});*/

            
        };
        //set timeout para que se cargue las props de periodoSeleccionado 
        

        useEffect(() => {
            if (periodoSeleccionado) {
                fetchCalificaciones();
            }
        }, [periodoSeleccionado]);


    useEffect(() => {
        console.log('CalificacionesDESDE EDITAR:', calificaciones);
    }, [calificaciones]);

    const handleCalificacionChange = (criterioId, value, peso) => {
        const porcentaje = ((value / 100) * peso).toFixed(2);
        setCalificaciones(prev => ({
            ...prev,
            [criterioId]: {
                calificacion: value,
                porcentaje
            }
        }));
    };
    
    //enviar calificaciones a la base de datos
    const enviarCalificaciones = async () => {
        const calificacionesParaEnviar = Object.entries(calificaciones).map(([criterioId, { calificacion }]) => ({
            alumno_id: estudianteId,
            asignatura_id: asignaturas[0].id,
            periodo: periodoSeleccionado,
            criterio_id: criterioId,
            calificacion: calificacion,
            fecha: new Date().toISOString()
        }));
        
        const { data, error } = await supabase
            .from('calificaciones')
            .upsert(calificacionesParaEnviar, { onConflict: ['id'] });

        if (error) {
            console.error('Error al enviar calificaciones', error);
        } else {
            console.log('Calificaciones enviadas con éxito', data);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        enviarCalificaciones();
    };
    return (
        <>
            <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Editar Calificaciones
                            
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div class="grid gap-4 mb-4 sm:grid-cols-1">
                            <center>
                                <div>
                                    <h2 className="font-bold">{estudiante}</h2>
                                    <h2>{JSON.stringify(calificaciones)} {typeof(periodoSeleccionado)}</h2>
                                    
                                            
                                            
                                    
                                    
                                </div> 
                            </center>
                        </div>
                        
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 py-5">
                            {criteriosEvaluacion.map((criterio, index) => {
                                const calificacionCriterio = calificaciones[index]?.calificacion;

                                return (
                                    <div key={criterio.id}>
                                        <label htmlFor={`calificacion_${criterio.id}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            {criterio.name} - {criterio.weight}%
                                        </label>
                                        <input
                                            type="number"
                                            id={`calificacion_${criterio.id}`}
                                            value={calificacionCriterio || ''}
                                            onChange={(e) => handleCalificacionChange(criterio.id, e.target.value, criterio.weight)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder=''
                                            required
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <button type="submit" class="text-white inline-flex items-center bg-lime-700 hover:bg-lime-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            Guardar
                        </button>
                    </form>
                </div>
        </>
    )
}