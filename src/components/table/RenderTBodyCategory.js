import React from 'react'

const RenderTBodyCategory = ({ itemBodyCategory }) => {
    return (
        <>
            {
                itemBodyCategory && itemBodyCategory.map((item, index) => {
                    return (
                        <tr key={index} className="border-b border-gray-50">
                            <td className="text-center py-3 px-4 text-red-600 font-bold text-sm">{item.no}</td>
                            <td className="text-center py-3 px-4 text-gray-700 font-bold text-sm">{item.name}</td>
                            <td className="text-center py-3 px-4 text-gray-700 font-light">{item.slug}</td>
                            <td className="text-center py-3 px-4 text-gray-700 font-light">{item.totLivestream}</td>
                            <td className="text-center py-3 px-4 text-gray-700 font-light">{item.totMerchants}</td>
                            <td className="text-center py-3 px-4 text-gray-700 font-light">{item.totSearches}</td>
                            <td className="text-center py-3 px-4 text-gray-700 font-light">{item.totViews}</td>
                            <td className="text-center py-3 px-4 text-gray-700 font-light">{item.totFavourites}</td>
                            <td className="text-center py-3 px-4 text-gray-700 font-light">{item.totShared}</td>
                            <td className="flex-col py-4">
                                <button className="py-2 w-full px-4 bg-red-600 font-medium text-white rounded-3xl">Edit</button>
                                <button className="py-2 mt-2 w-full px-4 border border-red-600 font-medium text-red-600 rounded-3xl">Delete</button>
                            </td>
                        </tr>
                    )
                })
            }
        </>
    )
}

export default RenderTBodyCategory;
