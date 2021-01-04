import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbarMerchant'
import Card from 'components/card'
import Support from 'api/support'
import Dropdown from 'components/forms/dropdown'
import { Link } from 'react-router-dom'
import Spinner from 'components/spinner'

const EditSupport = (props) => {

    const [isLoading, setLoading] = useState(false)
    const [id] = useState(props.match.params.id)
    const [data, setData] = useState([])
    const [message, setmessage] = useState('')
    const [hideInput, setHideInput] = useState(false);

    const getMessage = () => {
        Support.getTicketHistory(id).then((res) => {
            setHideInput(isClosed === -1 ? false : true)
            const a = res.data.map(a => {
                return {
                    name: a.name,
                    text: a.text,
                    lastUpdated: a.createdAt,
                    image: ""
                }
            })

            setData(a);
        })
    }

    useEffect(() => {
        setLoading(true)
        Support.getTicketHistory(id).then((res) => {
            const isClosed = res.data.map((el) => el.status).indexOf(0);
            setHideInput(isClosed === -1 ? false : true)
            const a = res.data.map(a => {
                return {
                    name: a.name,
                    text: a.text,
                    lastUpdated: a.createdAt,
                    image: ""
                }
            })

            setData(a);
            setLoading(false)
        })
    }, [id])



    function handleSubmit() {
        const formData = new FormData();
        formData.append('ticket_id', props.match.params.id)
        formData.append('message', message)
        Support.postReplyTicket(formData).then((res) => {
            getMessage()
        })
    }

    function handleChange(data) {
        setmessage(data)
    }

    const items = [
        {
            id: 1,
            value: 'Open'
        },
        {
            id: 0,
            value: 'Close'
        }
    ]

    return (
        <Spinner isLoading={isLoading}>
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="chat-history">
                    <Card ListData={data} />
                    {
                        hideInput ? (
                            <div className="ml-20 mt-5">
                                <div className="flex">
                                    <Link to={"/support"} className="border border-gray-300 text-red-600 rounded-md text-lg px-6 py-2 mr-4">Back</Link>
                                </div>
                            </div>) :
                            (
                                <div className="ml-16">
                                    <div className="flex flex-wrap items-start mt-4">
                                        <textarea onChange={e => handleChange(e.target.value)} placeholder="Message" className="w-full md:w-4/5 h-32 px-4 py-2 border border-gray-300 rounded-lg" />
                                    </div>
                                    <div className="w-40 form-categories border border-gray-300 rounded-md px-2 py-2 mr-4 my-2" role="button">
                                        <Dropdown title="Open" items={items} />
                                    </div>
                                    <div className="flex">
                                        <Link to={"/support"} className="border border-gray-300 text-red-600 rounded-md text-lg px-6 py-2 mr-4">Back</Link>
                                        <button onClick={handleSubmit} className="border lg:w-32 w-full text-white font-medium bg-red-600 rounded-lg text-lg px-10 py-2">Reply</button>
                                    </div>
                                </div>)
                    }
                </div>
            </section>
        </Spinner>
    )
}

export default EditSupport;
