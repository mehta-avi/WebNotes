import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from "@auth0/nextjs-auth0/client"

function NotesForDay() {
  const { user } = useUser();
  const router = useRouter();
  const { timestamp } = router.query; // Access query parameters from the URL
 
  const formatTimestamp = (timestamp:any) => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
  };

  const handleSubmitSeeAll = () => {
    router.push('/Journal');
  };

  const handleSubmitNewNote = () => {
    router.push('/');
  };


  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`/api/get-note?user_id=${user?.sub}&timestamp=${timestamp}`);
        if (response.ok) {
          const data = await response.json();
        //   console.log('Fetched notes data:', data.userNotes.rows);
          const inputTexts = data.userNotes.rows.map((entry:any) => entry.input_text);
          setNotes(inputTexts); // Assuming the response contains an array of notes
        } else {
          console.error('Failed to fetch notes');
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    if (typeof window !== 'undefined') {
        fetchNotes();
    }
  }, [timestamp]);

  return (
    <div className='bg-black w-screen h-screen items-center px-6 lg:px-32'>
        <div className="py-24 h-full">
            <h1 className='text-white text-3xl italic'>Notes on {formatTimestamp(timestamp)}</h1>
            <div className='h-3/4 pt-10 px-4'>
                <ul>
                    {notes.map((text, index) => (
                    <li className='text-white text-xl' key={index}>{text}</li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col items-center w-full">
                <div className="z-10 mt-2">
                    <button className="bg-black text-white text-lg mr-56 px-4 py-2 rounded-md" onClick={handleSubmitSeeAll}>
                    See all notes
                    </button>
                    <button className="bg-black text-white text-lg px-4 py-2 rounded-md" onClick={handleSubmitNewNote}>
                    Write another note
                    </button>
                </div>
                <div className="opacity-40 h-72 w-6/12 bg-footer-gradient  absolute bottom-0"></div>

            </div>
        </div>
    </div>
    
  );
}

export default NotesForDay;