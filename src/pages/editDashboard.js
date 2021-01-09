import React, { useState, useEffect } from 'react'
import SideNavbarMerchant from 'components/SideNavbarMerchant'
import Edit from 'components/forms/edit'
import Spinner from 'components/spinner'

const EditDashboard = ({ match, location }) => {
    const [data] = useState(location.query)
    const [isLoading, setLoading] = useState(true)

    function openLoading() { setLoading(true) }

    function closeLoading() { setLoading(false) }
    useEffect(() => {

    })
    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row">
                <SideNavbarMerchant />
                <div className="py-10 md:py-20 px-5 w-full">
                    <h6 className="text-red-600 font-bold text-lg">{typeof data.desc !== "undefined" ? "Copy" : "Edit"} Livestreams</h6>
                    <div className="mt-4">
                        <Edit id={match.params.id} openLoading={openLoading} closeLoading={closeLoading} data={data} />
                    </div>
                </div>
            </section>
        </Spinner>
    )
}

export default EditDashboard;
