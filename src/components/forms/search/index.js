import React from 'react'
import { ReactComponent as IconSearch } from 'assets/images/icon-search.svg'

const index = ({ name }) => {
    return (
        <>
            <div className="w-full md:w-2/5 flex">
                <input type="text" name={name} placeholder="Search..." className="border border-gray-300 text-lg px-2 w-full py-1 focus:outline-none" />
                <button className="px-1 py-1 bg-red-700 focus:outline-none hover:bg-red-600"><IconSearch /></button>
            </div>
        </>
    )
}

export default index;