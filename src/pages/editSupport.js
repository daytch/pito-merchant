import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbarMerchant'
import Card from 'components/card'
import Support from 'api/support'

const EditSupport = (props) => {

    const [id] = useState(props.match.params.id)
    const [data, setData] = useState([])
    const [message, setmessage] = useState('')

    const getMessage = () => {
        Support.getTicketHistory(id).then((res) => {
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
        Support.getTicketHistory(id).then((res) => {
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


    return (
        <>
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="chat-history">
                    <Card ListData={data} />
                    <div className="ml-16">
                        <div className="flex flex-wrap items-start mt-4">
                            <textarea onChange={e => handleChange(e.target.value)} placeholder="Message" className="w-full md:w-4/5 h-32 px-4 py-2 border border-gray-300 rounded-lg" />
                        </div><br />
                        <div className="flex mt-6">
                            <button onClick={handleSubmit} className="border lg:w-32 w-full text-white font-medium bg-red-600 rounded-lg text-lg px-10 py-2">Reply</button>
                        </div>
                    </div>

                </div>

            </section>
        </>
    )
}

export default EditSupport;
