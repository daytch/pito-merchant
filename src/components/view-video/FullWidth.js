import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg';
import { ReactComponent as EyeIcon } from 'assets/images/eye-icon.svg';
import { ReactComponent as LikeIcon } from 'assets/images/thumbs-like-icon.svg';
import { ReactComponent as SharedIcon } from 'assets/images/shared-icon.svg';
import { ReactComponent as FbIcon } from 'assets/images/fb-rounded.svg';
import { ReactComponent as IgIcon } from 'assets/images/ig-rounded.svg';
import { ReactComponent as TiktokIcon } from 'assets/images/tiktok-rounded.svg';
import { ReactComponent as ShareLinkIcon } from 'assets/images/share-link.svg';
import iconLive from 'assets/images/live-icon.png'
import BgUpcoming from 'assets/images/bg-upcoming.png'
import ReactHtmlParserfrom from 'react-html-parser';
import Modal from 'react-modal'
import DefaultImg from 'assets/images/default.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Countdown from 'components/forms/countdown'
import Moment from 'moment';
import general from '../../shared/general';
import { toast } from 'react-toastify';
Modal.setAppElement('*');

const FullWidth = ({ displayToolTip, DeleteButton, linkVideo, actionLinks, viewsElement, actions, dataVideos, socmedVertical, socmedCustom, liveRecord, title, name, subtitle, caption, ig, tiktok, fb, category, buttons }) => {

    const [dataModal, setDataModal] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false)

    const [category1, setCategory1] = useState("")
    const [category2, setCategory2] = useState("")
    const [category3, setCategory3] = useState("")

    const openModal = (data) => {
        setIsOpen(true)
        setDataModal(data)
    }

    function goToLink(url) {
        window.open(url, "_blank");
    }

    function triggerToast() {
        toast.info("Copied! 🚀", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    useEffect(() => {
        if (typeof category !== "undefined") {
            let cat1 = typeof category[0] === "undefined" ? "Category" : category[0]
            let cat2 = typeof category[1] === "undefined" ? "Category" : category[1]
            let cat3 = typeof category[2] === "undefined" ? "Category" : category[2]
            setCategory1(cat1)
            setCategory2(cat2)
            setCategory3(cat3)
        }
    }, [])

    function goToLink(url) {
        window.open(url, "_blank");
    }

    function triggerToast() {
        toast.info("Copied! 🚀", {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };
    return (
        <>
            {
                dataVideos.map((item, index) => {
                    let iframe = item.iframe;
                    return (
                        <div className="md:inline-flex" key={index}>
                            <div className="flex-1">
                                <div className="item relative w-auto">
                                    <Link to={{
                                        pathname: `/livestream/${item.id}`,
                                        query: { iframe }
                                    }} className="link-wrapped">
                                        <figure className="item-image-live">
                                            {
                                                item?.live ? (
                                                    <>
                                                        <img className="live-icon px-2 py-2" src={iconLive} alt="live icon" />
                                                    </>
                                                ) : null
                                            }
                                            <PlayIcon style={{ transition: "all .15s ease" }}
                                                onClick={() => openModal(item.iframe)} className="icon" />
                                            <img style={{
                                                maxWidth: '250px', maxHeight: '145px', objectFit: 'cover' }} src={item.thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = DefaultImg }} alt={title} className="thumbnail-live" />

                                        </figure>
                                    </Link>
                                </div>
                            </div>

                            <div className="flex flex-grow flex-col ml-4">
                                <div className="flex flex-wrap">
                                    <h6 className="break-all font-bold text-sm text-red-700 py-3 lg:py-0 px-4 lg:px-0">Live on {Moment(item.date).format('LLL')}</h6>
                                </div>
                                <div className="flex flex-wrap h-full">
                                    <h5 className="break-all font-semibold text-md text-gray-700 py-3 lg:py-0 px-4 lg:px-0 lg:mb-2">{item.title}</h5>
                                </div>
                                <div className="flex flex-wrap">
                                    <p className="break-all font-light text-sm text-gray-700 py-3 lg:py-0 px-4 lg:px-0">{item.merchant?.name}</p>
                                </div>
                                <div className="flex flex-wrap items-center px-4 xl:px-0 leading-relaxed">
                                    <div className="flex mr-2 md:mr-4 items-center">
                                        <EyeIcon className="icon-at-user" />
                                        <h5 className="ml-2 text-gray-900 xl:text-xs font-semibold">{general.kFormatter(item.views)} <span className="text-gray-900 xl:text-xs font-medium">Views</span></h5>
                                    </div>
                                    <div className="flex mr-2 md:mr-4 items-center">
                                        <LikeIcon className="icon-at-user" />
                                        <h5 className="ml-2 text-gray-900 xl:text-xs font-semibold">{general.kFormatter(item.likes)} <span className="text-gray-900 xl:text-xs font-medium">Likes</span></h5>
                                    </div>
                                    <div className="flex mr-2 md:mr-4 items-center">
                                        <SharedIcon className="icon-at-user" />
                                        <h5 className="ml-2 text-gray-900 xl:text-xs font-semibold">{item.share} <span className="text-gray-900 xl:text-xs font-medium">Shares</span></h5>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    {
                                        item.redirect_fb && (
                                            <FbIcon onClick={() => goToLink(item.redirect_fb)} className="mt-2 mr-2" />
                                        )
                                    }
                                    {
                                        item.redirect_ig && (
                                            <IgIcon onClick={() => goToLink(item.redirect_ig)} className="mt-2 mr-2" />
                                        )
                                    }
                                    {
                                        item.redirect_tiktok && (
                                            <TiktokIcon onClick={() => goToLink(item.redirect_tiktok)} className="mt-2 mr-2" />
                                        )
                                    }
                                    {
                                        item.share_url && (

                                            <CopyToClipboard text={item.share_url}>
                                                <ShareLinkIcon onClick={() => triggerToast()} className="mt-2 mr-2" />
                                            </CopyToClipboard>
                                            // <ShareLinkIcon onClick={() => goToLink(share_url)} className="mt-2 mr-2" />
                                        )
                                    }
                                </div>
                                {
                                            actions && (
                                                <div className="md:mt-4 flex items-center">
                                                    <Link to={{
                                                        pathname: actionLinks,
                                                        query: { linkVideo, actionLinks, viewsElement, actions, dataVideos, socmedVertical, socmedCustom, liveRecord, title, name, subtitle, caption, category1, category2, category3, buttons }
                                                    }} className="font-semibold text-base md:text-lg text-red-600 mr-4">Edit</Link>
                                                    <DeleteButton id={item.id} />
                                                </div>
                                            )
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