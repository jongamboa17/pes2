'use client';
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Tabla_alumnos_calificaciones_alumnos from '@/components/tablas/tabla_alumnos_calificaciones_alumnos'
const CalificacionesEstudiante = ({ userId }) => {
    const supabase = createClientComponentClient();
    const [calificaciones, setCalificaciones] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState('');
    const [asignaturas, setAsignaturas] = useState([]); 
    const [criterios, setCriterios] = useState([]);

    // Carga inicial de periodos
    useEffect(() => {
        const fetchInitialData = async () => {
            // Obtener periodos
            let { data: periodosData, error: periodosError } = await supabase.from('periodos').select('*').order('created_at', { ascending: false });
            if (periodosError) {
                console.error('Error al obtener periodos', periodosError);
            } else {
                
                if (periodosData && periodosData.length > 0) {
                    setPeriodos(periodosData);
                    setPeriodoSeleccionado(periodosData[0].id);
                }
            }

            // Obtener asignaturas
            let { data: asignaturasData, error: asignaturasError } = await supabase.from('asignaturas').select('*');
            if (asignaturasError) {
                console.error('Error al obtener asignaturas', asignaturasError);
            } else {
                // Transformar a un objeto para facilitar la búsqueda por ID
                const asignaturasMap = asignaturasData.reduce((map, asignatura) => {
                    map[asignatura.id] = asignatura.name;
                    return map;
                }, {});
                setAsignaturas(asignaturasMap);
            }

            // Obtener criterios
            let { data: criteriosData, error: criteriosError } = await supabase.from('criterios_evaluacion').select('*');
            if (criteriosError) {
                console.error('Error al obtener criterios', criteriosError);
            } else {
                // Transformar a un objeto para facilitar la búsqueda por ID
                const criteriosMap = criteriosData.reduce((map, criterio) => {
                    map[criterio.id] = criterio.name; // Asumiendo que 'name' es el campo con el nombre del criterio
                    return map;
                }, {});
                setCriterios(criteriosMap);
            }
        };

        fetchInitialData();
    }, []);

    // Carga de calificaciones cuando se selecciona un período
    useEffect(() => {
        const fetchCalificaciones = async () => {
            const { data, error } = await supabase
                .from('calificaciones')
                .select(`
                    calificacion_id,
                    asignatura_id,
                    alumno_id,
                    periodo,
                    criterio_id,
                    calificacion
                `)
                .eq('alumno_id', userId)
                .eq('periodo', periodoSeleccionado);

            if (error) {
                console.error('Error al obtener calificaciones', error);
            } else {
                setCalificaciones(data);
            }
        };

        if (periodoSeleccionado) {
            fetchCalificaciones();
        }
    }, [periodoSeleccionado, userId]);

    return (
        <div className="container mx-auto p-4">
             
            <h1 className="text-2xl font-bold mb-4">Calificaciones por Asignatura</h1>
            <div className="mb-4">
                <label htmlFor="periodoSelect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Selecciona un período</label>
                <select id="periodoSelect" value={periodoSeleccionado} onChange={(e) => setPeriodoSeleccionado(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {periodos.map((periodo) => (
                        <option key={periodo.id} value={periodo.id}>{periodo.name}</option>
                    ))}
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Asignatura ID</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Criterio ID</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Calificación</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {calificaciones.map(({ calificacion_id, asignatura_id, criterio_id, calificacion }) => (
                            <tr key={calificacion_id}>
                                <td className="text-left py-3 px-4">{asignaturas[asignatura_id]}</td>
                                <td className="text-left py-3 px-4">{criterios[criterio_id]}</td>
                                <td className="text-left py-3 px-4">{calificacion}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
    );
};

export default CalificacionesEstudiante;

