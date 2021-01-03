import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export const RenderTBodySupport = ({ itemBodySupport }) => {
    return (
        <>
            {
                itemBodySupport && itemBodySupport.map((item, index) => {
                    return (
                        <tr key={index} className="border-b border-gray-50">
                            <td className="text-center py-3 px-4 text-red-600 font-bold text-sm">
                                <Link className="w-full" to={`/support/edit/${item.ticketNumber}`}>{item.ticketNumber}</Link>
                            </td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.tittle}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.status === 0 ? "Close" : "Open"}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.lastUpdated ? moment(item.lastUpdated).format('DD/MM/YYYY') : "-"}</td>
                        </tr>
                    )
                })
            }
        </>
    )
}
