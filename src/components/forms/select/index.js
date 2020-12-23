import React from 'react'

const SelectForm = ({ name, children }) => {
    return (
        <div className="flex-col px-2 xxl:px-8">
            <div className="">
                <select name={name} className="border border-gray-300 px-2 py-2 text-red-700 focus:outline-none cursor-pointer">
                    {
                        children
                    }
                </select>
            </div>
        </div>
    )
}

export default SelectForm;
