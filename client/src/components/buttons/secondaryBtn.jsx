export default function SecondaryBtn({value,action}){
    return (<button class="bg-white text-gray-800 border border-gray-300 px-sm py-xs rounded-md hover:bg-gray-100" onClick={action}>
  {value}
</button>)
}