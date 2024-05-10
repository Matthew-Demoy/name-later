import { useState } from "react"

interface FilterListProps {
    onFilter: (key: string, filteredTerms: string[]) => void
    terms: string[]
    title: string
    filterKey: string
    filteredTerms: string[]
}


const FilterList = (props: FilterListProps) => {
    const { onFilter, terms, title, filterKey, filteredTerms } = props
    const [isCollapsed, setIsCollapsed] = useState(true)


    const termItems = terms.map((term) => {
        return (
            <li key={term} className="text-black dark:text-white mx-4" >{term}</li>
        )
    })

    const filterCountText = filteredTerms.length > 0 ? `(${filteredTerms.length})` : ''
    return (
        <div>            
            <button onClick={() => setIsCollapsed(!isCollapsed)}> {title} {filterCountText} {isCollapsed ? '⌃' : '⌄'} </button>
            <ul
                className={`flex flex-col ${isCollapsed ? 'hidden' : ''}`}
            >
                {termItems}
            </ul>
        </div>
    )

}


export default FilterList