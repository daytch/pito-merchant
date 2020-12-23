import React, { useState } from 'react'
import { ReactComponent as Arrow } from 'assets/images/arrow-custom.svg'
import { ReactComponent as ArrowWhite } from 'assets/images/arrow-white.svg'


const Dropdown = ({ title, items = [], onClick, idx }) => {
    const [titles, setTitles] = useState(title)
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)
    function handleOnClick(item) {
        console.log(onClick)
        onClick(item, idx)
        setTitles(item.value)
        setOpen(false)
    }
    return (
        <div className="dd-wrapper border z-30 border-gray-100 w-56 px-2 py-2">
            <div role="button" onKeyPress={() => toggle(!open)}
                onClick={() => toggle(!open)} className="dd-header flex justify-between">
                <div className="dd-header_title">
                    <p className="dd-header_title--bold text-red-600">{titles}</p>
                </div>
                <div className="dd-header_action">
                    <p>{open ? <Arrow /> : <ArrowWhite />}</p>
                </div>
            </div>
            {open && (
                <ul className="dd-list flex-col py-3 absolute border border-gray-100 bg-white w-auto -mx-2 my-2">
                    {
                        items.map(item => (
                            <li className="dd-list-item px-4 py-1" key={item.id}>
                                <div role="button" onClick={() => handleOnClick(item)}>
                                    <span>{item.value}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
    )
}

export default Dropdown;
