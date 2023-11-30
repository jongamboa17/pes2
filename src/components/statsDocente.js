'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function statsDocente({userId}) {
    const supabase = createClientComponentClient();
    const [todosLosGrupos, setTodosLosGrupos] = useState([]);
    const [criteriosPorGrupo, setCriteriosPorGrupo] = useState({});
    const [asignaturaFiltrada, setAsignaturaFiltrada] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString();


    const fetchAsignaturas = async () => {
        const { data } = await supabase.from('asignaturas').select('*').eq('docente_id', userId);
        if (data) {
            //console.log('Asignaturas:', data);
            // para guardar el registro en donde docente_id = userId
            const asignaturasDocente = data.filter(asignatura => asignatura.docente_id === userId);
            setAsignaturaFiltrada(data[0]);

            
        }else {
            console.log('No hay datos en asignaturas');
        }
    }

    const [activeUsers, setActiveUsers] = useState([]);
    useEffect(() => {
        const fetchTodosLosGrupos = async () => {
            const { data, error } = await supabase.from('grupos').select('*');
            if (error) {
                console.error('Error al obtener grupos', error);
            } else {
                setTodosLosGrupos(data);
            }
        };

        const fetchPeriodos = async () => {
            const { data } = await supabase.from('periodos').select('*');
            if (data) {
                // Ordenar los períodos
                const periodosOrdenados = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setPeriodos(periodosOrdenados);
            }
        };
        const fetchAlumnos = async () => {
            const { data: profileData2, error2 } = await supabase
            .from('profiles')
            .select('*');

            const activeUsers2 = profileData2.filter((user) => user.activo === true && user.role === 'Alumno');
            setActiveUsers(activeUsers2);
    //filtrar los datos de profileData2 para obtener los registros que seaan activo = true y 
        };
       

        

        fetchTodosLosGrupos();
        fetchAsignaturas();
        fetchPeriodos();
        fetchAlumnos();
    }, []);

    const ultimoPeriodo = periodos[0] ? periodos[0].name : 'No disponible';

    
    const [gruposSinCriterios, setGruposSinCriterios] = useState([]);

    useEffect(() => {
        const fetchCriteriosAsignados = async () => {
            if (asignaturaFiltrada && asignaturaFiltrada.id) {
                const { data, error } = await supabase
                    .from('asignacion_criterios')
                    .select('*')
                    .eq('asignatura_id', asignaturaFiltrada.id);

                if (error) {
                    console.error('Error al obtener asignaciones de criterios', error);
                    return;
                }

                const gruposConCriterios = new Set(data.map(item => item.grupo_id));
                const gruposSinCriteriosList = todosLosGrupos.filter(grupo => !gruposConCriterios.has(grupo.id));

                setGruposSinCriterios(gruposSinCriteriosList);
            }
        };

        fetchCriteriosAsignados();
    }, [todosLosGrupos, asignaturaFiltrada]);

    
    

    

    
    

  return (
    <center>
            <div className="stats shadow mt-8 stats-vertical md:stats-horizontal">
                <div className="stat">
                    <div className="stat-figure text-primary">
                    
                    </div>
                    <div className="stat-title"># Alumnos</div>
                    <div className="stat-value text-green-400">{activeUsers.length}</div>
                
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    
                    </div>
                    <div className="stat-title">Periodo Actual</div>
                    <div className="stat-value text-green-400">{ultimoPeriodo}</div>
                    
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    
                    </div>
                    <div className="stat-title">Grupos sin críterios</div>
                    <div className="stat-value text-green-400">{gruposSinCriterios.length}</div>
                    
                    
                </div>
                <div className="stat">
                    <div className="stat-figure text-secondary">
                    
                    </div>
                    <div className="stat-title">Fecha Actual</div>
                    <div className="stat-value text-green-400">{fechaFormateada}</div>
                    
                </div>
                
            
            </div>
            </center>

   
  
  );
}

