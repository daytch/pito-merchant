import React from 'react'

const RenderTBodyTickets = ({ itemBodyTickets }) => {
    return (
        <>
            {
                itemBodyTickets && itemBodyTickets.map((item, index) => {
                    return (
                        <tr key={index} className="border-b border-gray-50">
                            <td className="text-center py-3 px-4 text-red-600 font-bold text-sm">{item.ticketNumber}</td>
                            <td className="text-center py-3 px-4 text-red-600 font-bold text-sm">{item.username}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.tittle}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.status}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.lastSession}</td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default RenderTBodyTickets;