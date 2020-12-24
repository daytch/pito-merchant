import React from 'react'
import Sidebar from 'components/SideNavbarMerchant'
import Card from 'components/card'

const EditSupport = () => {
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
    return (
        <>
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <Card ListData={tableBodySupport} />
            </section>
        </>
    )
}

export default EditSupport;
