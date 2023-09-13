import React from 'react'
import { useRouter } from 'next/router';

function Submitted() {
  const router = useRouter(); // Import the useRouter hook

  const handleSubmitSeeAll = () => {
      router.push('/Journal');
  };

  const handleSubmitNewNote = () => {
    router.push('/');
};

  return (
    <div className="bg-black flex justify-center items-center w-screen h-screen">
      <div className="relative w-6/12">
        <div className="mt-20 flex flex-col items-center w-full">
          <h1 className="text-[#FF8B00] text-4xl my-20">Submitted</h1>
          <div className="z-10 mt-44">
            <button className="bg-black text-white text-lg mr-56 px-4 py-2 rounded-md" onClick={handleSubmitSeeAll}>
              See all notes
            </button>
            <button className="bg-black text-white text-lg px-4 py-2 rounded-md" onClick={handleSubmitNewNote}>
              Write another note
            </button>
          </div>
        </div>
      </div>
      <div className="opacity-40 h-72 w-6/12 bg-footer-gradient  absolute bottom-0"></div>
    </div>    
  )
}

export default Submitted