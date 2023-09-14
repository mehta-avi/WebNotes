import { useRouter } from 'next/router';
import React from 'react'

function LandingPage() {
  const router = useRouter(); // Import the useRouter hook

  const handleSubmit = () => {
      router.push('api/auth/login');
  }

  return (
    <div className="bg-black h-screen w-screen flex justify-center items-center">
      <div className='text-center p-8 rounded-lg'>
        <h1 className="text-[#FF8B00] text-4xl mb-4">Welcome to your Private Journal on the Internet</h1>
        <button className="bg-[#222222] text-[#FF8B00] mt-8 px-4 py-2 rounded-md" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}

export default LandingPage;