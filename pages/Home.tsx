import React, { useState } from 'react';
import Head from 'next/head'; // Import the Head component
import { useRouter } from 'next/router';

function Home({user}:any) {
  const [text, setText] = useState('');
  const router = useRouter(); // Import the useRouter hook

  const handleChange = (event:any) => {
    const element = event.target;
    element.style.height = 'auto'; // Reset the height to auto
    const scrollHeight = Math.max(element.scrollHeight, 176); // Use a minimum height of 44px
    element.style.height = scrollHeight + 'px'; // Set the height based on scroll height
    setText(event.target.value);
  };

  const handleSubmit = async () => {
    if (text.length > 0) {
      try{
        const response = await fetch('/api/add-note', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user.sub, // Assuming you have user ID available
            input_text: text,
            input_number: 42, // Adjust as needed
          }),
        });

        if (response.ok) {
          console.log('Note submitted successfully.');
          console.log('id is ' + user.sub)
          router.push('/Submitted');
        } else {
          console.error('Failed to submit note.');
        }
      } catch (error) {
        console.error('Error while submitting note:', error);
      }
    }
  };
      
    return (
    <div>
      <Head>
        <title>My Home Page</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      <div className='items-center flex-auto justify-center w-screen lg:px-32'>
        <div className="flex justify-center">
          <div className="relative w-6/12 h-12 max-h-12">
            <div className='flex flex-col w-full h-screen'>

              <div className='relative w-full h-fit my-auto'>
                <textarea
                    id="note_entry"
                    placeholder="Let's talk"
                    className='pr-3 pl-4 pt-2 h-44 w-full mx-auto resize-none whitespace-normal placeholder:opacity-70 transition-all duration-300 line-clamp-4 tracking-wider leading-relaxed focus:outline outline-none shadow-cyan-500/50 placeholder-white text-2xl text-white rounded-xl bg-gradient-to-b from-[#FF8B00] from-10% via-[#803B00] via-54% to-black to-95%'
                    value={text}
                    onChange={handleChange}
                ></textarea>
              <div className='my-12'>
              </div>
              <div className= 'relative w-full min-h-8 h-8 flex justify-end'> 
                {text.length > 0 && (
                  <button className='text-[#FF8B00] opacity-80 hover:opacity-100 transition-all ease-in-out float-right' onClick={handleSubmit}>
                    <i className="material-icons text-5xl">navigate_next</i>
                  </button>
                )} 
            </div>               
          </div> 
        </div>
      </div>
      </div>  
    </div>
  </div>
)}

export default Home
