import React from 'react'
import { Link } from 'react-router-dom'

//import Component SVG and image
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg'
import { ReactComponent as EyeIcon } from 'assets/images/eye-icon.svg'
import { ReactComponent as LikeIcon } from 'assets/images/thumbs-like-icon.svg'
import { ReactComponent as FbIcon } from 'assets/images/fb-icon.svg'
import { ReactComponent as IgIcon } from 'assets/images/ig-icon.svg'
import { ReactComponent as TtIcon } from 'assets/images/tiktok-icon.svg'

const UserLivestreamVideos = ({ ListVideo }) => {
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
                                        <PlayIcon className="icon" />
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
                                                return index < 2 ? (<span key={index}><h6>{item}</h6><div className="rounded-full w-2 h-2 bg-gray-700 mx-2"></div></span>)
                                                    : (<span key={index}><h6 key={index}>{item}</h6></span>)
                                            })
                                        }
                                    </div>
                                }
                                <div className="flex icon-socmed-user py-2 px-2">
                                    <Link to={{ pathname: item.facebook_url }} target="_blank"><FbIcon className="mr-4" /></Link>
                                    <Link to={{ pathname: item.instagram_url }} target="_blank"><IgIcon className="mr-4" /></Link>
                                    <Link to={{ pathname: item.tiktok_url }} target="_blank"><TtIcon className="mr-4" /></Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>)
}

export default UserLivestreamVideos;