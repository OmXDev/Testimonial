import React from 'react'
import Basic from './pages/Basic';
import { IoClose } from "react-icons/io5";
import ExtraSettings from './pages/ExtraSettings';
import ThankYouPage from './pages/ThankYou';

interface ScratchPopupProps{
    onClose: () => void;
}

const NewSpace: React.FC<ScratchPopupProps>=({onClose}) =>{
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
    <IoClose
                    onClick={onClose}
                    className="absolute top-4 right-4 h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer transition-colors duration-200"
                />
      <h2 className="text-2xl font-semibold mb-4">Files in Scratch</h2>
      
      <ul className="space-y-4">
       {/* <Basic/> */}
       {/* <ExtraSettings/> */}
       <ThankYouPage/>
      </ul>
      {/* <button
        onClick={onClose}
        className="mt-6 text-white bg-red-600 px-4 py-2 rounded"
      >
        Close 
      </button> */}
    </div>
    {/* s */}
    </div>
  // </div>
  )
}

export default NewSpace