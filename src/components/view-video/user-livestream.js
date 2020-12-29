import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactHtmlParserfrom from 'react-html-parser'
import { ReactComponent as ShareIconMobile } from 'assets/images/share-icon-mobile.svg'

//import Component SVG and image
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg'
import { ReactComponent as EyeIcon } from 'assets/images/eye-icon.svg'
import { ReactComponent as LikeIcon } from 'assets/images/thumbs-like-icon.svg'
import { ReactComponent as FbIcon } from 'assets/images/fb-icon.svg'
import { ReactComponent as IgIcon } from 'assets/images/ig-icon.svg'
import { ReactComponent as TtIcon } from 'assets/images/tiktok-icon.svg'

const UserLivestreamVideos = ({ ListVideo }) => {
    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState('');

    const changeDataModal = (val, data) => {
        setDataModal(data);
        setShowModal(val)
    }

    return (
        <>
            {
                ListVideo.map((item, index) => {
                    return (
                        <div key={index} className="mt-8 flex flex-wrap xl:flex-no-wrap">
                            <div className="">
                                <div className="item relative">
                                    <figure className="item-image-user">
                                        <div className="minute-user py-2 px-2">
                                            <p className="font-medium text-sm text-white float-right">30:32</p>
                                        </div>
                                        <PlayIcon style={{ transition: "all .15s ease" }}
                                            onClick={() => changeDataModal(true, item.iframe)} className="icon" />
                                        <img src={item.img_thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = "https://alppetro.co.id/dist/assets/images/default.jpg" }} alt={item.title} />
                                    </figure>
                                </div>
                                <Link to="/" className="link-wrapped hidden"></Link>
                            </div>
                            <div className="item-meta xl:px-4 w-full xl:w-2/3">
                                <h4 className="font-semibold text-lg md:text-xl text-gray-700 break-all">{item.title}</h4>
                                <p className="font-light mt-2 text-xs md:text-sm text-justify text-gray-700">
                                    {item.description}
                                </p>
                                <div className="icon-controller-user flex flex-wrap items-center py-2">
                                    <div className="flex mr-4 items-center">
                                        <EyeIcon className="icon-at-user" />
                                        <h4 className="ml-2 text-gray-900 text-xs md:text-sm font-medium">{item.views} Views</h4>
                                    </div>
                                    <div className="flex mr-4 items-center">
                                        <LikeIcon className="icon-at-user" />
                                        <h4 className="ml-2 text-gray-900 text-xs md:text-sm  font-medium">{item.likes} Likes</h4>
                                    </div>
                                    {/* <div className="flex mr-4 items-center">
                                        <CalendarIcon className="icon-at-user" />
                                        <h4 className="ml-2 text-gray-900 text-xs md:text-sm  font-medium">283 Likes</h4>
                                    </div> */}
                                </div>
                                {
                                    item.categories && <div className="flex flex-wrap text-sm font-medium text-gray-700 items-center mt-2">
                                        {
                                            item.categories.map((item, index) => {
                                                return (<span key={index}><div className="rounded-full inline-block w-2 h-2 bg-gray-700 mx-2"></div><h6 className="inline-block">{item}</h6></span>)
                                                // : (<span key={index}><div className="rounded-full w-2 h-2 bg-gray-700 mx-2"></div><h6>{item}</h6></span>)
                                            })
                                        }
                                    </div>
                                }
                                <div className="merchant-dashboard my-2 flex flex-wrap">
                                    {
                                        item.facebook_url && (
                                            <button style={{ transition: "all .15s ease" }}
                                                onClick={() => changeDataModal(true, item.facebook_url)}><FbIcon className="mr-4" />
                                            </button>)
                                    }
                                    {
                                        item.instagram_url && (<button style={{ transition: "all .15s ease" }}
                                            onClick={() => changeDataModal(true, item.instagram_url)}><IgIcon className="mr-4" /></button>)
                                    }
                                    {
                                        item.tiktok_url && (<button style={{ transition: "all .15s ease" }}
                                            onClick={() => changeDataModal(true, item.tiktok_url)}><TtIcon className="mr-4" /></button>)
                                    }
                                    <button href=""><ShareIconMobile className="mr-4" /></button>
                                </div>
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
                                                    <div className="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                                                        <h6 className="text-2xl font-semibold">{item.title}</h6>
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
                                                    {/* <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                                    type="button"
                                                    style={{ transition: "all .15s ease" }}
                                                    onClick={() => setShowModal(false)}
                                                >Close</button>

                                            </div> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    )
                })
            }
        </>)
}

export default UserLivestreamVideos;