import React from 'react'

const index = () => {
    const totalSearch = [{
        title: 'Lorem Ipsum',
        total: 3200
    }, {
        title: 'Lorem Ipsum',
        total: 2300
    },
    {
        title: 'Lorem Ipsum',
        total: 1800
    },
    {
        title: 'Lorem Ipsum',
        total: 1500
    },
    {
        title: 'Lorem Ipsum',
        total: 1250
    },
    {
        title: 'Lorem Ipsum',
        total: 1000
    },
    {
        title: 'Lorem Ipsum',
        total: 898
    },
    {
        title: 'Lorem Ipsum',
        total: 989
    },
    {
        title: 'Lorem Ipsum',
        total: 789
    },
    {
        title: 'Lorem Ipsum',
        total: 787
    }];
    return (
        <>
            {
                totalSearch.map((item, index) => {
                    //membuat numbering dari array
                    const increment = index + 1
                    return (
                        <div key={index} className="flex justify-between xxl:px-8 m-4 text-sm font-medium text-gray-400">
                            <h6>{increment}. {item.title}</h6>
                            <h6>{item.total}</h6>
                        </div>
                    )
                })
            }
        </>
    )
}

export default index;
