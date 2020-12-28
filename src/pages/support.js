import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbarMerchant'
import Table from 'components/table/index'
import { Link } from 'react-router-dom'
import axios from 'configs/axios'


const Supports = () => {
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


    const [ticket, setTicket] = useState([])

    useEffect(() => {
       axios.get('/merchant/listTicket').then(e=>{
           const a = e.data.map(e=>{
               return {
                   ticketNumber: e.id,
                   tittle: e.title,
                   status: e.status,
                   lastUpdated: e.last_session
               }
           })

           setTicket(a)
       });
    }, [])

    return (
        <>
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="py-20 px-5 w-full">
                    <div className="tickets flex justify-end">
                    <Link to="/support/create" className="flex w-full justify-end">
                        <button className="bg-red-600 rounded-2xl text-sm xl:text-lg px-6 py-2 w-2/5 md:w-1/4 text-white">New Tickets</button>
                        </Link>
                    </div>
                    <div className="flex pt-10 overflow-x-auto">
                        <Table itemHead={tableHeadTickets} itemBodySupport={ticket} />
                    </div>
                </div>

            </section>
        </>
    )
}

export default Supports;
