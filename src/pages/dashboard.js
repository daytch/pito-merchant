import React, { useState, useEffect } from 'react'
import SideNavbarMerchant from 'components/SideNavbarMerchant'
import FullWidth from 'components/view-video/FullWidth'
// import thumbnail from 'assets/images/thumbnail-one.jpg'
import { Link } from 'react-router-dom'
import dashboard from 'api/dashboard'
import Spinner from 'components/spinner'


const Dashboard = () => {

    const [isLoading, setLoading] = useState(true)
    // const [now, setNow] = useState(moment())
    const [liveVideos, setLiveVideos] = useState([])
    const [previousVideos, setpreviousVideos] = useState([])
    const [upcomingVideos, setupcomingVideos] = useState([])

    useEffect(() => {
        dashboard.get().then((res) => {
            setLiveVideos(res.live_videos.data)
            setpreviousVideos(res.previous_videos.data)
            setupcomingVideos(res.upcoming_videos.data)
            setLoading(false)
        })
    }, []) //[liveVideos, previousVideos, upcomingVideos])

    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row">
                <SideNavbarMerchant />
                <div className="py-10 md:py-20 px-5 w-full">
                    <div className="flex">
                        <Link to="/dashboard/create" className="w-full"><button className="bg-red-600 focus:outline-none text-white font-medium text-sm xl:text-lg w-1/2 md:w-1/4 px-2 py-2 rounded-3xl">Create Livestreams</button></Link>
                    </div>
                    <div className="flex flex-col pt-10 overflow-x-auto">
                        <div className="overflow-hidden">
                            <h6 className="text-red-600 font-bold text-base md:text-lg">Currently Live (if any)</h6>
                            <div className="flex flex-wrap w-full mt-4">
                                {
                                    liveVideos.map((item, index) => {
                                        const videos = [{ id: item.id, thumbnail: item.img_thumbnail, live: true, views: 260.000, shared: 989, date: item.start_time, title: item.title }]
                                        return (
                                            <div key={index} className="flex flex-wrap w-full xl:w-1/2 mt-4">
                                                <FullWidth dataVideos={videos} title={item.title} caption={item.description} category={item.categories} socmedCustom={true} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="overflow-hidden mb-4">
                            <h6 className="text-red-600 font-bold text-base md:text-lg">Next Livestreams</h6>
                            <div className="flex flex-wrap">
                                {
                                    upcomingVideos.map((item, index) => {
                                        const videos = [{ id: item.id, thumbnail: item.img_thumbnail, live: false, views: 260.000, shared: 989, date: item.start_time, title: item.title }]
                                        return (
                                            <div key={index} className="flex flex-wrap w-full xl:w-1/2 mt-4">
                                                <FullWidth actionLinks="/dashboard/edit" dataVideos={videos} title={item.title} actions={true} caption={item.description} category={item.categories} socmedCustom={true} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <h6 className="text-red-600 font-bold text-base md:text-lg">Previous Livestreams</h6>
                            <div className="flex flex-wrap">
                                {
                                    previousVideos.map((item, index) => {
                                        const videos = [{ id: item.id, thumbnail: item.img_thumbnail, live: false, views: 260.000, shared: 989, date: item.start_time, title: item.title }]
                                        return (
                                            <div key={index} className="flex flex-wrap w-full xl:w-1/2 mt-4">
                                                <FullWidth dataVideos={videos} title={item.title} viewsElement={true} actions={false} caption={item.description} category={item.categories} socmedCustom={true} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </Spinner>
    )
}

export default Dashboard;
