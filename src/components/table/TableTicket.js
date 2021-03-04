import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import useSortableData from 'components/table/useSortableData'

const TableTicket = ({ itemHead, itemBody }) => {

    const { items, requestSort, sortConfig } = useSortableData(itemBody);
    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    return (
        <table className="md:text-md text-xs w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-pink-500 text-gray-700 font-semibold text-sm">
                <tr>
                    {
                        itemHead && itemHead.map((item, index) => {
                            return (
                                <th key={index} onClick={() => requestSort(item.value)} className={"text-center py-3 px-4 font-semibold text-sm " + getClassNamesFor(item.value)}>{item.title}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody className="text-gray-700">
            {
                items && items.map((item, index) => {
                    let title = item.title
                    return (
                        <tr key={index} className="border-b border-gray-50">
                            <td className="text-center py-3 px-4 text-red-600 font-bold text-sm">
                                <Link className="w-full" to={{
                                    pathname: `/support/edit/${item.ticketNumber}`,
                                    query: { title }
                                }}>{item.ticketNumber}</Link>
                            </td>
                            {/* <td className="text-center py-3 px-4 text-red-600 font-bold text-sm">{item.username}</td> */}
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.title}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{item.status}</td>
                            <td className="text-center py-3 px-4 text-gray-400 font-light">{moment(item.b).format('DD/MM/YYYY')}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default TableTicket;