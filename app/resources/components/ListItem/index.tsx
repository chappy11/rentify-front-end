type Props = {
    label:string;
    value:string;
}

export default function ListItem(props:Props) {
  return (
    <div className=' w-full flex py-1'>
        <div className=" flex flex-1">
            <p className=" font-bold">{props.label}</p>
        </div>
        <div className=" flex w-full flex-1 justify-end">
            <p>{props.value}</p>
        </div>
    </div>
  )
}
