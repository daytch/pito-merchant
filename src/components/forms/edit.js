import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ReactComponent as FbIcon } from 'assets/images/fb-icon.svg'
import { ReactComponent as IgIcon } from 'assets/images/ig-icon.svg'
import { ReactComponent as TtIcon } from 'assets/images/tiktok-icon.svg'
import { ReactComponent as UploadIcon } from 'assets/images/upload-icon.svg'
import Dropdown from 'components/forms/dropdown'
// import Spinner from 'components/spinner'
import livestream from 'api/livestream';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment'

const MySwal = withReactContent(Swal)

const Edit = ({ data, openLoading, closeLoading }) => {

    const { id } = useParams()
    const [mypic, setMypic] = useState('')
    const [startDate, setStartDate] = useState(moment(data.start_time).format("MM/DD/YYYY"))
    const [startTime, setStartTime] = useState(moment(data.start_time).format("hh:mm"))
    const [endTime, setEndTime] = useState('')
    const [title, setTitle] = useState(data.title)
    const [desc, setDesc] = data.desc ? useState(data.desc) : useState(data.caption)
    const [category1] = useState(data.category1)
    const [category2] = useState(data.category2)
    const [category3] = useState(data.category3)
    const [thumbnail] = useState(data.thumbnail)
    const [fb_url, setFburl] = useState(data.fb)
    const [tiktok_url, setTiktokurl] = useState(data.tiktok)
    const [ig_url, setIgurl] = useState(data.tiktok)
    const [category, setCategory] = useState(data.category)
    const [categoryid, setCategoryid] = useState({})

    useEffect(() => {
        livestream.getCategory().then((res) => {
            const ListCategory = res.data.map((i) => {
                return { "id": i.id, "value": i.text }
            })
            setCategory(ListCategory);
            closeLoading()
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
        setCategoryid({ ...categoryid, [idx]: e.id });
    }

    //state error handler
    const [errors, seterrors] = useState(null)
    const submit = (e) => {
        e.preventDefault();
        openLoading()

        let ids = Object.values(categoryid);
        let endDate = startDate + " " + endTime;
        let start = startDate + " " + startTime;

        let cat = []
        for (const [value] of Object.entries(categoryid)) {
            cat.push(value)
        }

        if (!title) {
            closeLoading()
            MySwal.fire('Validation!', 'Title cannot be empty.', 'warning');
            return;
        }

        if (new Set(cat).size !== cat.length) {
            closeLoading()
            MySwal.fire('Validation!', 'Cannot pick same categories.', 'warning');
            return;
        }

        if (!startDate) {
            closeLoading()
            MySwal.fire('Validation!', 'Start Date cannot be empty.', 'warning');
            return;
        }

        if (!startTime) {
            closeLoading()
            MySwal.fire('Validation!', 'Start Time cannot be empty.', 'warning');
            return;
        }


        if (!endTime) {
            closeLoading()
            MySwal.fire('Validation!', 'End Time cannot be empty.', 'warning');
            return;
        }

        if (!ids) {
            closeLoading()
            MySwal.fire('Validation!', 'Category cannot be empty.', 'warning');
            return;
        }

        if (!fb_url && !tiktok_url && !ig_url) {
            closeLoading()
            MySwal.fire('Validation!', 'Link streaming video cannot be empty.', 'warning');
            return;
        }

        const formData = new FormData();
        formData.append("videoId", id);
        formData.append("mypic", mypic);
        formData.append("startDate", start);
        formData.append("endDate", endDate);
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("fb_url", fb_url);
        formData.append("tiktok_url", tiktok_url);
        formData.append("ig_url", ig_url);
        formData.append("category", ids);

        livestream.create(formData).then((res) => {
            closeLoading()
            MySwal.fire({
                icon: 'success',
                title: 'Success',
                text: res.message
            })
        }).catch(err => {
            seterrors(err?.response?.data?.message)
            console.error(errors)
        })
    }

    return (
        <>
            <div className="w-full xl:w-4/5">
                <form>
                    <div className="flex flex-wrap w-full items-start">
                        <label htmlFor="title" className="w-full md:w-1/5 text-lg text-gray-700">Title <span className="text-red-700">*</span></label>
                        <input type="text" placeholder="Title" value={title} onChange={titleChange} className="w-full md:w-2/5 px-4 py-2 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="flex flex-wrap w-full items-start mt-4">
                        <label htmlFor="desc" className="w-full md:w-1/5 text-lg text-gray-700">Description</label>
                        <textarea placeholder="Description" value={desc} onChange={descChange} className="w-full md:w-2/5 h-32 px-4 py-2 md:ml-4 my-2 md:my-0 border border-gray-300 rounded-lg" />
                    </div>
                    <div className="flex flex-wrap w-full items-center mt-4">
                        <div className="md:pr-4">
                            <label htmlFor="date" className="text-lg text-gray-700">Date <span className="text-red-700">*</span></label>
                            <input type="date" value={startDate} onChange={startdateChange} name="date" className="px-4 py-2 mx-4 md:ml-4 my-2 md:my-0 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="md:pr-4">
                            <label htmlFor="start" className="text-lg text-gray-700">Start Time <span className="text-red-700">*</span></label>
                            <input type="time" name="start" value={startTime} onChange={startTimeChange} className="px-4 py-2 mx-4 md:ml-4 my-2 md:my-0 border border-gray-300 rounded-lg" />
                        </div>
                        <div className="md:pr-4">
                            <label htmlFor="end" className="text-lg text-gray-700">End Time <span className="text-red-700">*</span></label>
                            <input type="time" name="start" value={endTime} onChange={endTimeChange} className="px-4 py-2 mx-4 md:ml-4 my-2 md:my-0 border border-gray-300 rounded-lg" />
                        </div>
                    </div>
                    <div className="flex space-x-3 flex-wrap w-full items-center mt-4">
                        <label htmlFor="category" className="w-full md:w-auto text-lg text-gray-700">Categories</label>

                        <div className="flex-2 md:flex-1 form-categories border border-gray-300 rounded-lg px-2 py-2 mr-4 my-2 md:ml-4 w-full" role="button">
                            <Dropdown title={category1} placeholder="Category 1" items={category} onClick={changeCategoryid} idx={1} />
                        </div>
                        <div className="flex-2 md:flex-1 form-categories border border-gray-300 rounded-lg px-2 py-2 mr-4 my-2 md:ml-4 w-full" role="button">
                            <Dropdown title={category2} placeholder="Category 2" items={category} onClick={changeCategoryid} idx={2} />
                        </div>
                        <div className="flex-2 md:flex-1 form-categories border border-gray-300 rounded-lg px-2 py-2 mr-4 my-2 md:ml-4 w-full" role="button">
                            <Dropdown title={category3} placeholder="Category 3" items={category} onClick={changeCategoryid} idx={3} />
                        </div>
                    </div>
                    <div className="form-dashboard flex flex-wrap w-full items-center mt-4">
                        <label htmlFor="fbLink" className="flex-3 md:flex-5 text-lg text-gray-700">Facebook Livestreams Link <span className="text-red-700">*</span></label>
                        <input type="text" value={fb_url} onChange={fburlChange} placeholder="https://facebook.com/live/url" className="w-auto flex-2 md:flex-1 px-4 py-2 mr-2 md:mx-4 border border-gray-300 rounded-lg" />
                        <FbIcon />
                    </div>
                    <div className="form-dashboard flex flex-wrap w-full items-center mt-4">
                        <label htmlFor="igLink" className="flex-3 md:flex-5 text-lg text-gray-700">Instagram Livestreams Link <span className="text-red-700">*</span></label>
                        <input type="text" value={ig_url} onChange={igurlChange} placeholder="https://instagram.com/live/url" className="w-auto flex-2 md:flex-1 px-4 py-2 mr-2 md:mx-4 border border-gray-300 rounded-lg" />
                        <IgIcon />
                    </div>
                    <div className="form-dashboard flex flex-wrap w-full items-center mt-4">
                        <label htmlFor="ttLink" className="flex-3 md:flex-5 text-lg text-gray-700">Tiktok Livestreams Link <span className="text-red-700">*</span></label>
                        <input type="text" value={tiktok_url} onChange={tiktokurlChange} placeholder="https://tiktok.com/live/url" className="w-auto flex-2 md:flex-1 px-4 py-2 mr-2 md:mx-4 border border-gray-300 rounded-lg" />
                        <TtIcon />
                    </div>
                    <div className="form-dashboard flex flex-wrap w-full items-center mt-4">
                        {/* <label htmlFor="ttLink" className="flex-3 md:flex-5 text-lg text-gray-700">Thumbnail</label>
                        <input type="file" onChange={mypicChange} className="w-auto flex-2 md:flex-1 px-4 py-2 mr-2 md:mx-4 border border-gray-300 rounded-lg" /> */}
                        <label htmlFor="ttLink" className="flex-3 md:flex-5 text-lg text-gray-700">Thumbnail</label>
                        <label className="md:flex-1 md:px-4 md:py-2 md:mr-2 md:mx-4 md:border md:border-gray-300 md:rounded-lg">
                            <input type="file" onChange={mypicChange} aria-label="File browser thumbnail" />
                            <span className="file-custom"></span>
                        </label>
                            <UploadIcon className="icon-upload" />
                        <br />
                        {mypic && <ImageThumb image={mypic} />}
                    </div>
                    <div className="flex mt-6">
                        <button className="border border-gray-300 text-red-600 rounded-lg text-lg px-6 py-2 mr-4">Cancel</button>
                        <button onClick={submit} className="border  text-white font-medium bg-red-600 rounded-lg text-lg px-10 py-2">Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}
/**
 * Component to display thumbnail of image.
 */
const ImageThumb = ({ image }) => {
    return <img className="img-livestream" src={URL.createObjectURL(image)} alt={image.name} />;
};


export default Edit;