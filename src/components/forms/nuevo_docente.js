import SignUpDocente from '@/components/Auth/SignUpDocente';
export default function Nuevo_docente({ modalId }){
   
    return (
            <>
                 <div class="relative  bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 "> 
               
               <div class="">
                   <SignUpDocente modalId={modalId}></SignUpDocente>
               </div>
           </div>
            </>
    )
}