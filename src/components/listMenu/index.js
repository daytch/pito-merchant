import React from 'react'
import { NavLink } from 'react-router-dom'


const ListMenu = ({ linkTo, children, button, logout }) => {
    return (
        <>
            <div className="list-menu py-3 my-2 hover:bg-black transition-all duration-200">
                <NavLink to={linkTo ? linkTo : "#"} onClick={button ? logout : null} activeClassName={button ? "" : "active"} className="link-wrapped">
                    {
                        children
                    }
                </NavLink>
            </div>
        </>
    )
}

export default ListMenu;
