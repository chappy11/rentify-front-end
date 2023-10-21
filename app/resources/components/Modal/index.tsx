'use client';
import { Button } from '..';

type Props = {
    isOpen:boolean;
    setIsOpen:(isOpen:boolean)=>void;
    onClose?:()=>void;
    children:React.ReactNode;
    isFullScreen?:boolean;
    onConfirm?:()=>void;

}

const Modal = (props:Props) => {
    const {isOpen,children,setIsOpen} = props;
  
  const closeModal = () => {
    setIsOpen(false);
    if(!props.onClose){
        return;
    }
    props.onClose();
  };

  function handleConfirm(){
    if(!props.onConfirm){
        
    }
  }
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg z-10 w-screen h-screen">
            <button
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {children}
            <div className=' flex flex-row'>
                <div className=' w-1/2'>
                    <Button text={'Confirm'} onClick={()=>alert('hi')}/>
                </div>
            </div>
          </div>
          
        </div>
      )}
    </>
  );
};

export default Modal;