import React from 'react'
import { ReactComponent as CloseNotif } from 'assets/images/close-icon.svg'
import Converter from 'configs/moment/DatetimeConverter'
import Moment from 'moment'

const index = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="flex justify-center items-center w-full md:px-4 py-4 border border-gray-100 bg-pink-500">
            <div className="notif-icon mx-4 md:mx-0" >
                <button role="button" onClick={() => props.hideNotif(props.index)} className="mx-auto">
                    <CloseNotif />
                </button>
            </div >
            <div className="notif-message mr-4 md:mr-0">
                <div className="flex-col">
                    <div className="flex flex-wrap">
                        <p className="text-gray-700 font-light text-xs md:text-sm">{props.data.title}</p>
                    </div>
                    <div className="flex pt-3">
                        <p className="text-gray-800 font-medium text-sm md:text-lg">{props.data.description}</p>

                    </div>
                </div>
            </div>
            <div className="notif-minute">
                <p className="font-light text-sm">{Moment(Converter.convertToLocal(props.data.createdAt)).fromNow()}</p>
            </div>
        </div >
    )
})

export default index;