import React, { useState, useEffect } from 'react'
import SideNavbarMerchant from 'components/SideNavbarMerchant'
import FullWidth from 'components/view-video/FullWidth'
// import thumbnail from 'assets/images/thumbnail-one.jpg'
import { Link } from 'react-router-dom'
import dashboard from 'api/dashboard'
import Spinner from 'components/spinner'
import livestream from 'api/livestream'


const Dashboard = () => {

    const [isLoading, setLoading] = useState(true)
    // const [now, setNow] = useState(moment())
    const [liveVideos, setLiveVideos] = useState([])
    const [previousVideos, setpreviousVideos] = useState([])
    const [upcomingVideos, setupcomingVideos] = useState([])
    const [phoneTooltip, setPhoneTooltip] = useState({
        show: false,
        x: 0,
        y: 0,
        orientLeft: false
    })

    const displayToolTip = () => {
        if (!phoneTooltip.show) {
            setPhoneTooltip(prev => ({ ...prev, show: true })); // show tooltip
            setTimeout(() => {
                setPhoneTooltip(prev => ({ ...prev, show: false })); // remove/hide tooltip
            }, 1500);
        }
    }

    useEffect(() => {
        dashboard.get().then((res) => {
            setLiveVideos(res.live_videos.data)
            setpreviousVideos(res.previous_videos.data)
            setupcomingVideos(res.upcoming_videos.data)
            setLoading(false)
        })
    }, []) //[liveVideos, previousVideos, upcomingVideos])

    function submitDelete(id) {

        setLoading(true)
        livestream.deleteLivestream(id).then((res) => {
            dashboard.get().then((res) => {
                setLiveVideos(res.live_videos.data)
                setpreviousVideos(res.previous_videos.data)
                setupcomingVideos(res.upcoming_videos.data)
                setLoading(false)
            })
        });
    }

    const DeleteButton = (id) => {
        return <button onClick={() => submitDelete(id)} className="font-semibold text-base md:text-lg text-red-600 mr-4">Delete</button>;
    };

    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row">
                <SideNavbarMerchant />
                <div className="py-10 md:py-20 px-5 w-full">
                    <div className="flex">
                        <Link to="/dashboard/create" className="w-1/6">
                            <button className="bg-red-600 focus:outline-none text-white font-medium text-sm w-full md:w-full px-2 py-2 rounded-3xl">Create Livestreams</button></Link>
                    </div>
                    <div className="flex flex-col pt-10 overflow-x-auto">
                        {phoneTooltip.show && (
                            <h3 style={{ color: 'green', textAlign: 'center' }}>URL copied.</h3>
                        )}
                        <div className="overflow-hidden">
                            {
                                liveVideos.length > 0 ? (<>
                                    <h6 className="text-red-600 font-bold text-base md:text-lg">Currently Live</h6>
                                    <div className="w-full mt-4">
                                        {
                                            liveVideos.map((item, index) => {
                                                const videos = [{ iframe: item.iframe, id: item.id, thumbnail: item.img_thumbnail, live: true, views: item.views, likes: item.likes, date: item.start_time, title: item.title, end_time: item.end_time, share_url: item.share_url, redirect_fb: item.redirect_fb, redirect_ig: item.redirect_ig, redirect_tiktok: item.redirect_tiktok  }]
                                                return (
                                                    <div key={index} className="w-full xl:w-1/2 mt-4">
                                                        <FullWidth displayToolTip={displayToolTip} actionLinks={'/dashboard/edit/' + item.id} dataVideos={videos} title={item.title} caption={item.description} category={item.categories} ig={item.instagram_url} fb={item.facebook_url} tiktok={item.tiktok_url} socmedCustom={true} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>) : null
                            }

                        </div>
                        <div className="overflow-hidden mb-4">
                            {
                                upcomingVideos.length > 0 ? (<>
                                    <h6 className="text-red-600 font-bold text-base md:text-lg">Next Livestreams</h6>
                                    <div className="flex flex-wrap">
                                        {
                                            upcomingVideos.map((item, index) => {
                                                const videos = [{ iframe: item.iframe, id: item.id, thumbnail: item.img_thumbnail, live: false, views: item.views, likes: item.likes, date: item.start_time, title: item.title, end_time: item.end_time, share_url: item.share_url, redirect_fb: item.redirect_fb, redirect_ig: item.redirect_ig, redirect_tiktok: item.redirect_tiktok }]
                                                return (
                                                    <div key={index} className="flex flex-wrap w-full xl:w-1/2 mt-4">
                                                        <FullWidth displayToolTip={displayToolTip} DeleteButton={DeleteButton} actionLinks={'/dashboard/edit/' + item.id} dataVideos={videos} title={item.title} actions={true} caption={item.description} category={item.categories} ig={item.instagram_url} fb={item.facebook_url} tiktok={item.tiktok_url} socmedCustom={true} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>) : null
                            }
                        </div>
                        <div className="overflow-hidden">
                            {
                                previousVideos.length > 0 ? (<>
                                    <h6 className="text-red-600 font-bold text-base md:text-lg">Previous Livestreams</h6>
                                    <div className="flex flex-wrap">
                                        {
                                            previousVideos.map((item, index) => {

                                                const videos = [{ iframe: item.iframe, id: item.id, thumbnail: item.img_thumbnail, live: false, views: item.views, likes: item.likes, date: item.start_time, title: item.title, end_time: item.end_time, share_url: item.share_url, redirect_fb: item.redirect_fb, redirect_ig: item.redirect_ig, redirect_tiktok: item.redirect_tiktok  }]

                                                return (
                                                    <div key={index} className="flex flex-wrap w-full xl:w-1/2 mt-4">
                                                        <FullWidth displayToolTip={displayToolTip} actionLinks={'/dashboard/edit/' + item.id} dataVideos={videos} title={item.title} viewsElement={true} actions={false} ig={item.instagram_url} fb={item.facebook_url} tiktok={item.tiktok_url} caption={item.description} category={item.categories} socmedCustom={true} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </>) : null
                            }
                        </div>
                    </div>
                </div>

            </section>
        </Spinner>
    )
}

export default Dashboard;
