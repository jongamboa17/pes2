'use client'
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const CalificacionesEstudiante = ({ userId }) => {
    const supabase = createClientComponentClient();
    const [calificaciones, setCalificaciones] = useState({});
    const [periodos, setPeriodos] = useState([]);
    const [periodoSeleccionado, setPeriodoSeleccionado] = useState('');
    const [asignaturas, setAsignaturas] = useState({}); 
    const [criterios, setCriterios] = useState({});

    // Carga inicial de periodos, asignaturas y criterios
    useEffect(() => {
        const fetchInitialData = async () => {
            // Obtener periodos
            let { data: periodosData, error: periodosError } = await supabase.from('periodos').select('*').order('created_at', { ascending: false });
            if (periodosError) {
                console.error('Error al obtener periodos', periodosError);
                return;
            }
            if (periodosData && periodosData.length > 0) {
                setPeriodos(periodosData);
                setPeriodoSeleccionado(periodosData[0].id);
            }

            // Obtener asignaturas
            let { data: asignaturasData, error: asignaturasError } = await supabase.from('asignaturas').select('*');
            if (asignaturasError) {
                console.error('Error al obtener asignaturas', asignaturasError);
                return;
            }
            const asignaturasMap = asignaturasData.reduce((map, asignatura) => {
                map[asignatura.id] = asignatura.name;
                return map;
            }, {});
            setAsignaturas(asignaturasMap);

            // Obtener criterios
            let { data: criteriosData, error: criteriosError } = await supabase.from('criterios_evaluacion').select('*');
            if (criteriosError) {
                console.error('Error al obtener criterios', criteriosError);
                return;
            }
            const criteriosMap = criteriosData.reduce((map, criterio) => {
                map[criterio.id] = criterio.name;
                return map;
            }, {});
            setCriterios(criteriosMap);
        };

        fetchInitialData();
    }, []);

    // Carga de calificaciones cuando se selecciona un período
    useEffect(() => {
        const fetchCalificaciones = async () => {
            //reset before fetching
            setCalificaciones({});
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
                return;
            }

            // Reestructurar los datos para agrupar por asignatura
            const calificacionesPorAsignatura = data.reduce((acc, calificacion) => {
                const asignaturaId = calificacion.asignatura_id;
                if (!acc[asignaturaId]) {
                    acc[asignaturaId] = [];
                }
                acc[asignaturaId].push(calificacion);
                return acc;
            }, {});
            setCalificaciones(calificacionesPorAsignatura);
        };

        if (periodoSeleccionado) {
            fetchCalificaciones();
        }
    }, [periodoSeleccionado, userId]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Calificaciones por Asignatura</h1>
            {/* Period selection UI */}
            <div className="mb-4">
                <label htmlFor="periodoSelect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Selecciona un período</label>
                <select id="periodoSelect" value={periodoSeleccionado} onChange={(e) => setPeriodoSeleccionado(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {periodos.map((periodo) => (
                        <option key={periodo.id} value={periodo.id}>{periodo.name}</option>
                    ))}
                </select>
            </div>
            {/* Display calificaciones */}
            {Object.entries(calificaciones).map(([asignaturaId, calificacionesDeAsignatura]) => {
                // Calculate average if needed
                const promedio = calificacionesDeAsignatura.length > 0
                    ? (calificacionesDeAsignatura.reduce((sum, { calificacion }) => sum + calificacion, 0) / calificacionesDeAsignatura.length).toFixed(2)
                    : 0;

                // Prepare header cells for criteria
                const criteriaHeaders = calificacionesDeAsignatura.map(({ criterio_id }) => (
                    <th key={criterio_id}>{criterios[criterio_id]}</th>
                ));

                // Prepare data cells for each criteria's score
                const criteriaScores = calificacionesDeAsignatura.map(({ calificacion }) => (
                    <td key={`score-${calificacion}`}>{calificacion}</td>
                ));

                return (
                    <div key={asignaturaId} className="mb-8">
                        
                        <h2 className="text-xl font-bold my-4">{asignaturas[asignaturaId]}</h2>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead  className='bg-gray-300 text-base font-semibold'>
                                    <tr>
                                        {criteriaHeaders}
                                    </tr>
                                </thead>
                                <tbody className='font-semibold'>
                                    <tr>
                                        {criteriaScores}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <span className='text-sm font-semibold rounded-md'>{' Promedio: '}{promedio}</span>
                    </div>
                );
            })}
        </div> 
    );
};

export default CalificacionesEstudiante;



/**<div className="overflow-x-auto">
  <table className="table table-zebra">

    <thead>
      <tr>
        <th></th>
        <th>Criterio</th>
        <th>Job</th>
        <th>Promedio final: </th>
      </tr>
    </thead>
    <tbody>
      
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      
    </tbody>
  </table>
</div>




 <div className="mb-4">
                <label htmlFor="periodoSelect" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Selecciona un período</label>
                <select id="periodoSelect" value={periodoSeleccionado} onChange={(e) => setPeriodoSeleccionado(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    {periodos.map((periodo) => (
                        <option key={periodo.id} value={periodo.id}>{periodo.name}</option>
                    ))}
                </select>
            </div>
**/