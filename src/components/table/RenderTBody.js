import React from 'react'
import { Link } from 'react-router-dom'

const RenderTBody = ({ itemBody }) => {
    return (
        <>
            {
                itemBody && itemBody.map((item, index) => {
                    return (
                        <tr key={index} className="border-b border-gray-50">
                            <td className="text-center py-3 px-4 text-red-600 font-bold text-sm">{item.id}</td>
                            <td className="text-center py-3 px-4 text-red-600 font-bold text-sm"><Link className="hover:text-blue-500" to={`/merchant-list/${item.id}`}>{item.merchantName}</Link></td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light"><Link className="hover:text-blue-500" to="mailto:jonsmith@mail.com">{item.email}</Link></td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.totalLivestream}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.totalUpcomingLivestream}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.totalFavourites}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.totalShare}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.totalViews}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.lastSession}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.joinedDate}</td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default RenderTBody;