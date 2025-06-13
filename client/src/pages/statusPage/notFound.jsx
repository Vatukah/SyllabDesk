import notFound from '../../assets/404_Error_pana.svg'
export default function NotFound({message}){
      return(
        <div className="flex flex-col items-center justify-center min-h-screen ">
<img src={notFound} alt="not found image" className='w-3xl'/>
<h2 className='font-bold text-lg'>Oops! Page not found</h2>
      <p>{message}</p>
        </div>
      )
}