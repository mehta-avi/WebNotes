import React from 'react'
import { useUser } from "@auth0/nextjs-auth0/client"
import LandingPage from "./LandingPage"
import Home from "./Home"

function Index() {
  const { user, error, isLoading } = useUser();

  const handleLogoutButtonClick = () => {
    window.location.href = "/api/auth/logout";
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    console.log(user.nickname)
    return (
      <body className='bg-black w-screen h-screen overflow-hidden'>
        <div className='flex flex-col justify-between md:flex-row md:max-w-full'>
          <div className='flex justify-start mt-3 mx-4'>
              <h1 className='text-[#EDEDED] text-opacity-50 font-bold'>Welcome {user.nickname}!</h1>
          </div>

          <div className='flex justify-end mt-3 mx-4'>
            <button onClick={handleLogoutButtonClick} className="hover:bg-orange-500 text-opacity-50 bg-[#111111] text-white py-2 px-5 rounded-md">Logout</button>
          </div>
        </div>
        <Home />
      </body>

    );
  }

  return (
    <LandingPage />
  )
}

export default Index