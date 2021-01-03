import React, { useEffect, useState } from 'react'
import SideNavbarMerchant from 'components/SideNavbarMerchant'
import Notification from 'components/notification'
import NotifAPI from 'api/notification'
import Spinner from 'components/spinner'

const Notif = () => {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    let arrRef = []

    function hideNotif(id) {
        arrRef[id].current.style.display = 'none'
    }
    function dismissAll() {
        arrRef.map((item) => {
            item.current.style.display = 'none'
        })
    }
    function markAll() {
        arrRef.map((item) => {
            item.current.style.backgroundColor="#eff7ff"
        })
    }
    useEffect(() => {
        setLoading(true)
        NotifAPI.getList().then(e => {
            setData(e.data)
            setLoading(false)
        })
    }, [])
    return (
        <Spinner isLoading={isLoading}>
            <section className="min-h-screen flex flex-col xl:flex-row">
                <SideNavbarMerchant />
                <div className="py-10 xl:py-20 shadow-2xl w-full xl:w-5/5 mx-auto">
                    <div className="flex justify-end xl:px-20">
                        <h6 className="text-red-600 mx-4 font-bold xl:text-lg border-b-2 border-red-600" role="button" onClick={dismissAll}>Dismiss All</h6>
                        <h6 className="text-red-600 mx-4 font-bold xl:ext-lg border-b-2 border-red-600" role="button" onClick={markAll}>Mark All as Read</h6>
                    </div>
                    <div className="mt-4">
                        {
                            data.map((item, index) => {
                                let notif = React.createRef()
                                arrRef.push(notif)
                                return <Notification hideNotif={hideNotif} ref={notif} index={index} key={index} data={item} />
                            })
                        }
                    </div>

                </div>
            </section>
        </Spinner>
    )
}

export default Notif;