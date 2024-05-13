import { useState } from "react"

export enum FilterAction {
    ADD = 'ADD',
    REMOVE = 'REMOVE'
}

interface FilterListProps {
    onFilter: (key: string, term: string, action : FilterAction) => void
    terms: string[]
    title: string
    filterKey: string
    filteredTerms: Set<string>
}


const FilterList = (props: FilterListProps) => {
    const { onFilter, terms, title, filterKey, filteredTerms } = props
    const [isCollapsed, setIsCollapsed] = useState(true)

    const handleFilterClick = (term: string) => {
        onFilter(filterKey, term, filteredTerms.has(term) ? FilterAction.REMOVE : FilterAction.ADD)
    }

    const termItems = terms.map((term) => {
        return (
            <li key={term} className="text-black cursor-pointer dark:text-white mx-4" 
                onClick={() => handleFilterClick(term)} >
                <input className="cursor-pointer" checked={filteredTerms.has(term)} type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
                </input>{term}
            </li>
        )
    })

    const filterCountText = filteredTerms.size > 0 ? `(${filteredTerms.size})` : ''
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