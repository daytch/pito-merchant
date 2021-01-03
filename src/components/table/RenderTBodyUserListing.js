import React from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment'

const RenderTBodyUserListing = ({ itemBodyUser }) => {
    return (
        <>
            {
                itemBodyUser && itemBodyUser.map((item, index) => {
                    return (
                        <tr key={index} className="border-b border-gray-50">
                            <td className="text-center py-3 px-4 text-red-600 font-bold text-sm">{item.id}</td>
                            <td className="text-center py-3 px-4 text-red-600 font-bold text-sm"><Link className="hover:text-blue-500" to={{
                                pathname: `/user/${item.id}`,
                                query: item
                            }}>{item.name}</Link></td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light"><a className="hover:text-blue-500" href={"mailto:" + item.email}>{item.email}</a></td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.source}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.last_login ? moment(item.last_login).format('DD/MM/YYYY') : "-"}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.createdAt ? moment(item.createdAt).format('DD/MM/YYYY') : "-"}</td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default RenderTBodyUserListing;