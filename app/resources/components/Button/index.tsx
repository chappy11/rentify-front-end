type Props = {
    text:string;
    onClick?:()=>void;
}


export default function Button(props:Props) {
  return (
    <button className=" w-full px-3 py-4 rounded-md hover:border-black hover:border hover:bg-white hover:text-black bg-black text-white">
        {props.text}
    </button>
  )
}
