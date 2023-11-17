'use client';
import 'flowbite'
import 'flowbite-react'
import Tabla_alumnos_calificaciones from '@/components/tablas/tabla_alumnos_calificaciones'
export default function page () {
  
    return (
      <div>
        <div className="collapse collapse-arrow bg-base-200 m-3 ">
        <input type="checkbox" id="accordion-item-12" className="peer hidden" />
            <label htmlFor="accordion-item-12" className="collapse-title text-2xl font-medium">
            Primer Grado 
            </label>
            <div className="collapse-content peer-checked:block hidden"> 
                {/** */}
                <div className="collapse collapse-arrow bg-white mb-2">
                    <input type="checkbox" id="accordion-item-1" className="peer hidden" />
                    <label htmlFor="accordion-item-1" className="collapse-title text-xl font-medium">
                    Primer Grado A
                    </label>
                    <div className="collapse-content peer-checked:block hidden"> 
                        
                        <Tabla_alumnos_calificaciones/>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-white mb-2">
                    <input type="checkbox" id="accordion-item-2" className="peer hidden" />
                    <label htmlFor="accordion-item-2" className="collapse-title text-xl font-medium">
                        Primer Grado B
                    </label>
                    <div className="collapse-content peer-checked:block hidden"> 
                        <p>hello</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-white mb-2">
                    <input type="checkbox" id="accordion-item-3" className="peer hidden" />
                    <label htmlFor="accordion-item-3" className="collapse-title text-xl font-medium">
                        Primer Grado C
                    </label>
                    <div className="collapse-content peer-checked:block hidden"> 
                        <p>hello</p>
                    </div>
                </div>
                {/** */}
            </div>
        </div>
            

      </div>
    );
  
}
