import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbarMerchant'
import TableTicket from 'components/table/TableTicket'
import { Link } from 'react-router-dom'
import Support from 'api/support'
import Spinner from 'components/spinner'

const Supports = () => {
    const [isLoading, setLoading] = useState(false)

    const tableHeadTickets = [
        {
            title: "Ticket Number",
            value: 'ticketNumber'
        },
        {
            title: "Title",
            value: 'title'
        },
        {
            title: "Status",
            value: 'status'
        },
        {
            title: "Last Session",
            value: 'lastUpdated'
        }
    ];


    const [ticket, setTicket] = useState([])

    useEffect(() => {
        setLoading(true)
        Support.getList().then(e=>{
           const a = e.data.map(e=>{
               return {
                   ticketNumber: e.id,
                   title: e.title,
                   status: e.status,
                   lastUpdated: e.last_session
               }
           })

           setTicket(a)
           setLoading(false)
       });
    }, [])

    return (
        <Spinner isLoading={isLoading}>
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="py-20 px-5 w-full">
                    <div className="tickets flex justify-end">
                    <Link to="/support/create" className="flex w-3/5 justify-end">
                        <button className="rounded-xl text-sm bg-red-600 md:rounded-2xl xl:text-lg md:px-6 md:py-2 w-2/5 md:w-1/4 text-white">New Tickets</button>
                        </Link>
                    </div>
                    <div className="flex pt-10 text-sm overflow-x-auto">
                        <TableTicket itemHead={tableHeadTickets} itemBody={ticket} />
                    </div>
                </div>

            </section>
        </Spinner>
    )
}

export default Supports;
