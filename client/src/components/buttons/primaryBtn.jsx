export default function PrimaryBtn ({value,action,expand=false,disable=false}){
   
    return (
        <button disabled={disable} className={`border border-[rgba(var(--accent-light),1)] px-sm py-xs rounded-md my-xxs font-semibold shadow-md transition-all duration-200 accent-light text-white ${expand?"w-full":"w-fit"} ${disable? "opacity-50 cursor-not-allowed":" hover:accent-dark  cursor-pointer "}`} onClick={action}>{value}</button>
    )
}