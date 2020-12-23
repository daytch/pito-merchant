import React from 'react'
import { Link } from 'react-router-dom'


const ListMenu = ({ linkTo, children, button, logout }) => {
    return (
        <>
            <div className="list-menu py-3 my-2 hover:bg-black transition-all duration-200" role={button}
                onClick={logout}>
                <Link to={linkTo ? linkTo : "#"} className="link-wrapped">
                    {
                        children
                    }
                </Link>
            </div>
        </>
    )
}

export default ListMenu;
