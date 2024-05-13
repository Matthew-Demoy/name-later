import SearchBar from '../components/SearchBar'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { createContext, useContext } from 'react';

export const ThemeContext = createContext({ darkMode: false, toggleDarkMode: () => {} });

export const useTheme = () => useContext(ThemeContext);

const HomePage = () => {
    const { darkMode, toggleDarkMode } = useTheme();
    const router = useRouter();
  
    const handleSearch = (query: string) => {
      router.push(`/s/${query}`);
    };

    return (                
            <main className='flex flex-col items-center justify-center min-h-screen dark:bg-slate-800'>
                <button className='absolute right-0 top-0 m-4 dark:text-white' onClick={toggleDarkMode}>{darkMode ? 'Dark' : 'Light'}</button>
                <h1 className="text-4xl font-bold m-3 tracking-tight text-gray-900 sm:text-6xl select z-10 dark:text-white">Find your next favorite book</h1>
                <div className='w-1/2 z-10'>
                    <SearchBar onSearch={handleSearch} initialValue=''/>
                </div>
            </main>                
    )
}

export default HomePage