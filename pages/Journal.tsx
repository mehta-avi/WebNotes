import React from 'react';
import Link from 'next/link';

function Journal() {
  return (
    <body className='bg-black w-screen h-screen items-center px-6 lg:px-32'>
      <div className='max-w-6xl mx-auto py-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 lg:max-w-screen-xl'>
        {Array.from({ length: new Date().getUTCDate() }, (_, index) => (
          <div
            key={index}
            className='bg-[#222222] rounded-sm w-44 h-40 shadow-md px-1 transition-all duration-300 transform hover:bg-gray-300 hover:scale-105'>
            {/* Use the Link component to navigate to NotesForDay */}
            <Link
                 href={{
                    pathname: '/NoteForDay',
                    query: {
                      timestamp: `${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-${index + 1}`,
                    }}}>
              <p className='text-[#F4F5FA] text-right'>{new Date().getUTCMonth() + '/' + (index + 1)} </p>
            </Link>
          </div>
        ))}
      </div>
    </body>
  );
}

export default Journal;



// import { useRouter } from 'next/router';
// import React from 'react'
// import Link from 'next/link'
// import { useUser } from "@auth0/nextjs-auth0/client"


// function Journal() {
//     const { user } = useUser();

//     return (
//         <body className='bg-[#222222] w-screen h-screen items-center px-6 lg:px-32'>
//             <div className='max-w-6xl mx-auto py-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 lg:max-w-screen-xl'>
//                 {Array.from({ length: new Date().getUTCDate() }, (_, index) => (
//                     <div key={index} className='bg-[#444444] rounded-sm w-44 h-40 shadow-md px-1 transition-all duration-300 transform hover:bg-gray-300 hover:scale-105'>
//                         <Link href={`/api/get-note?user_id=${user?.sub}&timestamp=${new Date().getUTCFullYear()}-${new Date().getUTCMonth() + 1}-${index + 1}`}>
//                             <p className='text-right'>{new Date().getUTCMonth() + "/" + (index+1)} </p>
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </body>
//     )
// }

// export default Journal