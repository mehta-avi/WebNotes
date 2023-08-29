import React from 'react'

function Journal() {

    return (
      <body className='bg-[#222222] w-screen h-screen items-center px-6 lg:px-32'>

        <div className='max-w-6xl mx-auto py-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 lg:max-w-screen-xl'>
            {Array.from({ length: new Date().getUTCDate() }, (_, index) => (
                <div key={index} className='bg-[#444444] rounded-sm w-44 h-40 shadow-md px-1 transition-all duration-300 transform hover:bg-gray-300 hover:scale-105'>
                    <p className='text-right'>{new Date().getUTCMonth() + "/" + (index+1)}</p>
                </div>
            ))}
        </div>
    </body>
      )
}

export default Journal