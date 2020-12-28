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

const Profile = () => {
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

    useEffect(() => {
        User.getProfile().then((res) => {
            let data = res.data;

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
            setFav(data.total_fav);
            setShare(data.total_shared);
            setView(data.total_view);
            setLoading(false);
        });
    }, [])

    function changeDateid(e) {

        switch (e.value) {
            case "Date":
                setVideos(videos.sort((a, b) => (moment(a.start_time).isAfter(b.start_time)) ? 1 : -1));
                break;
            case "Views":
                setVideos(videos.sort((a, b) => (a.views > b.views) ? 1 : -1));
                break;
            case "Favourites":
                setVideos(videos.sort((a, b) => (a.likes > b.likes) ? 1 : -1));
                break;
            default:
                setVideos(videos.sort((a, b) => (a.id > b.id) ? 1 : -1));
                break;

        }
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
                <div className="py-10 md:py-20 flex flex-col md:flex-row w-full">
                    <div className="w-full md:w-3/5 xxl:w-1/2 px-4">
                        <div className="flex flex-col xl:flex-row xl:items-center">
                            <img src={avatar} draggable={false} className="rounded-full w-4/5 xl:w-1/3 border-8 mb-4 xl:mb-0 xl:mr-4 border-red-600 mx-auto" alt="" />

                            <div className="md:px-8 w-auto">
                                <h4 className="text-red-600 text-2xl font-bold">{name}</h4>
                                <p className="text-sm mt-1 font-light text-justify">
                                    {about}
                                </p>
                                {
                                    category && <div className="flex flex-wrap text-sm font-medium text-gray-700 items-center mt-2">
                                        {
                                            category.map((item, index) => {
                                                return (<span key={index}><div className="rounded-full inline-block w-2 h-2 bg-gray-700 mx-2"></div><h6 className="inline-block">{item.name}</h6></span>)
                                                // : (<span key={index}><div className="rounded-full w-2 h-2 bg-gray-700 mx-2"></div><h6>{item}</h6></span>)
                                            })
                                        }
                                    </div>
                                }
                                <div className="flex flex-wrap mt-4 md:mt-2">
                                    <div className="flex flex-col mr-8 text-center">
                                        <h4 className="font-bold text-2xl text-red-600">{view}</h4>
                                        <p className="font-light text-sm text-gray-300">Views</p>
                                    </div>
                                    <div className="flex flex-col mr-8 text-center">
                                        <h4 className="font-bold text-2xl text-red-600">{fav}</h4>
                                        <p className="font-light text-sm text-gray-300">Subscriber</p>
                                    </div>
                                    <div className="flex flex-col text-center">
                                        <h4 className="font-bold text-2xl text-red-600">{share}</h4>
                                        <p className="font-light text-sm text-gray-300">Shared</p>
                                    </div>
                                </div>
                            </div>
                            {/* )
                                })
                            } */}
                            <div className="w-1/5 hidden xl:flex flex-col">
                                {fb && <Link to={{ pathname: fb }} target="_blank"><FbIcon className="mb-4" /></Link>}
                                {ig && <Link to={{ pathname: ig }} target="_blank"><IgIcon className="mb-4" /></Link>}
                                {tiktok && <Link to={{ pathname: tiktok }} target="_blank"><TtIcon className="mb-4" /></Link>}
                            </div>
                        </div>
                        <div className="flex justify-end pt-8">
                            <Link to={{
                                pathname: "/profile/edit",
                                data: data // your data array of objects
                            }} >
                                <button className="rounded-3xl text-sm md:text-base font-medium mr-2 md:mr-6 text-white bg-red-600 px-6 py-2 md:px-10 md:py-2">Edit Account</button>
                            </Link>
                        </div>
                        <div className="pt-8">
                            <LineCustom />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col">
                        <div className="pt-8 flex flex-col px-4">
                            <div className="flex justify-between items-center">
                                <p className="text-red-600 font-bold text-base">Livestreams History</p>
                                <Dropdown title="Date" items={MostRecent2} onClick={changeDateid} idx={1} />

                                {/* <Dropdown title="Category" placeholder="Category 1" items={category} onClick={changeDateid} idx={1} /> */}
                            </div>
                            <div className="pt-6">
                                {
                                    videos && <HistoryLivestreams ListVideo={videos} />
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
