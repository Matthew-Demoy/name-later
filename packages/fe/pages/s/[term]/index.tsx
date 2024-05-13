import FilterList, { FilterAction } from "@/components/FilterList";
import { SKU } from "@/components/Item";
import ItemGrid from "@/components/ItemGrid";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "next/router";
import { useState } from "react";

const Listings = () => {
    // get the term from the URL
    const router = useRouter();
    const { term } = router.query;
    const [filteredTerms, setFilteredTerms] = useState<{ [filerKey: string]: Set<string> }>({ price: new Set<string>() });

    const handleFilter = (key: string, term: string, action: FilterAction) => {
        const newFilteredTerms = { ...filteredTerms };
        if (action === FilterAction.ADD) {
            newFilteredTerms[key].add(term);
        } else if (action === FilterAction.REMOVE) {
            newFilteredTerms[key].delete(term);
        }
        setFilteredTerms(newFilteredTerms);
    }

    //genereate items based on SKU interface

    const items: SKU[] = Array.from({ length: 10 }, (_, i) => ({
        id: `item${i + 1}`,
        title: `Item ${i + 1}`,
        author: `Author ${i + 1}`,
        price: 50,
        inventory: 10,
        image: `https://via.placeholder.com/150?text=Item+${i + 1}`,
        description: `This is the description for Item ${i + 1}.`,
      }));

    console.log(term)
    return (

        <div className="flex flex-col items-center min-h-screen md:mx-10 sm:mx-1">
            <div className="flex flex-row w-full items-center justify-between mt-5">
                <div >
                    <span className="border-r-2 pr-2 border-black">ON SALE</span>
                    <span className="pl-2">BEST SELLERS</span>
                </div>
                <div>
                    <span>Account</span>
                </div>

            </div>
            <div className="flex flex-row w-full items-center my-5">
                <h1 className="font-bold text-2xl sm:test=6xl select-none w-3/12">Books Store</h1>
                <div className={'w-8/12'}>
                    <SearchBar onSearch={(query) => { }} initialValue={term} />
                </div>
                <div className={'w-1/12 flex justify-end'}>
                    <button className="mr-5 bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded dark:bg-white dark:text-black" onClick={() => router.push('/cart')}>Cart</button>
                </div>
            </div>
            <span>
                <button className="text-black bold dark:text-white mx-4">Fiction</button>
                <button className="text-black dark:text-white mx-4">Non-Fiction</button>
                <button className="text-black dark:text-white mx-4">Teen & YA</button>
                <button className="text-black dark:text-white mx-4">Kids</button>
            </span>
            <div className="flex flex-row w-full justify-between items-center mt-5 mb-2">
                <div>
                    Search results for:
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl select z-10 dark:text-white">
                        {term} (93)
                    </h3>
                </div>
                <span>
                    Sort By
                </span>
            </div>
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/5  border-black border-r-2" >
                    <FilterList onFilter={handleFilter} terms={['5-10$', '10-25$']} title={'Price'} filterKey={'price'} filteredTerms={filteredTerms['price']} />
                </div>

                <div className="flex flex-col w-4/5 " >
                    <ItemGrid items={items} />

                </div>
            </div>

        </div>
    );



}

export default Listings;