import React, { useState, useEffect } from 'react'
import { ReactComponent as Arrow } from 'assets/images/arrow-custom.svg'
import { ReactComponent as ArrowWhite } from 'assets/images/arrow-white.svg'
import CustomHook from 'components/forms/CustomHook'


const Dropdown = ({ title, items = [], onClick, idx, isNeedReset }) => {
    const [titles, setTitles] = useState(title)
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)
    const [value, setValue] = useState(0);

    function useForceUpdate() {// integer state
        return () => setValue(value => value + 1); // update the state to force render
    }
    useEffect(() => {
        useForceUpdate()
    }, [])
    const innerRef = CustomHook.useOuterClick(e => {
        // counter state is up-to-date, when handler is called
        setOpen(false)
        useForceUpdate()
    });

    function handleOnClick(item) {
        useForceUpdate()
        if (item) {
            onClick(item, idx)
            setTitles(item.value)
            setOpen(false)
        } else {
            onClick(null, idx)
            setTitles("Select ...")
            setOpen(false)
        }
    }
    return (
        <div ref={innerRef} className="text-sm dd-wrapper border z-30 border-white w-56 px-2 py-0 w-full">
            <div role="button" onKeyPress={() => toggle(!open)}
                onClick={() => toggle(!open)} className="dd-header flex justify-between">
                <div className="text-sm dd-header_title">
                    <p className="dd-header_title--bold text-red-600">{titles}</p>
                </div>
                <div className="dd-header_action">
                    <p>{open ? <Arrow /> : <ArrowWhite />}</p>
                </div>
            </div>
            {open && (
                <ul className="dd-list flex-col py-1 absolute border border-gray-100 bg-white w-auto -mx-2 my-2">
                    {
                        typeof isNeedReset !== 'undefined' && isNeedReset ?
                            (<li className="dd-list-item px-4 py-1">
                                <div role="button" onClick={() => handleOnClick()}>Select . . .</div>
                            </li>) : null
                    }
                    {
                        items.map(item => (
                            <li className="dd-list-item px-4 py-1" key={item.id}>
                                <div role="button" onClick={() => handleOnClick(item)}>
                                    <span className="text-sm">{item.value}</span>
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
