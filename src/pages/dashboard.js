import React, { useState, useEffect } from 'react'
import SideNavbarMerchant from 'components/SideNavbarMerchant'
import FullWidth from 'components/view-video/FullWidth'
import { Link } from 'react-router-dom'
import dashboard from 'api/dashboard'
import Spinner from 'components/spinner'
import livestream from 'api/livestream'
import Moment from 'moment'
import Converter from 'configs/moment/DatetimeConverter'
import Pagination from 'components/forms/pagination'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const Dashboard = () => {

    const [isLoading, setLoading] = useState(true)
    const [liveVideos, setLiveVideos] = useState([])
    const [previousVideos, setPreviousVideos] = useState([])
    const [upcomingVideos, setUpcomingVideos] = useState([])
    const [activeLivePage, setActiveLivePage] = useState(1)
    const [activeNextPage, setActiveNextPage] = useState(1)
    const [activePrevPage, setActivePrevPage] = useState(1)
    const [totalLive, setTotalLive] = useState(1)
    const [totalPrevious, setTotalPreviuos] = useState(1)
    const [totalNext, setTotalNext] = useState(1)
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
        let page = 1
        let live_vid = 'live_videos'
        let next_vid = 'upcoming_videos'
        let prev_vid = 'previous_videos'

        livestream.getVideos({
            'type': live_vid,
            'page': page
        }).then((res) => {
            let listvidLive = res.data.filter(item => Moment(Converter.convertToLocal(new Date())).isSameOrBefore(Converter.convertToLocal(item.starDate)))

            setActiveLivePage(1)
            setTotalLive(Math.ceil(res.total_video / 10))
            setLiveVideos(listvidLive)
            setLoading(false)
        })

        livestream.getVideos({
            'type': next_vid,
            'page': page
        }).then((res) => {
            setLoading(false)
            setActiveNextPage(1)
            setTotalNext(Math.ceil(res.total_video / 10))
            setUpcomingVideos(res.data)
        })

        livestream.getVideos({
            'type': prev_vid,
            'page': page
        }).then((res) => {
            setPreviousVideos(res.data)
            setLoading(false)
            setActivePrevPage(1)
            setTotalPreviuos(Math.ceil(res.total_video / 10))
        })
        // dashboard.get().then((res) => {

        //     setLiveVideos(res.live_videos.data)
        //     setPreviousVideos(res.previous_videos.data)
        //     setUpcomingVideos(res.upcoming_videos.data)
        //     setLoading(false)
        // })
    }, [])

    function submitDelete(id) {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                livestream.deleteLivestream(id).then((res) => {
                    dashboard.get().then((res) => {
                        setLiveVideos(res.live_videos.data)
                        setPreviousVideos(res.previous_videos.data)
                        setUpcomingVideos(res.upcoming_videos.data)
                        MySwal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        ).then(() => {
                            getData(activeNextPage, 'upcoming_videos')
                        })
                    })
                })
            }
        })
    }

    function getData(e, tipe) {
        setLoading(true)
        const page = tipe === 'live_videos' ? activeLivePage : tipe === 'upcoming_videos' ? activeNextPage : activePrevPage
        livestream.getVideos({ 'type': tipe, 'page': e }).then((res) => {
            if (res.isSuccess) {
                switch (tipe) {
                    case 'live_videos':
                        let listvidLive = res.data.map((item) => {
                            return Moment(Converter.convertToLocal(new Date())).isSameOrBefore(Converter.convertToLocal(item.starDate))
                        })
                        setActiveLivePage(e)
                        setTotalLive(Math.ceil(res.total_video / 10))
                        setLiveVideos(listvidLive)
                        break;
                    case 'upcoming_videos':
                        setActiveNextPage(e)
                        setTotalNext(Math.ceil(res.total_video / 10))
                        setUpcomingVideos(res.data)
                        break;
                    case 'previous_videos':
                        setActivePrevPage(e)
                        setTotalPreviuos(Math.ceil(res.total_video / 10))
                        setPreviousVideos(res.data)
                        break;
                }
            } else {
                console.error(res)
            }
            setLoading(false)
        })
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
                        <Link to="/dashboard/create" className="w-full md:w-1/6">
                            <button className="text-xs rounded-xl bg-red-600 focus:outline-none text-white font-medium md:text-sm w-full md:w-full px-2 py-2 ceiled-3xl">Create Livestreams</button></Link>
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
                                                const videos = [{ iframe: item.iframe, id: item.id, thumbnail: item.img_thumbnail, live: true, views: item.views, likes: item.likes, date: item.start_time, title: item.title, end_time: item.end_time, share_url: item.share_url, redirect_fb: item.redirect_fb, redirect_ig: item.redirect_ig, redirect_tiktok: item.redirect_tiktok }]
                                                return (
                                                    <div key={index} className="w-full xl:w-1/2 mt-4">
                                                        <FullWidth displayToolTip={displayToolTip} actionLinks={'/dashboard/edit/' + item.id} dataVideos={videos} title={item.title} caption={item.description} category={item.categories} ig={item.instagram_url} fb={item.facebook_url} tiktok={item.tiktok_url} socmedCustom={true} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <Pagination pages={totalLive} getData={getData} tipe={'live_videos'} />
                                </>) : null
                            }
                        </div>
                        <div className="overflow-hidden mb-4">
                            {
                                upcomingVideos.length > 0 ? (<>
                                    <h6 className="text-red-600 font-bold text-base md:text-lg">Next Livestreams</h6>
                                    <div className="flex flex-wrap mb-2">
                                        {
                                            upcomingVideos.map((item, index) => {

                                                const videos = [{ iframe: item.iframe, id: item.id, thumbnail: item.img_thumbnail, live: false, views: item.views, likes: item.likes, date: item.start_time, title: item.title, end_time: item.end_time, share_url: item.share_url, redirect_fb: item.redirect_fb, redirect_ig: item.redirect_ig, redirect_tiktok: item.redirect_tiktok }]
                                                return (
                                                    <div key={index} className="flex flex-wrap mb-2 w-full xl:w-1/2 mt-4">
                                                        <FullWidth displayToolTip={displayToolTip} DeleteButton={DeleteButton} actionLinks={'/dashboard/edit/' + item.id} dataVideos={videos} title={item.title} actions={true} caption={item.description} category={item.categories} ig={item.instagram_url} fb={item.facebook_url} tiktok={item.tiktok_url} socmedCustom={true} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <Pagination pages={totalNext} getData={getData} tipe={'upcoming_videos'} />
                                </>) : null
                            }
                        </div>
                        <div className="overflow-hidden">
                            {
                                previousVideos.length > 0 ? (<>
                                    <h6 className="text-red-600 font-bold text-base md:text-lg">Previous Livestreams</h6>
                                    <div className="flex flex-wrap mb-2">
                                        {
                                            previousVideos.map((item, index) => {

                                                const videos = [{ iframe: item.iframe, id: item.id, thumbnail: item.img_thumbnail, live: false, views: item.views, likes: item.likes, date: item.start_time, title: item.title, end_time: item.end_time, share_url: item.share_url, redirect_fb: item.redirect_fb, redirect_ig: item.redirect_ig, redirect_tiktok: item.redirect_tiktok }]

                                                return (
                                                    <div key={index} className="flex flex-wrap mb-2 w-full xl:w-1/2 mt-4">
                                                        <FullWidth displayToolTip={displayToolTip} actionLinks={'/dashboard/edit/' + item.id} dataVideos={videos} title={item.title} viewsElement={true} actions={false} ig={item.instagram_url} fb={item.facebook_url} tiktok={item.tiktok_url} caption={item.description} category={item.categories} socmedCustom={true} />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <Pagination pages={totalPrevious} getData={getData} tipe={'previous_videos'} />
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
