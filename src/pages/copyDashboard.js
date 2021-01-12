import React, { useState, useEffect } from 'react'
import SideNavbarMerchant from 'components/SideNavbarMerchant'
import Copy from 'components/forms/copy'
import Spinner from 'components/spinner'

const CopyDashboard = ({ match, location }) => {
    const [data] = useState(location.query)
    const [isLoading, setLoading] = useState(true)
    
    function openLoading() { setLoading(true) }

    function closeLoading() { setLoading(false) }
    
    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row">
                <SideNavbarMerchant />
                <div className="py-10 md:py-20 px-5 w-full">
                    <h6 className="text-red-600 font-bold text-lg">Copy Livestreams</h6>
                    <div className="mt-4">
                        <Copy id={data.id} openLoading={openLoading} closeLoading={closeLoading} data={data} />
                    </div>
                </div>
            </section>
        </Spinner>
    )
}

export default CopyDashboard;
