import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

function Journal() {
  const { user } = useUser();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e:any) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);

    // using setTimeout:
    // clearTimeout(searchTimer);
    const searchTimer = setTimeout(() => search(newSearchText), 300); 
    // search(newSearchText); 
  };

  const search = (query:any) => {
    if (query !== '') {
      fetch(`/api/search?user_id=${user?.sub}&search_text=${query}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetch response:', data.userNotes.rows);
          setSearchResults(data.userNotes);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
    } else {
      setSearchResults([]);
    }
  };

  const showCalendarCards = searchText === '';

  return (
    <div className='bg-black w-screen h-screen items-center px-6 lg:px-32'>
      <div className='mx-auto items-center py-4 w-2/4 '>
        <div className='w-1/2 items-center mx-auto'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-[#222222] opacity-50 text-white border rounded-md p-2 w-full focus:border-[#FF8B00]'
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div
        className={`max-w-6xl mx-auto py-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 lg:max-w-screen-xl ${
          showCalendarCards ? 'transition-opacity opacity-100 scale-100' : 'opacity-0 scale-95 transition-all'}`}>
        {Array.from({ length: new Date().getUTCDate() }, (_, index) => (
          <div
            key={index}
            className='bg-[#222222] rounded-sm w-44 h-40 shadow-md px-1 transition-all duration-300 transform hover:bg-gray-600 hover:scale-105'>
            <Link 
              href={{
                pathname: '/NoteForDay',
                query: {
                  timestamp: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${index + 1}`,
                },
              }}>
              <p className='text-[#FF8B00] text-right'>{new Date().getMonth() + '/' + (index + 1)} </p>
            </Link>
          </div>
        ))}
      </div>
      
      {searchResults.length > 0 && (
        <div className="overlay">
          <div className="max-w-6xl mx-auto py-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 lg:max-w-screen-xl">
            {searchResults.map((result:any, index) => (
              <div key={index} className='bg-[#222222] rounded-sm w-44 h-40 shadow-md px-1 transition-all duration-300 transform hover:bg-gray-600 hover:scale-105'>
                <p className='text-[#FF8B00] text-right'>{result.timestamp} </p>
                <p className='text-white'>{result.input_text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Journal;


