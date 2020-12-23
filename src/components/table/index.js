import React from 'react'

import RenderTHead from './RenderTHead'
import RenderTBody from './RenderTBody'
import RenderTBodyUserListing from './RenderTBodyUserListing'
import RenderTBodyTickets from './RenderTBodyTickets'
import RenderTBodyCategory from './RenderTBodyCategory'
import { RenderTBodySupport } from './RenderTBodySupport'

const index = ({ itemHead, itemBody, itemBodyUser, itemBodyTickets, itemBodyCategory, itemBodySupport }) => {

    return (
        <>
            <table className="w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-pink-500 text-gray-700 font-semibold text-lg">
                    <tr>
                        <RenderTHead itemHead={itemHead} />
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {
                        itemBody && <RenderTBody itemBody={itemBody} />
                    }

                    {
                        itemBodyUser && <RenderTBodyUserListing itemBodyUser={itemBodyUser} />
                    }
                    {
                        itemBodyTickets && <RenderTBodyTickets itemBodyTickets={itemBodyTickets} />
                    }
                    {
                        itemBodyCategory && <RenderTBodyCategory itemBodyCategory={itemBodyCategory} />
                    }
                    {
                        itemBodySupport && <RenderTBodySupport itemBodySupport={itemBodySupport} />
                    }
                </tbody>
            </table>
        </>
    )
}

export default index;
