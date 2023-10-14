import { useMemo } from "react";

type Props = {
    text:string;
    onClick:()=>void;
    outline?:boolean;
  }


export default function Button(props:Props) {
  const {outline,onClick} = props;
  const design = useMemo(() => {
    if(outline){
      return 'w-full px-3 py-4 rounded-md hover:bg-black hover:text-white border bg-white text-black'
    }

    return 'w-full px-3 py-4 rounded-md hover:border-black hover:border hover:bg-white hover:text-black bg-black text-white'

  }, [outline])
  
  return (
    <button className={`${design}`} onClick={()=>onClick()} >
        {props.text}
    </button>
  )
}
