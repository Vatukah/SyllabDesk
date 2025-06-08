export default function PrimaryBtn ({value,action}){
   
    return (
        <button className="px-sm py-xs rounded-md my-xxs font-semibold shadow-md transition-all duration-200 accent-light hover:accent-dark text-white cursor-pointer" onClick={action}>{value}</button>
    )
}