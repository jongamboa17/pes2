import SignUp from 'src/components/Auth/SignUp';
export default function Nuevo_usuario({ modalId }){
    return (
            <>
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 "> 
                    <div class="mt-4">
                        <SignUp modalId ={modalId}></SignUp>
                    </div>

                </div>
            </>
    )
}