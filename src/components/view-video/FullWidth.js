import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg'
import { ReactComponent as FbIcon } from 'assets/images/fb-icon.svg'
import { ReactComponent as IgIcon } from 'assets/images/ig-icon.svg'
import { ReactComponent as TtIcon } from 'assets/images/tiktok-icon.svg'
import { ReactComponent as EyeIconWhite } from 'assets/images/eye-icon-white.svg'
import { ReactComponent as ShareIcon } from 'assets/images/share-icon.svg'
import { ReactComponent as ShareIconMobile } from 'assets/images/share-icon-mobile.svg'
import { ReactComponent as EyeIcon } from 'assets/images/eye-icon.svg'
import { ReactComponent as LikeIcon } from 'assets/images/thumbs-like-icon.svg'
// import { ReactComponent as CalendarIcon } from 'assets/images/calendar-icon.svg'
import iconLive from 'assets/images/live-icon.png'
import ReactHtmlParserfrom from 'react-html-parser';

const FullWidth = ({ linkVideo, actionLinks, viewsElement, actions, dataVideos, socmedVertical, socmedCustom, liveRecord, title, name, subtitle, caption, ig, tiktok, fb, category, buttons }) => {

    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState('');

    const changeDataModal = (val, data) => {
        setDataModal(data);
        setShowModal(val)
    }

    return (
        <>
            {
                dataVideos.map((item, index) => {
                    return (
                        <div className="flex mb-6 flex-col lg:flex-row" key={index}>
                            <div className="flex">
                                <div className="item relative w-auto">
                                    <Link to={`/livestream/${item.id}`} className="link-wrapped">
                                        <figure className="item-image-live">
                                            {
                                                item?.live ? (
                                                    <>
                                                        <img className="live-icon px-2 py-2" src={iconLive} alt="live icon" />
                                                        <div className="live-viewers bg-blue-900 opacity-50 text-sm rounded-lg mt-2" style={{ width: 66, height: 26 }}>
                                                        </div>
                                                        <div className="live-viewers-wrap flex px-2 items-center py-1 text-sm font-light text-white rounded-lg mt-2" style={{ width: 66, height: 26 }}>
                                                            <EyeIconWhite className="mx-auto" />
                                                            <h6 className="mx-auto opacity-100">5.2K</h6>
                                                        </div>
                                                    </>
                                                ) : null
                                            }
                                            <PlayIcon style={{ transition: "all .15s ease" }}
                                                onClick={() => changeDataModal(true, item.iframe)} className="icon" />
                                            <img src={item.thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = "https://alppetro.co.id/dist/assets/images/default.jpg" }} alt={title} className="thumbnail-live" />
                                        </figure>
                                    </Link>
                                </div>
                                {
                                    socmedVertical && <div className="share-icon-live flex-col px-4 xxl:px-8">
                                        <FbIcon className="mb-4" />
                                        <IgIcon className="mb-4" />
                                        <TtIcon className="mb-4" />
                                        <ShareIconMobile className="flex md:hidden" />
                                    </div>
                                }
                            </div>
                            <div className="flex flex-col-reverse md:flex-row">
                                {
                                    liveRecord &&
                                    <div className="flex md:flex-col px-2 xxl:px-8 items-center">
                                        <div className="mr-8 md:mb-3 md:mr-0 leading-tight text-center">
                                            <h4 className="font-bold text-xl text-red-600">{item.views}</h4>
                                            <span className="text-sm text-gray-300 font-light">Views</span>
                                        </div>
                                        <div className="mr-8 md:mb-3 md:mr-0 leading-tight text-center">
                                            <h4 className="font-bold text-xl text-red-600">{item.shared}</h4>
                                            <span className="text-sm text-gray-300 font-light">Shared</span>
                                        </div>
                                        <div className="mr-2 md:mb-3 md:mr-0 leading-tight text-center">
                                            {
                                                item?.live ? (
                                                    <h4 className="font-bold text-xl text-red-600">Live Now</h4>
                                                ) : (
                                                        <>
                                                            <h4 className="font-bold text-xl text-red-600">{item.date}</h4>
                                                            <span className="text-sm text-gray-300 font-light whitespace-no-wrap">Day(s) ago</span>
                                                        </>
                                                    )
                                            }
                                        </div>
                                        <div className="flex-col flex md:hidden mx-auto mt-2 px-4 leading-tight">
                                            <button className="bg-red-600 text-sm rounded-full w-full px-2 py-2 mb-2 font-medium text-white focus:outline-none">Edit</button>
                                            <button className="border border-red-600 text-sm rounded-full w-full px-2 py-2 font-medium text-red-600 focus:outline-none">Disable</button>
                                        </div>
                                    </div>
                                }
                                <div className="flex-col md:px-4 xxl:px-8 leading-tight">
                                    {
                                        name && <h4 className="font-bold text-xl text-red-600">{name}</h4>
                                    }
                                    {
                                        title && <h4 className="font-bold text-xl text-gray-700 break-all">{title}</h4>
                                    }
                                    <div className="mt-4">
                                        {
                                            subtitle && <h5 className="text-gray-700 font-semibold mb-2 break-all">Title Lorem Ipsum...</h5>
                                        }
                                        {
                                            caption && <p className="text-justify text-sm md:text-base break-all">
                                                {caption}
                                            </p>
                                        }
                                        {
                                            viewsElement && <div className="icon-controller-user flex flex-wrap items-center leading-relaxed">
                                                <div className="flex mr-2 md:mr-4 items-center">
                                                    <EyeIcon className="icon-at-user" />
                                                    <h4 className="ml-2 text-gray-900 text-sm md:text-sm font-medium">{item.views && 0} Views</h4>
                                                </div>
                                                <div className="flex mr-2 md:mr-4 items-center">
                                                    <LikeIcon className="icon-at-user" />
                                                    <h4 className="ml-2 text-gray-900 text-sm md:text-sm  font-medium">{item.likes && 0} Likes</h4>
                                                </div>
                                                {/* <div className="flex mr-2 md:mr-4 items-center">
                                                    <CalendarIcon className="icon-at-user" />
                                                    <h4 className="ml-2 text-gray-900 text-sm md:text-sm  font-medium">283 Likes</h4>
                                                </div> */}
                                            </div>
                                        }
                                        {
                                            category && <div className="flex flex-wrap text-sm font-medium text-gray-700 items-center mt-2">
                                                {
                                                    category.map((item, index) => {
                                                        return (<span key={index}><div className="rounded-full inline-block w-2 h-2 bg-gray-700 mx-2"></div><h6 className="inline-block">{item}</h6></span>)
                                                        // : (<span key={index}><div className="rounded-full w-2 h-2 bg-gray-700 mx-2"></div><h6>{item}</h6></span>)
                                                    })
                                                }
                                            </div>
                                        }
                                        {
                                            <div className="merchant-dashboard my-2 flex flex-wrap">
                                                {
                                                    fb && (
                                                        <button style={{ transition: "all .15s ease" }}
                                                            onClick={()=>changeDataModal(true, fb)}><FbIcon className="mr-4" />
                                                        </button>)
                                                }
                                                {
                                                    ig && (<button style={{ transition: "all .15s ease" }}
                                                        onClick={()=>changeDataModal(true, ig)}><IgIcon className="mr-4" /></button>)

                                                }
                                                {
                                                    tiktok && (<button style={{ transition: "all .15s ease" }}
                                                        onClick={()=>changeDataModal(true, tiktok)}><TtIcon className="mr-4" /></button>)
                                                }
                                                <button href=""><ShareIconMobile className="mr-4" /></button>
                                            </div>
                                        }
                                        {showModal ? (
                                            <>
                                                <div
                                                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                        {/*content*/}
                                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                            {/*header*/}
                                                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                                                <h3 className="text-3xl font-semibold">{item.title}</h3>
                                                                <button
                                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                    onClick={() => setShowModal(false)} >
                                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                                                </button>
                                                            </div>
                                                            {/*body*/}
                                                            <div className="relative p-6 flex-auto">
                                                                {dataModal && ReactHtmlParserfrom(dataModal)}
                                                            </div>
                                                            {/*footer*/}
                                                            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                                                <button
                                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                                                    type="button"
                                                                    style={{ transition: "all .15s ease" }}
                                                                    onClick={() => setShowModal(false)}
                                                                >Close</button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                            </>
                                        ) : null}
                                        {
                                            actions && (
                                                <div className="mt-4 flex items-center">
                                                    <Link to={{
                                                        pathname: actionLinks,
                                                        query: { linkVideo, actionLinks, viewsElement, actions, dataVideos, socmedVertical, socmedCustom, liveRecord, title, name, subtitle, caption, ig, tiktok, fb, category, buttons }
                                                    }} className="font-semibold text-base md:text-lg text-red-600 mr-4">Edit</Link>
                                                    <Link to={"/"} className="font-semibold text-base md:text-lg text-red-600 mr-4">Delete</Link>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                {
                                    buttons && <div className="flex-col hidden md:flex mx-auto px-4 leading-tight xl:w-3/12 xxl:w-1/4">
                                        <button className="bg-red-600 rounded-full w-full px-6 py-3 mb-4 font-medium text-white flex items-center justify-center focus:outline-none">Share <ShareIcon className="mx-2" /></button>
                                        <button className="bg-red-600 rounded-full w-full px-6 py-3 mb-4 font-medium text-white focus:outline-none">Edit</button>
                                        <button className="border border-red-600 rounded-full w-full px-6 py-3 font-medium text-red-600 focus:outline-none">Disable</button>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default FullWidth;