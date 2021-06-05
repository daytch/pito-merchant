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
import { ReactComponent as CalendarIcon } from 'assets/images/calendar-icon.svg'
import BgUpcoming from 'assets/images/bg-upcoming.png'
import Modal from 'react-modal'
import DefaultImg from 'assets/images/default.svg'
Modal.setAppElement('*'); // suppresses modal-related test warnings.
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Countdown from 'components/forms/countdown'
import Converter from 'configs/moment/DatetimeConverter'
import Moment from 'moment'

const UserLivestreamVideos = ({ displayToolTip, ListVideo }) => {

    const [dataModal, setDataModal] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false)
    let subtitle;

    const openModal = (data) => {
        setIsOpen(true)
        setDataModal(data)
    }
    const closeModal = () => { setIsOpen(false) }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
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
        <div>
            {
                ListVideo.map((item, index) => {
                    var duration = Moment((Moment(Converter.convertToLocal(item.end_time))).diff(Moment(Converter.convertToLocal(item.start_time)))).format("HH:mm:ss")

                    return (
                        <div key={index} className="mt-4 md:mt-8 flex flex-wrap xl:flex-no-wrap">
                            <div className="flex">
                                <div className="item relative">
                                    <Link to={`/livestream/${item.id}`} className="link-wrapped">
                                        <figure className="item-image-user">
                                            {
                                                // Moment(new Date()).isBefore(Converter.convertToLocal(item.start_time)) ?
                                                //     (
                                                //         <>
                                                //             <div className="upcoming-mn rounded-lg border-2 border-red-600 w-11/12 md:w-full">
                                                //                 <Countdown StartTime={Converter.convertToLocal(item.start_time)} isMini={true} />
                                                //             </div>
                                                //             <img style={{ width: '291px', height: '159px' }} src={BgUpcoming} onError={(e) => { e.target.onerror = null; e.target.src = DefaultImg }} alt={item.title} className="thumbnail-live" />
                                                //         </>
                                                //     ) :
                                                //     (
                                                <>
                                                    <div className="minute-user py-2 px-2">
                                                        <p className="font-medium text-sm text-white float-right">{duration}</p>
                                                    </div>
                                                    <PlayIcon style={{ transition: "all .15s ease" }} onClick={() => openModal(item.iframe)} className="icon" />
                                                    <img src={item.img_thumbnail} onError={(e) => { e.target.onerror = null; e.target.src = DefaultImg }} alt={item.title} />
                                                </>
                                                // )
                                            }

                                        </figure>
                                    </Link>
                                </div>
                            </div>
                            <div className="item-meta xl:px-4 w-full xl:w-2/3">
                                <h4 className="font-semibold text-lg md:text-xl text-gray-700 break-all">{item.title}</h4>
                                <p className="overflow-ellipsis overflow-hidden md:h-10 break-all font-light md:mt-2 text-xs md:text-sm text-justify text-gray-700">
                                    {item.description}
                                </p>
                                <div className="icon-controller-user flex flex-wrap items-center md:py-2">
                                    <div className="flex mr-4 items-center">
                                        <EyeIcon className="icon-at-user" />
                                        <h4 className="ml-2 text-gray-900 text-xs md:text-sm font-medium">{item.views} Views</h4>
                                    </div>
                                    <div className="flex mr-4 items-center">
                                        <LikeIcon className="icon-at-user" />
                                        <h4 className="ml-2 text-gray-900 text-xs md:text-sm  font-medium">{item.likes} Likes</h4>
                                    </div>
                                    <div className="flex mr-4 items-center">
                                        <CalendarIcon className="icon-at-user" />
                                        <h4 className="ml-2 text-gray-900 text-sm md:text-sm  font-medium">{Moment(Converter.convertToLocal(item.start_time)).fromNow()}</h4>
                                    </div>
                                </div>
                                {
                                    item.categories && <div className="flex flex-wrap text-xs md:text-sm font-medium text-gray-700 items-center md:mt-2">
                                        {
                                            item.categories.map((item, index) => {
                                                return (<span key={index}><div className="rounded-full inline-block w-2 h-2 bg-gray-700 mx-2"></div><h6 className="inline-block">{item}</h6></span>)
                                            })
                                        }
                                    </div>
                                }
                                <div className="merchant-dashboard my-2 flex flex-wrap">
                                    {
                                        item.facebook_url && (
                                            <button style={{ transition: "all .15s ease" }}
                                                onClick={() => openModal(item.facebook_url)}><FbIcon className="icon-sosmed mr-2 md:mr-4" />
                                            </button>)
                                    }
                                    {
                                        item.instagram_url && (<button style={{ transition: "all .15s ease" }}
                                            onClick={() => openModal(item.instagram_url)}><IgIcon className="icon-sosmed mr-2 md:mr-4" /></button>)
                                    }
                                    {
                                        item.tiktok_url && (<button style={{ transition: "all .15s ease" }}
                                            onClick={() => openModal(item.tiktok_url)}><TtIcon className="icon-sosmed mr-2 md:mr-4" /></button>)
                                    }
                                    <CopyToClipboard text={item.share_url}>
                                        <button onClick={displayToolTip} href=""><ShareIconMobile className="icon-sosmed mr-2 md:mr-4" /></button>
                                    </CopyToClipboard>
                                </div>

                                <Modal
                                    isOpen={modalIsOpen}
                                    onAfterOpen={afterOpenModal}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                    contentLabel="Livestream Modal"
                                    shouldCloseOnOverlayClick={false}
                                >
                                    <div className="flex items-start justify-between border-b border-solid border-gray-300 rounded-t">
                                        <h6 ref={_subtitle => (subtitle = _subtitle)}>{item.title}</h6>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={closeModal}  >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">×</span>
                                        </button>
                                    </div>
                                    <div className="relative p-6 flex-auto">
                                        {ReactHtmlParserfrom(dataModal)}
                                    </div>
                                </Modal>

                            </div>
                        </div>
                    )
                })
            }
        </div >)
}

export default UserLivestreamVideos;