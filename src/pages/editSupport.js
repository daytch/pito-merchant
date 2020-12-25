import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbarMerchant'
import Card from 'components/card'
import axios from 'configs/axios'

const EditSupport = (props) => {

    const tableBodySupport = [
        {
            name: 'Admin1',
            text: 'Lorem ipsum dolor sit amet',
            lastUpdated: "01/09/2020 (00:18)",
            image: ""
        },
        {
            name: 'Merchant1',
            text: 'consectetur adipiscing elit',
            lastUpdated: "01/09/2020 (00:18)",
            image: "https://web2tailwind.com/assets/docs/master/image-01.jpg"
        },
        {
            name: 'Admin1',
            text: 'Lorem ipsum dolor sit amet',
            lastUpdated: "01/09/2020 (00:18)",
            image: ""
        },
        {
            name: 'Merchant1',
            text: 'consectetur adipiscing elit',
            lastUpdated: "01/09/2020 (00:18)",
            image: "https://web2tailwind.com/assets/docs/master/image-01.jpg"
        },
        {
            name: 'Admin1',
            text: 'Lorem ipsum dolor sit amet',
            lastUpdated: "01/09/2020 (00:18)",
            image: ""
        },
        {
            name: 'Merchant1',
            text: 'consectetur adipiscing elit',
            lastUpdated: "01/09/2020 (00:18)",
            image: "https://web2tailwind.com/assets/docs/master/image-01.jpg"
        },
    ]

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('/merchant/listMessage?ticket_id='+ props.match.params.id+ '&page=1').then(e =>{
            const a = e.data.map(a=>{
                return {
                    name: a.name,
                    text: a.text,
                    lastUpdated: a.createdAt,
                    image: ""
                }
            })

            setData(a);
        })
    }, [])
    

    return (
        <>
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <Card ListData={data} />
            </section>
        </>
    )
}

export default EditSupport;
