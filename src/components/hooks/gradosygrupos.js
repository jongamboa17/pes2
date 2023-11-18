import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
const useObtenerGradosYGrupos = () => {
    const supabase = createClientComponentClient();
    const [gradosConGrupos, setGradosConGrupos] = useState([]);

    const obtenerGradosYGrupos = async () => {
        let { data: gradosObtenidos, error: errorGrados } = await supabase
            .from('grados')
            .select('*');

        let { data: gruposObtenidos, error: errorGrupos } = await supabase
            .from('grupos')
            .select('*');

        if (!errorGrados && !errorGrupos) {
            const gradosYGrupos = gradosObtenidos.map(grado => ({
                ...grado,
                grupos: gruposObtenidos.filter(grupo => grupo.grado_id === grado.id)
            }));

            setGradosConGrupos(reordenarGrados(gradosYGrupos));
        }
    };

    // Add the reordenarGrados function here if it's not used elsewhere
    const reordenarGrados = (grados) => {
        if (grados.length > 1) {
            // Extrae el segundo elemento
            const [primerGrado, segundoGrado, ...resto] = grados;
    
            // Reorganiza el arreglo colocando el segundo grado al principio
            const gradosReorganizados = [segundoGrado, primerGrado, ...resto];
    
            return gradosReorganizados;
        }
        return grados; 
    };

    return { gradosConGrupos, obtenerGradosYGrupos };
};

export default useObtenerGradosYGrupos;