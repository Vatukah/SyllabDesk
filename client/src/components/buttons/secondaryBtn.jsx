export default function SecondaryBtn({value,action, expand = false}){
    return (<button class={`${expand?"w-full":"w-fit"} primary-bg-dark text border border-[var(--primary-dark)] px-sm py-xs rounded-md hover:primary-bg-blur`} onClick={action}>
  {value}
</button>)
}