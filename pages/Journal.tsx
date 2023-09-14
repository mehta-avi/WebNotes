import React from 'react';
import Link from 'next/link';

function Journal() {

   
  return (
    <div className='bg-black w-screen h-screen items-center px-6 lg:px-32'>
        <div className='mx-auto items-center py-4 w-2/4 '>
            <div className='w-1/2 items-center mx-auto'>
                <input type='text' placeholder='Search...' className='bg-[#222222] opacity-50 text-white border rounded-md p-2 w-full focus:border-[#FF8B00]'/>
            </div>
        </div>
      <div className='max-w-6xl mx-auto py-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 lg:max-w-screen-xl'>
       
        {Array.from({ length: new Date().getUTCDate() }, (_, index) => (
          <div
            key={index}
            className='bg-[#222222] rounded-sm w-44 h-40 shadow-md px-1 transition-all duration-300 transform hover:bg-gray-300 hover:scale-105'>
            <Link
                 href={{
                    pathname: '/NoteForDay',
                    query: {
                      timestamp: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${index + 1}`,
                    }}}>
              <p className='text-[#F4F5FA] text-right'>{new Date().getMonth() + '/' + (index + 1)} </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Journal;