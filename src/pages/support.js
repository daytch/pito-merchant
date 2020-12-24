import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbarMerchant'
import Table from 'components/table/index'
import { Link } from 'react-router-dom'
import support from 'api/support'
import Spinner from 'components/spinner'
import moment from 'moment'


const Supports = () => {

    const [isLoading, setLoading] = useState(true)
    const [bodySupport, setBody] = useState([]);

    useEffect(() => {
        support.getList().then((res) => {
            let data = res.data;
            let arr1 = data.map((item) => {
                return {
                    ticketNumber: item.id,
                    tittle: item.title,
                    status: item.status < 1 ? "Closed" : "Open",
                    lastUpdated: moment(item.last_session).format('YYYY-MM-DD HH:mm:ss')
                }
            });
            setBody(arr1);
            setLoading(false);
        })
    }, []);

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

    return (
        <Spinner isLoading={isLoading}>
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="py-20 px-5 w-full">
                    <div className="tickets flex justify-end">
                        <Link to="/support/create" className="flex w-full justify-end">
                            <button className="bg-red-600 rounded-2xl text-sm xl:text-lg px-6 py-2 w-2/5 md:w-1/4 text-white">New Tickets</button>
                        </Link>
                    </div>
                    <div className="flex pt-10 overflow-x-auto">
                        <Table itemHead={tableHeadTickets} itemBodySupport={bodySupport} />
                    </div>
                </div>

            </section>
        </Spinner>
    )
}

export default Supports;
