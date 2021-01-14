import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router";
import { Link } from "react-router-dom"
import SideNavbarMerchant from 'components/SideNavbarMerchant'
import livestream from 'api/livestream';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ReactComponent as FbIcon } from 'assets/images/fb-icon.svg'
import { ReactComponent as IgIcon } from 'assets/images/ig-icon.svg'
import { ReactComponent as TtIcon } from 'assets/images/tiktok-icon.svg'
import { ReactComponent as UploadIcon } from 'assets/images/upload-icon.svg'
import Dropdown from 'components/forms/dropdown'
import Spinner from 'components/spinner'
import moment from 'moment'
import Converter from 'configs/moment/DatetimeConverter'

const MySwal = withReactContent(Swal)
const CreateDashboard = ({ state }) => {
    const [isLoading, setLoading] = useState(true)
    const [mypic, setMypic] = useState('')
    const [startDate, setStartDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [titleNew, setTitle] = useState('')
    const [descNew, setDesc] = useState('')
    const [fb_url, setFburl] = useState('')
    const [tiktok_url, setTiktokurl] = useState('')
    const [ig_url, setIgurl] = useState('')
    const [category, setCategory] = useState([])
    const [categoryid, setCategoryid] = useState([])

    useEffect(() => {

        livestream.getCategory().then((res) => {

            const ListCategory = res.data.map((i) => {
                return { "id": i.id, "value": i.text }
            })
            setCategory(ListCategory);
            setLoading(false)
        })
    }, []);

    function mypicChange(e) {
        setMypic(e.target.files[0])
    }
    function startdateChange(e) {
        setStartDate(e.target.value)
    }
    function startTimeChange(e) {
        setStartTime(e.target.value)
    }
    function endTimeChange(e) {
        setEndTime(e.target.value)
    }
    function titleChange(e) {
        setTitle(e.target.value)
    }
    function descChange(e) {
        setDesc(e.target.value)
    }
    function fburlChange(e) {
        setFburl(e.target.value)
    }
    function tiktokurlChange(e) {
        setTiktokurl(e.target.value)
    }
    function igurlChange(e) {
        setIgurl(e.target.value)
    }
    function changeCategoryid(e, idx) {

        let arrCat = Object.keys(categoryid).length === 0 && categoryid.constructor === Object ? [] : [...categoryid]
        arrCat.splice(idx, 1)
        if (e) { arrCat.push(e.id) }
        setCategoryid(arrCat)
    }

    //state error handler
    const [errors, seterrors] = useState(null)
    const submit = (e) => {
        e.preventDefault();
        setLoading(true)

        let ids = Object.values(categoryid);
        let endDate = startDate + " " + endTime;
        let start = startDate + " " + startTime;


        let cat = []
        for (const [value] of Object.entries(categoryid)) {
            cat.push(value)
        }

        if (!titleNew) {
            setLoading(false)
            MySwal.fire('Validation!', 'Title cannot be empty.', 'warning');
            return;
        }

        if (new Set(cat).size !== cat.length) {
            setLoading(false)
            MySwal.fire('Validation!', 'Cannot pick same categories.', 'warning');
            return;
        }

        if (!startDate) {
            setLoading(false)
            MySwal.fire('Validation!', 'Start Date cannot be empty.', 'warning');
            return;
        }

        var date = new Date();
        date.setDate(date.getDate() + 7);
        if (moment(startDate).isSameOrAfter(date, 'day')) {
            setLoading(false)
            MySwal.fire('Validation!', 'Start Date cannot more than a week.', 'warning');
            return;
        }

        if (!startTime) {
            setLoading(false)
            MySwal.fire('Validation!', 'Start Time cannot be empty.', 'warning');
            return;
        }

        if (endTime && startTime > endTime) {
            setLoading(false)()
            MySwal.fire('Validation!', 'End Time cannot less than Start Time.', 'warning');
            return;
        }

        if (ids.length < 1) {
            setLoading(false)
            MySwal.fire('Validation!', 'Category cannot be empty.', 'warning');
            return;
        }

        if (!fb_url) {
            setLoading(false)
            MySwal.fire('Validation!', 'Facebook link video cannot be empty.', 'warning');
            return;
        }

        if (!fb_url && !tiktok_url && !ig_url) {
            setLoading(false)
            MySwal.fire('Validation!', 'Link streaming video cannot be empty.', 'warning');
            return;
        }

        const formData = new FormData();
        formData.append("videoId", "");
        formData.append("mypic", mypic);
        formData.append("startDate", Converter.converToFormatBE(start));
        formData.append("endDate", Converter.converToFormatBE(endDate));
        formData.append("title", titleNew);
        formData.append("desc", descNew);
        formData.append("fb_url", fb_url);
        formData.append("tiktok_url", tiktok_url);
        formData.append("ig_url", ig_url);
        formData.append("category", ids);

        livestream.create(formData).then((res) => {

            setLoading(false)
            MySwal.fire({
                icon: 'success',
                title: 'Success',
                text: res.message
            }).then(result => {
                console.log(result)
                window.location.href = '/dashboard'
            })
        }).catch(err => {
            seterrors(err?.response?.data?.message)
            console.error(errors)
        })
    }
    return (
        <Spinner isLoading={isLoading}>
            <section className="min-h-screen flex flex-col xl:flex-row">
                <SideNavbarMerchant />
                <div className="py-10 md:py-20 px-5 w-full">
                    <h6 className="text-red-600 font-bold text-lg">Create Livestreams</h6><br />
                    <div className="mt-4">
                        <div className="w-full xl:w-4/5">
                            <form>
                                <div className="flex flex-wrap w-full items-start">
                                    <label htmlFor="title" className="w-full md:w-1/6 text-sm text-gray-700">Title <span className="text-red-700">*</span></label>
                                    <input type="text" placeholder="Title" value={titleNew} onChange={titleChange} className="text-sm w-full md:w-2/5 px-4 py-2 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" />
                                </div>
                                <div className="flex flex-wrap w-full items-start mt-4">
                                    <label htmlFor="desc" className="w-full md:w-1/6 text-sm text-gray-700">Description</label>
                                    <textarea placeholder="Description" value={descNew} onChange={descChange} className="text-sm w-full md:w-2/5 h-32 px-4 py-2 md:ml-4 my-2 md:my-0 border border-gray-300 rounded-md" />
                                </div>
                                <div className="flex flex-wrap w-full items-center mt-4">
                                    <label htmlFor="category" className="w-full md:w-1/6 text-sm text-gray-700">Start Date</label>
                                    <div className="md:pr-2">
                                        <input type="date" value={startDate} onChange={startdateChange} name="date" className="px-4 py-2 mx-4 md:ml-4 my-2 md:my-0 border border-gray-300 rounded-md" />
                                    </div>
                                    <div className="md:pr-2">
                                        <label htmlFor="start" className="text-sm text-gray-700">Start Time <span className="text-red-700">*</span></label>
                                        <input type="time" name="start" value={startTime} onChange={startTimeChange} className="px-4 py-2 mx-4 md:ml-4 my-2 md:my-0 border border-gray-300 rounded-md" />
                                    </div>
                                    <div className="md:pr-2">
                                        <label htmlFor="end" className="text-sm text-gray-700">End Time</label>
                                        <input type="time" name="start" value={endTime} onChange={endTimeChange} className="px-4 py-2 mx-4 md:ml-4 my-2 md:my-0 border border-gray-300 rounded-md" />
                                    </div>
                                </div>
                                <div className="flex space-x-3 flex-wrap w-full items-center mt-4">
                                    <label htmlFor="category" className="w-full md:w-1/6 text-sm text-gray-700">Categories</label>
                                    <div className="flex-2 md:flex-1 form-categories border border-gray-300 rounded-md px-2 py-2 mr-4 my-2 md:ml-4 w-full" role="button">
                                        <Dropdown isNeedReset={true} title="Select..." placeholder="Category 1" items={category} onClick={changeCategoryid} idx={0} />
                                    </div>
                                    <div className="flex-2 md:flex-1 form-categories border border-gray-300 rounded-md px-2 py-2 mr-4 my-2 md:ml-4 w-full" role="button">
                                        <Dropdown isNeedReset={true} title="Select..." placeholder="Category 2" items={category} onClick={changeCategoryid} idx={1} />
                                    </div>
                                    <div className="flex-2 md:flex-1 form-categories border border-gray-300 rounded-md px-2 py-2 mr-4 my-2 md:ml-4 w-full" role="button">
                                        <Dropdown isNeedReset={true} title="Select..." placeholder="Category 3" items={category} onClick={changeCategoryid} idx={2} />
                                    </div>
                                </div>
                                <div className="form-dashboard flex flex-wrap w-full items-center mt-4">
                                    <label htmlFor="fbLink" className="w-full md:w-1/6 text-sm text-gray-700">Facebook Livestreams Link <span className="text-red-700">*</span></label>
                                    <input type="text" value={fb_url} onChange={fburlChange} placeholder="https://facebook.com/live/url" className="w-auto flex-2 md:flex-1 px-4 py-2 mr-2 md:mx-4 border border-gray-300 rounded-md" />
                                    <FbIcon />
                                </div>
                                <div className="form-dashboard flex flex-wrap w-full items-center mt-4">
                                    <label htmlFor="igLink" className="w-full md:w-1/6 text-sm text-gray-700">Instagram Livestreams Link</label>
                                    <input type="text" value={ig_url} onChange={igurlChange} placeholder="https://instagram.com/live/url" className="w-auto flex-2 md:flex-1 px-4 py-2 mr-2 md:mx-4 border border-gray-300 rounded-md" />
                                    <IgIcon />
                                </div>
                                <div className="form-dashboard flex flex-wrap w-full items-center mt-4">
                                    <label htmlFor="ttLink" className="w-full md:w-1/6 text-sm text-gray-700">Tiktok Livestreams Link</label>
                                    <input type="text" value={tiktok_url} onChange={tiktokurlChange} placeholder="https://tiktok.com/live/url" className="w-auto flex-2 md:flex-1 px-4 py-2 mr-2 md:mx-4 border border-gray-300 rounded-md" />
                                    <TtIcon />
                                </div>
                                <div className="form-dashboard flex flex-wrap w-full items-center mt-4">
                                    <label htmlFor="ttLink" className="w-full md:w-1/6 text-sm text-gray-700">Thumbnail</label>
                                    <label className="md:flex-1 md:px-4 md:py-2 md:mr-2 md:mx-4 md:border md:border-gray-300 md:rounded-md">
                                        <input type="file" onChange={mypicChange} aria-label="File browser thumbnail" />
                                        <span className="file-custom"></span>
                                    </label>
                                    <UploadIcon className="icon-upload" />
                                    <br />
                                    {mypic ? <ImageThumb image={mypic} /> : null}
                                </div>
                                <div className="flex mt-6">
                                    <Link to={"/dashboard"} className="border border-gray-300 text-red-600 rounded-md text-sm px-6 py-2 mr-4">Cancel</Link>
                                    <button onClick={submit} className="border  text-white font-medium bg-red-600 rounded-md text-sm px-10 py-2">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </Spinner>
    )
}
const ImageThumb = ({ image }) => {
    return <img className="img-livestream" src={URL.createObjectURL(image)} alt={image.name} />;
};

export default withRouter(CreateDashboard);
