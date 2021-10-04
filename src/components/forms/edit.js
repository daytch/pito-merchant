import React, { useState, useEffect,useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
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
import Converter from 'configs/moment/DatetimeConverter'
import camera from '../../assets/images/camera-plus.png'

const MySwal = withReactContent(Swal)

const Edit = ({ data, openLoading, closeLoading }) => {
	console.log('end time : '+Converter.convertToLocal(data.dataVideos[0].end_time));
	console.log('start time : '+Converter.convertToLocal(data.dataVideos[0].date));
	const { id } = useParams()
	const [mypic, setMypic] = useState(data.dataVideos[0].thumbnail)
	const [startDate, setStartDate] = useState(Converter.convertToLocalDate(data.dataVideos[0].date))
	const [startTime, setStartTime] = useState(Converter.convertToLocalTime(data.dataVideos[0].date))
	const [endTime, setEndTime] = useState(Converter.convertToLocalTime(data.dataVideos[0].end_time))
	const [duration, setDuration] = useState(Converter.getHoursDiff(data.dataVideos[0].date,data.dataVideos[0].end_time));
	const [title, setTitle] = useState(data.title)
	const [desc, setDesc] = data.desc ? useState(data.desc) : useState(data.caption)
	const [fb_url, setFburl] = useState(data.dataVideos[0].redirect_fb)
	const [tiktok_url, setTiktokurl] = useState(typeof data.dataVideos[0].redirect_tiktok === 'undefined' || data.dataVideos[0].redirect_tiktok === 'undefined' ? '' : data.dataVideos[0].redirect_tiktok)
	const [ig_url, setIgurl] = useState(typeof data.dataVideos[0].redirect_ig === 'undefined' || data.dataVideos[0].redirect_ig === 'undefined' ? '' : data.dataVideos[0].redirect_ig)
	const [category, setCategory] = useState(data.category)
	const [categoryid, setCategoryid] = useState([]);
	const inputFile = useRef(null);
	const [category1,setCategory1] = useState(data.category1)
	const [category2,setCategory2] = useState(data.category2)
    const [category3,setCategory3] = useState(data.category3)
		const [disableCategory2,setDisableCategory2]=useState(data.category2.toLowerCase === 'category' ? true : false);
		const [disableCategory3,setDisableCategory3]=useState(data.category3.toLowerCase === 'category' ? true : false);

	useEffect(() => {
		livestream.getCategory().then((res) => {
			let catArr = [];
			const ListCategory = res.data.map((i) => {
				if (data.category1 && data.category1 === i.text) { catArr.push(i.id) }
				if (data.category2 && data.category2 === i.text) { catArr.push(i.id) }
				if (data.category3 && data.category3 === i.text) { catArr.push(i.id) }
				return { "id": i.id, "value": i.text }
			})
            debugger;
			setCategoryid(catArr)
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
	function durationChange(e) {
		setDuration(e.target.value)
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
		setCategoryid(arrCat);
			
			let nextCategory = [...category];
            let idxDoubles = nextCategory.map((x)=>x.id).indexOf(e.id);
            if(idxDoubles !== -1){
                nextCategory.splice(idxDoubles,1);
            }
			arrCat.map((item)=>{
				let idxDouble = nextCategory.map((x)=>x.id).indexOf(item);
                if(idxDouble !== -1){
                    nextCategory.splice(idxDouble,1);
                }
			});
			if(idx === 0){
				setDisableCategory2(false);
					setCategory1(nextCategory);
			}else if(idx === 1){
				setDisableCategory3(false);
					setCategory2(nextCategory);
				}
	}

	function removeImg(){
		setMypic('');
	}
	//state error handler
	const [errors, seterrors] = useState(null)

    const onButtonClick = () => {
        // `current` points to the mounted file input element
        inputFile.current.click();
        };

	const submit = (e) => {
		e.preventDefault();
		openLoading()

		let ids = Object.values(categoryid);
		let endDate = new Date(startDate).setHours(new Date(startDate).getHours() + duration);
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

		var date = new Date();
        var startz = new Date(startDate);
		date.setDate(date.getDate() + 7);
		// if (Moment(startDate).isSameOrAfter(date, 'day')) {
        if(startz.getTime() > date){
			closeLoading()
			MySwal.fire('Validation!', 'Start Date cannot more than a week.', 'warning');
			return;
		}

		if (!startTime) {
			closeLoading()
			MySwal.fire('Validation!', 'Start Time cannot be empty.', 'warning');
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
		formData.append("startDate", Converter.convertToUTC(start));
		formData.append("endDate", Converter.convertToUTC(endDate));
		formData.append("title", title);
		formData.append("desc", desc);
		formData.append("fb_url", fb_url ? fb_url : '');
		formData.append("tiktok_url", tiktok_url ? tiktok_url : '');
		formData.append("ig_url", ig_url ? ig_url : '');
		formData.append("category", ids);

		livestream.create(formData).then((res) => {
			closeLoading()
			MySwal.fire({
				icon: 'success',
				title: 'Success',
				text: res.message
			}).then(result => {
				window.location.href = '/dashboard'
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
			<div className="flex flex-wrap w-full items-center mt-4">
				<div className="w-full md:flex-1">
					<label htmlFor="date" className="text-sm text-gray-700">Start Date</label>
					<div className="md:pr-2">
						<input type="date" value={startDate} onChange={startdateChange} name="date" className="w-full px-4 py-2 my-2 md:my-0 border border-gray-300 rounded-md" />
					</div>
					<div className="flex mt-4">
						<div className="flex-1 md:pr-2">
							<label htmlFor="start" className="text-sm text-gray-700">Start Time <span className="text-red-700">*</span></label>
							<input type="time" name="start" value={startTime} onChange={startTimeChange} className="w-full px-4 py-2 my-2 md:my-0 border border-gray-300 rounded-md" />
						</div>
						<div className="flex-1 md:pr-2">
							<label htmlFor="end" className="text-sm text-gray-700">Duration <span className="text-red-700">*</span></label>
							<input type="number" placeholder="Duration" name="start" value={duration} min="0" onChange={durationChange} className="w-full px-4 py-2 my-2 md:my-0 border border-gray-300 rounded-md" />
						</div>
					</div>
				</div>
				<div className="w-full md:flex-1 md:ml-32">
					<label htmlFor="start" className="text-sm text-gray-700">Thumbnail</label>
					<input type='file' id='file' hidden ref={inputFile} onChange={mypicChange} />
					<div onClick={mypic ? undefined:onButtonClick} style={{cursor: mypic ? 'default':'pointer' }} className="flex flex-col relative border-dashed border-2 border-gray-300 h-48 rounded-md justify-center items-center">

						{mypic ? (<><ImageThumb image={mypic} /><div className="sign-close" onClick={removeImg}>X</div></>) : (<>
							<img src={camera} />
							<label>Upload Thumbnail</label>
							</>)}
					</div>
				</div>
				<div className="flex-1">
				</div>
			</div>
			<div className="w-full items-start mt-4">
				<label htmlFor="title" className="text-sm text-gray-700">Title <span className="text-red-700">* <span className="text-xs">(Not more than 60 Letters)</span></span></label>
				<input type="text" maxLength="60" placeholder="Title" value={title} onChange={titleChange} className="text-sm w-full px-4 py-2 my-2 md:my-0 border border-gray-300 rounded-md" />
			</div>
			<div className="flex-wrap w-full items-center mt-4">
				<label htmlFor="desc" className="text-sm text-gray-700">Description <span className="text-red-700 text-xs">(Not more than 2000 Letters)</span></label>
				<textarea maxLength="2000" placeholder="Description" value={desc} onChange={descChange} className="text-sm w-full h-32 px-4 py-2 my-2 md:my-0 border border-gray-300 rounded-md" />
			</div>
			<div className="w-full items-center mt-4">
				<div>
					<label htmlFor="category" className="text-sm text-gray-700">Categories</label>
				</div>
				<div className="w-full md:flex md:space-x-1">
					<div className="w-full mt-2 md:mt-0 md:flex-1 form-categories border border-gray-300 rounded-md px-2 py-2 " role="button">
						<Dropdown isNeedReset={true} title={category1} placeholder="Category 1" items={category} onClick={changeCategoryid} idx={0} />
					</div>
					<div className={"w-full mt-2 md:mt-0 md:flex-1 form-categories border border-gray-300 rounded-md px-2 py-2 "+(disableCategory2 ? 'bg-gray-300': 'bg-white')} role="button">
						<Dropdown isNeedReset={true} ttitle={category2} placeholder="Category 2" items={category} onClick={changeCategoryid} isDisabled={disableCategory2} idx={1} />
					</div>
					<div className={"w-full mt-2 md:mt-0 md:flex-1 form-categories border border-gray-300 rounded-md px-2 py-2 "+(disableCategory3 ? 'bg-gray-300': 'bg-white')} role="button">
						<Dropdown isNeedReset={true} title={category3} placeholder="Category 3" items={category} onClick={changeCategoryid} isDisabled={disableCategory3} idx={2} />
					</div>
				</div>
			</div>
			<div className="w-full mt-4">
				<label className="text-sm text-gray-700">Please enter your Livestream URL from Facebook, TikTok or Instagram <span className="text-red-700">*</span></label>
				<div className="form-dashboard flex flex-row flex-wrap w-full items-center">
					<FbIcon />
					<input type="text" value={fb_url} onChange={fburlChange} placeholder="https://facebook.com/live/url" className="w-10/12 md:w-auto ml-2 flex-2 md:flex-1 px-4 py-2 md:ml-4 border border-gray-300 rounded-md" />
				</div>
				<div className="form-dashboard flex flex-wrap w-full items-center mt-4">
					<IgIcon />
					<input type="text" value={ig_url} onChange={igurlChange} placeholder="https://instagram.com/live/url" className="w-10/12 md:w-auto ml-2 flex-2 md:flex-1 px-4 py-2 md:ml-4 border border-gray-300 rounded-md" />
				</div>
				<div className="form-dashboard flex flex-wrap w-full items-center mt-4">
					<TtIcon />
					<input type="text" value={tiktok_url} onChange={tiktokurlChange} placeholder="https://tiktok.com/live/url" className="w-10/12 md:w-auto ml-2 flex-2 md:flex-1 px-4 py-2 md:ml-4 border border-gray-300 rounded-md" />
				</div>
			</div>
			<div className="flex flex-row-reverse mt-6">
				<button onClick={submit} className="border ml-2 text-white font-medium bg-red-600 rounded-full text-sm px-10 py-2">Save</button>
				<Link to={"/dashboard"} className="border border-gray-300 text-red-600 rounded-full text-sm px-6 py-2 mr-4">Cancel</Link>
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
   if(typeof (image)==='string'){
	    return <img className="img-livestream-create" src={image} alt={image?.name} />;
   }else{
	return <img className="img-livestream-create" src={URL.createObjectURL(image)} alt={image.name} />;
   }
};


export default Edit;
