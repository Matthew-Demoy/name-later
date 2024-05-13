import { useTheme } from "@/pages";
import { useState } from "react"

interface SearchBarProps {
    onSearch : (query: string) => void
    initialValue : string;
}

const SearchBar = (props : SearchBarProps) => {

    const { darkMode } = useTheme();
    
    const [query, setQuery] = useState(props.initialValue)
    const onSearch = (e: any) => {
        e.preventDefault()
        if(query === '') return
        props.onSearch(query)
    }

    return (
        <div className="w-full flex">
            <form onSubmit={onSearch} className="w-full flex">
                <input className="flex-grow h-12 text-lg focus:outline-none rounded-l focus:border-gray-500 dark:bg-slate-400 dark:placeholder-slate-600 dark:text-slate-600 dark:caret-black px-1" type="text" placeholder="Type here..."                
                    value={query}
                    onSubmit={onSearch} 
                    onInput={(e) => {setQuery(e.currentTarget.value)}}
                    />
                <button className={`bg-gray-800 hover:bg-gray-600 text-white  font-bold py-2 px-4 ${darkMode ? 'rounded-r' : 'rounded'} dark:bg-white dark:text-black`}
                onClick={onSearch}>Search</button>
            </form>
        </div>
    );
}

export default SearchBar;


