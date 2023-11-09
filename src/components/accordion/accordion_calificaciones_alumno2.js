'use client';
import Tabla_alumnos_calificaciones_alumnos from '@/components/tablas/tabla_alumnos_calificaciones_alumnos'
export default function page () {
  
    return (
      <div>
        <div className="collapse collapse-arrow bg-base-200 m-3 ">
        <input type="checkbox" id="accordion-item-12" className="peer hidden" />
            <label htmlFor="accordion-item-12" className="collapse-title text-2xl font-medium">
            2023
            </label>
            <div className="collapse-content peer-checked:block hidden"> 
                {/** */}
                <div className="collapse collapse-arrow bg-white mb-2">
                    <input type="checkbox" id="accordion-item-1" className="peer hidden" />
                    <label htmlFor="accordion-item-1" className="collapse-title text-xl font-medium">
                    Primer periodo
                    </label>
                    <div className="collapse-content peer-checked:block hidden"> 
                        <div class="flow-root py-2">  
                            <center>
                                <p class=" font-bold text-xl">Calificaciones</p> 
                            </center>
                        </div>
                        <Tabla_alumnos_calificaciones_alumnos/>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-white mb-2">
                    <input type="checkbox" id="accordion-item-2" className="peer hidden" />
                    <label htmlFor="accordion-item-2" className="collapse-title text-xl font-medium">
                    Segundo periodo
                    </label>
                    <div className="collapse-content peer-checked:block hidden"> 
                        <p>hello</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-white mb-2">
                    <input type="checkbox" id="accordion-item-3" className="peer hidden" />
                    <label htmlFor="accordion-item-3" className="collapse-title text-xl font-medium">
                    Tercer periodo
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
