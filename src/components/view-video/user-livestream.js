import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactHtmlParserfrom from 'react-html-parser'
import { ReactComponent as ShareIconMobile } from 'assets/images/share-icon-mobile.svg'

//import Component SVG and image
import { ReactComponent as PlayIcon } from 'assets/images/icon-play.svg'
import { ReactComponent as EyeIcon } from 'assets/images/eye-icon.svg';
import { ReactComponent as LikeIcon } from 'assets/images/thumbs-like-icon.svg';
import { ReactComponent as SharedIcon } from 'assets/images/shared-icon.svg';
import { ReactComponent as FbIcon } from 'assets/images/fb-rounded.svg';
import { ReactComponent as IgIcon } from 'assets/images/ig-rounded.svg';
import { ReactComponent as TiktokIcon } from 'assets/images/tiktok-rounded.svg';
import { ReactComponent as ShareLinkIcon } from 'assets/images/share-link.svg';
import Modal from 'react-modal'
import DefaultImg from 'assets/images/default.svg'
Modal.setAppElement('*'); // suppresses modal-related test warnings.
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Countdown from 'components/forms/countdown'
import Converter from 'configs/moment/DatetimeConverter'
import Moment from 'moment';
import general from '../../shared/general';
import { toast } from 'react-toastify';

const UserLivestreamVideos = ({ displayToolTip, ListVideo }) => {

    const [dataModal, setDataModal] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false)
    let subtitle;

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

    return (
        <div>
            {
                ListVideo.map((item, index) => {
                    var duration = Moment((Moment(Converter.convertToLocal(item.end_time))).diff(Moment(Converter.convertToLocal(item.start_time)))).format("HH:mm:ss")

                    return (
                        <div key={index} >
                            <div className="mt-4 mb-4 md:mt-8 flex flex-wrap xl:flex-no-wrap">
                                <div className="flex">
                                    <div className="item relative">
                                        <Link to={`/livestream/${item.id}`} className="link-wrapped">
                                            <figure className="item-image-user">
                                                {
                                                    <>
                                                        {/* <div className="minute-user py-2 px-2">
                                                            <p className="font-medium text-sm text-white float-right">{duration}</p>
                                                        </div> */}
                                                        <PlayIcon style={{ transition: "all .15s ease" }} onClick={() => openModal(item.iframe)} className="icon" />
                                                        <img src={item.img_thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = DefaultImg }} alt={item.title} />
                                                    </>
                                                }

                                            </figure>
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex flex-grow flex-col ml-2">
                                    <div className="flex flex-wrap">
                                        <h6 className="break-all font-bold text-sm text-red-700 py-3 lg:py-0 px-4 lg:px-0">Live on {Moment(item.start_time).format('MMMM Do YYYY, h:mm a')}</h6>
                                    </div>
                                    <div className="flex flex-wrap h-12">
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
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <hr className="solid" />
                        </div>
                    )
                })
            }
        </div >)
}

export default UserLivestreamVideos;