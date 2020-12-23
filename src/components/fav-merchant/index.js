import React from 'react'

import { ReactComponent as AvatarDummy } from 'assets/images/avatar-dummy.svg'
import { ReactComponent as SubscriberIcon } from 'assets/images/subscriber-icon.svg'

const index = () => {

    const mostFavMerchant = [{
        name: 'Merchant Name',
        avatar: <AvatarDummy />,
        totalSubs: 2552000
    }, {
        name: 'Merchant Name',
        avatar: <AvatarDummy />,
        totalSubs: 2300
    },
    {
        name: 'Merchant Name',
        avatar: <AvatarDummy />,
        totalSubs: 1800
    },
    {
        name: 'Merchant Name',
        avatar: <AvatarDummy />,
        totalSubs: 1500
    },
    {
        name: 'Merchant Name',
        avatar: <AvatarDummy />,
        totalSubs: 1250
    },
    {
        name: 'Merchant Name',
        avatar: <AvatarDummy />,
        totalSubs: 1000
    },
    {
        name: 'Merchant Name',
        avatar: <AvatarDummy />,
        totalSubs: 898
    },
    {
        name: 'Merchant Name',
        avatar: <AvatarDummy />,
        totalSubs: 989
    },
    {
        name: 'Merchant Name',
        avatar: <AvatarDummy />,
        totalSubs: 789
    },
    {
        name: 'Merchant Name',
        avatar: <AvatarDummy />,
        totalSubs: 787
    }]
    return (
        <div className="flex flex-wrap items-center">
            {
                mostFavMerchant.map((item, index) => {
                    const increment = index + 1
                    return (
                        <div key={index} className="px-1 xl:w-full xxl:w-auto md:px-4 xl:px-0">
                            <div className="mt-3 flex items-center w-1/2 xxl:mx-0">
                                <h6>{increment}.</h6>
                                <div className="px-2">
                                    {item.avatar}
                                </div>
                                <div className="flex-col">
                                    <h6 className="font-semibold text-base text-red-600">{item.totalSubs}</h6>
                                    <h6 className="text-gray-900 text-xs font-medium flex items-center"><SubscriberIcon className="mr-1" /> Subscriber</h6>
                                </div>
                            </div>
                            <div className="text-gray-400 text-sm font-semibold px-5 py-2 xl:text-center">
                                <h5>{item.name}</h5>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default index;