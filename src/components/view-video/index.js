import React from 'react'
import { Link } from 'react-router-dom'

//import Component SVG and image
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg'
import { ReactComponent as EyeIcon } from 'assets/images/eye-icon.svg'
import { ReactComponent as LikeIcon } from 'assets/images/thumbs-like-icon.svg'
import thumbnail from 'assets/images/thumbnail-one.jpg'

const MostviewsVideos = () => {
    return (
        <div className="px-2 lg:px-6 xxl:px-8">
            <div className="mt-8 flex flex-wrap lg:flex-no-wrap">
                <div className="flex flex-wrap lg:flex-no-wrap items-baseline">
                    <div className="flex w-full lg:w-1/2 max-w-none">
                        <p>1.</p>
                        <div className="item relative w-auto px-4 lg:px-2">
                            <figure className="item-image">
                                <PlayIcon className="icon" />
                                <img src={thumbnail} alt="" />
                            </figure>
                        </div>
                        <Link to="/" className="link-wrapped hidden"></Link>
                    </div>
                    <div className="lg:w-2/3 item-meta">
                        <div className="flex flex-wrap">
                            <h4 className="break-all font-light xl:text-lg xxl:text-xl text-gray-700 py-3 lg:py-0 px-4 lg:px-0 lg:mb-4">Titxxxxxxxxxxxxxxxxxxsxxxxxxxxxxxxxle</h4>
                        </div>
                        <div className="flex flex-wrap items-center px-4 xl:px-0">
                            <EyeIcon />
                            <h4 className="ml-2 text-red-700 xl:text-sm font-semibold">5.283 <span className="text-gray-900 xl:text-xs font-medium">Views</span></h4>
                            <div className="flex ml-4">
                                <LikeIcon />
                                <h4 className="ml-2 text-red-700 xl:text-sm font-semibold">283 <span className="text-gray-900 xl:text-xs font-medium">Likes</span></h4>
                            </div>
                        </div>
                        <div className="flex flex-wrap text-xs px-4 lg:px-0 text-gray-300 mt-2 items-center">
                            <h6>Category 1</h6><div className="rounded-full w-2 h-2 bg-gray-200 mx-2"></div>
                            <h6>Category 2</h6><div className="rounded-full w-2 h-2 bg-gray-200 mx-2"></div>
                            <h6>Category 3</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MostviewsVideos;