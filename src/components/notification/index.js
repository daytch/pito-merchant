import React from 'react'
import { ReactComponent as CloseNotif } from 'assets/images/close-icon.svg'

const index = () => {
    return (
        <div className="flex justify-center items-center w-full md:px-4 py-4 border border-gray-100 bg-pink-500">
            <div className="notif-icon mx-4 md:mx-0">
                <CloseNotif className="mx-auto" />
            </div>
            <div className="notif-message mr-4 md:mr-0">
                <div className="flex-col">
                    <div className="flex flex-wrap">
                        <p className="text-gray-700 font-light text-xs md:text-sm">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ..."</p>
                    </div>
                    <div className="flex pt-3">
                        <p className="text-gray-800 font-medium text-sm md:text-lg">Lorem ipsum dolor sit amet</p>

                    </div>
                </div>
            </div>
            <div className="notif-minute">
                <p className="text-white font-light text-sm">15 minutes ago</p>
            </div>
        </div>
    )
}

export default index;