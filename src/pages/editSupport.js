import React from 'react'
import Sidebar from 'components/SideNavbarMerchant'
import Table from 'components/table/index'

const EditSupport = () => {
    const tableHeadTickets = [
        {
            title: "Ticket Number"
        },
        {
            title: "Tittle"
        },
        {
            title: "Status"
        },
        {
            title: "Last Updated"
        },
    ];

    const tableBodySupport = [
        {
            ticketNumber: '#10111456101',
            tittle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            status: 'Open/Closed',
            lastUpdated: "01/09/2020 (00:18)",
        },
        {
            ticketNumber: '#10111456102',
            tittle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            status: 'Open/Closed',
            lastUpdated: "01/09/2020 (00:18)",
        },
        {
            ticketNumber: '#10111456103',
            tittle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
            status: 'Open/Closed',
            lastUpdated: "01/09/2020 (00:18)",
        },

    ]
    return (
        <>
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="py-20 px-5 w-full">
                    <div className="tickets flex justify-end">
                        <button className="bg-red-600 rounded-2xl text-sm xl:text-lg px-6 py-2 w-2/5 md:w-1/4 text-white">New Tickets</button>
                    </div>
                    <div className="flex pt-10 overflow-x-auto">
                        <Table itemHead={tableHeadTickets} itemBodySupport={tableBodySupport} />
                    </div>
                </div>

            </section>
        </>
    )
}

export default EditSupport;
