import React, { useState, useEffect } from 'react'
import SideNavbarMerchant from 'components/SideNavbarMerchant'
import { ReactComponent as FbIcon } from 'assets/images/fb-icon.svg'
import { ReactComponent as IgIcon } from 'assets/images/ig-icon.svg'
import { ReactComponent as TtIcon } from 'assets/images/tiktok-icon.svg'

import Dropdown from 'components/forms/dropdown'
import LineCustom from 'components/graphic-chart/LineCustom'
import HistoryLivestreams from 'components/view-video/user-livestream'
import { Link } from 'react-router-dom'
import User from 'api/users'
import Spinner from 'components/spinner'
import moment from 'moment'
import Avatar from 'react-avatar'

const Profile = () => {

    // const [name] = useState(localStorage.getItem('PITO:merchant-name'))
    const [avatar, setAvatar] = useState();
    const [category, setCategory] = useState([]);
    const [videos, setVideos] = useState([]);
    const [fb, setFB] = useState();
    const [ig, setIG] = useState();
    const [tiktok, setTiktok] = useState();
    const [about, setAbout] = useState();
    const [name, setName] = useState();
    const [isLoading, setLoading] = useState(true)
    const [data, setData] = useState();
    const [fav, setFav] = useState();
    const [share, setShare] = useState();
    const [view, setView] = useState();
    const [Totalfav, setTotalFav] = useState(0);
    const [Totalshare, setTotalShare] = useState(0);
    const [Totalview, setTotalView] = useState(0);
    const [tipe, setTipe] = useState('')
    const [value, setValue] = useState(0);
    const [category1, setCategory1] = useState("")
    const [category2, setCategory2] = useState("")
    const [category3, setCategory3] = useState("")
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
        User.getProfile().then((res) => {
            let data = res.data;
            
            let cat1 = typeof data.categories[0] === "undefined" ? "Category" : data.categories[0].name
            let cat2 = typeof data.categories[1] === "undefined" ? "Category" : data.categories[1].name
            let cat3 = typeof data.categories[2] === "undefined" ? "Category" : data.categories[2].name
            setCategory1(cat1)
            setCategory2(cat2)
            setCategory3(cat3)
            let dataUser = {
                "email": data.email,
                "name": data.name,
                "img_avatar": data.img_avatar,
                "about": data.about,
                "categories": data.categories,
                "company_website": data.company_website,
                "fb_url": data.fb_url,
                "ig_url": data.ig_url,
                "tiktok_url": data.tiktok_url
            };
            setData(dataUser);
            setAvatar(data.img_avatar);
            setCategory(data.categories);
            setFB(data.fb_url);
            setIG(data.ig_url);
            setTiktok(data.tiktok_url);
            setAbout(data.about);
            setName(data.name);
            setVideos(data.history_videos);
            let arrFav = data.fav_month; //.map(item => item.total)
            setFav(arrFav);
            let arrShare = data.shared_month; //.map(item => item.total)
            setShare(arrShare);
            setTotalFav(data.total_fav);
            setTotalShare(data.total_shared);
            setTotalView(data.total_view);
            let arrView = data.view_month; //.map(item => item.total)
            setView(arrView);
            setLoading(false);
        });
    }, [])

    function changeDateid(e) {
        setTipe(e.value)
        let arrVideos = []
        switch (e.value) {
            case "Date":
                arrVideos = videos.sort((a, b) => (moment(a.start_time).isAfter(b.start_time)) ? -1 : 1);
                break;
            case "Views":
                arrVideos = videos.sort((a, b) => (a.views > b.views) ? -1 : 1);
                break;
            case "Favourites":
                arrVideos = videos.sort((a, b) => (a.likes > b.likes) ? -1 : 1);
                break;
            default:
                arrVideos = videos.sort((a, b) => (a.id > b.id) ? -1 : 1);
                break;
        }
        setVideos(arrVideos)
        useForceUpdate()
    }
    function useForceUpdate() {// integer state
        return () => setValue(value => value + 1); // update the state to force render
    }
    const MostRecent2 = [
        {
            id: 1,
            value: 'Date'
        },
        {
            id: 2,
            value: 'Views'
        }, {
            id: 3,
            value: 'Favourites'
        },
        // {
        //     id: 4,
        //     value: 'Shares'
        // }
    ]
    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row">
                <SideNavbarMerchant />
                <div className="py-10 md:pt-10 flex flex-col md:flex-row w-full">
                    <div className="w-full md:w-3/5 xxl:w-1/2 px-4">
                        <div className="flex flex-col xl:flex-row xl:items-center">
                            {/* <img src={avatar} draggable={false} className="rounded-full w-4/5 xl:w-1/3 border-8 mb-4 xl:mb-0 xl:mr-4 border-red-600 mx-auto" alt="" /> */}
                            {
                                !avatar ? (<Avatar name={name} className="mx-auto" round={true} size="125px" />) :
                                    (<img src={data.img_avatar ? data.img_avatar : ava} draggable={false} style={{ width: '150px', height: '150px' }} className="rounded-full border-8 mb-4 xl:mb-0 xl:mr-4 border-red-600 mx-auto" alt={data.name} />)
                            }
                            <div className="w-auto md:px-8 md:w-4/6">
                                <h4 className="text-red-600 text-2xl font-bold">{name}</h4>
                                <p className="text-xs mt-1 font-light text-justify">
                                    {about}
                                </p>
                                {
                                    category && <div className="flex flex-wrap text-sm font-medium text-gray-700 items-center mt-2">
                                        {
                                            category.map((item, index) => {
                                                return (<span key={index}><div className="rounded-full inline-block w-2 h-2 bg-gray-700 mx-2"></div><h6 className="text-xs inline-block">{item.name}</h6></span>)
                                            })
                                        }
                                    </div>
                                }
                                <div className="flex flex-wrap mt-4 md:mt-2">
                                    <div className="flex flex-col mr-8 text-center">
                                        <h4 className="font-bold text-2xl text-red-600">{Totalview}</h4>
                                        <p className="font-light text-sm text-gray-300">Views</p>
                                    </div>
                                    <div className="flex flex-col mr-8 text-center">
                                        <h4 className="font-bold text-2xl text-red-600">{Totalfav}</h4>
                                        <p className="font-light text-sm text-gray-300">Likes</p>
                                    </div>
                                    <div className="flex flex-col text-center">
                                        <h4 className="font-bold text-2xl text-red-600">{Totalshare}</h4>
                                        <p className="font-light text-sm text-gray-300">Shared</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-10 hidden xl:flex flex-col">
                                {fb && <Link to={{ pathname: fb }} target="_blank"><FbIcon className="mb-4" /></Link>}
                                {ig && <Link to={{ pathname: ig }} target="_blank"><IgIcon className="mb-4" /></Link>}
                                {tiktok && <Link to={{ pathname: tiktok }} target="_blank"><TtIcon className="mb-4" /></Link>}
                            </div>
                        </div>
                        <div className="flex justify-end pt-8">
                            <Link to={{
                                pathname: "/profile/edit",
                                state: { category1, category2, category3 }
                            }} >
                                <button className="rounded-3xl text-sm md:text-base font-medium mr-2 md:mr-6 text-white bg-red-600 px-6 py-2 md:px-10 md:py-2">Edit Account</button>
                            </Link>
                        </div>
                        <div className="md:pt-8">
                            <LineCustom favData={fav} shareData={share} viewData={view} />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col">
                        <div className="pt-8 flex flex-col px-4">
                            <div className="flex justify-between items-center">
                                <p className="text-red-600 font-bold text-base">Livestreams History</p>
                                <div className="w-40 form-categories border border-gray-300 rounded-md px-2 py-2 mr-4 my-2" role="button">
                                    <Dropdown title="Date" items={MostRecent2} onClick={changeDateid} idx={1} />
                                </div>
                            </div>
                            {
                                phoneTooltip.show && (<h3 style={{ color: 'green', textAlign: 'center' }}>URL copied.</h3>)
                            }
                            <div className="history-vid-profile overflow-auto pt-6">
                                {
                                    videos && <HistoryLivestreams displayToolTip={displayToolTip} ListVideo={videos} />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Spinner >
    )
}

export default Profile;
