import React, { useEffect } from 'react'
import SideNavbarMerchant from 'components/SideNavbarMerchant'

import { ReactComponent as FbIcon } from 'assets/images/fb-icon-blue.svg'
import { ReactComponent as EmailIcon } from 'assets/images/email-icon.svg'
import { ReactComponent as GoogleIcon } from 'assets/images/google-icon-colorful.svg'
import Avatar from 'react-avatar';
// import users from 'api/users'
import axios from 'configs/axios'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Dropdown from 'components/forms/dropdown'
import livestream from 'api/livestream';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
const ProfileEdit = () => {
    // const { data } = this.props.location;
    const [data, setData] = useState([]);
        const [category, setCategory] = useState(data.category)
    const [categoryid, setCategoryid] = useState({})
    const [loading,setLoading] = useState(true)
    const [newPass, setnewPass] = useState('')
    const [rePass, setrePass] = useState('')
    const [currentPass, setcurrentPass] = useState('')

    function handleCurrent(data){
        setcurrentPass(data)
    }
    function handleNew(data){
        setnewPass(data)
    }
    function handleRe(data){
        setrePass(data)
    }

    
    function getData(){
        axios.get("/merchant/getProfile").then(e =>{
           setData(e.data);
           let c = e.data.categories.map((item,index)=>{
               return {
                   key: index + 1,
                   value: item.category_id
                
               }
           })
           var result = {};
            for (var i = 0; i < c.length; i++) {
            result[c[i].key] = c[i].value;
            }
           setCategoryid(result)

       })
    }

  
    useEffect(() => {
        livestream.getCategory().then((res) => {
            const ListCategory = res.data.map((i) => {
                return { "id": i.id, "value": i.text }
            })
            setCategory(ListCategory);
            setLoading(false)
        })
       getData()
    }, [])

    function changeCategoryid(e, idx) {
        setCategoryid({ ...categoryid, [idx]: e.id });
    }
    function handleEdit(){
        let cat = []
        for (const [key, value] of Object.entries(categoryid)) {
            console.log(key);
            cat.push(value)
        }
        if (new Set(cat).size !== cat.length) {
            setLoading(false)
            MySwal.fire('Validation!', 'Cannot pick same categories.', 'warning');
            return;
        }

        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key,value)
        }
        formData.append('categories', cat)

        if(currentPass && rePass && newPass){
            if(newPass != rePass){
                alert('New Password dan Retype Passord tidak sama')
            }else{
                axios.post('/user/changePassword',{
                    old_password: currentPass,
                    new_password: newPass
                }).then(e=>{
                    toast.success(e.message);
                })
            }
        }

        axios.post('/merchant/submitProfile',formData).then(e=>{
            toast.success('Data berhasil diperbaharui');
            getData()
        })
    }

    function handleChange(data,value){
        setData((e)=>{
            return {
                ...e,
                [data]: value 
            }
        })
    }
  
    return (
        <>
            <section className="min-h-screen flex flex-col xl:flex-row">
                <SideNavbarMerchant />
                <ToastContainer position="top-right" />
                <div className="py-10 md:py-20 flex flex-col md:flex-row w-full">
                    <div className="w-full md:w-3/5 xxl:w-1/2 px-4">
                        <div className="flex flex-col xl:flex-row xl:items-center">                            
                       
                            {
                                data.img_avatar ? (<img src={data.img_avatar} draggable={false} className="rounded-full w-4/5 xl:w-1/3 border-8 mb-4 xl:mb-0 xl:mr-4 border-red-600 mx-auto" alt={data.name} />) :
                                    (<Avatar name="Nurul Hidayat" className="mx-auto" round={true} size="125px" />)
                            }
                            <div className="xl:px-8 w-auto">
                                <h4 className="text-red-600 text-2xl font-bold">{data.name}</h4>
                                <p className="text-sm mt-1 font-light text-justify">
                                    {data.email}
                                </p>
                                <div className="flex flex-wrap w-full pt-2">
                                    <button className="px-4 mr-4 xl:mx-2 py-2 w-auto bg-red-600 shadow-md my-2 text-white text-xs xl:text-sm font-medium rounded-2xl">Upload New Avatar</button>
                                    <button className="px-6 py-2 w-auto border border-red-600 shadow-md my-2 text-red-600 text-xs xl:text-sm font-medium rounded-2xl">Delete Avatar</button>
                                </div>
                            </div>
                        </div>
                        <div className="user-detail flex flex-wrap xl:flex-no-wrap justify-center pt-2">
                            <button className="flex items-center text-sm md:text-base shadow-md mr-4 px-6 mt-4 py-2 border border-gray-50 rounded-lg bg white text-gray-700">
                                <FbIcon className="mr-3" /> Connect
                                                </button>
                            <button className="flex items-center text-sm md:text-base shadow-md px-6 mt-4 mr-4 py-2 border border-gray-50 rounded-lg bg white text-gray-700">
                                <GoogleIcon className="mr-3" /> Connect
                                                </button>
                            <button className="flex items-center text-sm md:text-base shadow-md mr-4 px-6 mt-4 py-2 border border-gray-50 rounded-lg bg white text-gray-700">
                                <EmailIcon className="mr-3" /> Email
                                                </button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col">
                        <div className="flex flex-col pt-8 md:pt-0 px-4">
                            <h6 className="text-red-600 font-semibold text-lg">Edit Profile</h6>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-base text-gray-700">Display Name</label>
                                <input type="text" value={data.name} onChange={(e)=>{
                                    handleChange('name',e.target.value)
                                }} placeholder="Your Display Name" className="w-full md:w-4/6 px-4 py-2 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="about" className="w-full md:w-1/4 text-base text-gray-700">About</label>
                                <textarea value={data.about} onChange={(e)=>{
                                    handleChange('about',e.target.value)
                                }} placeholder="Describe Your Self" className="w-full md:w-4/6 px-4 py-2 h-32 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="flex flex-wrap w-full items-center mt-4">
                            <label htmlFor="category" className="w-full md:w-auto text-lg text-gray-700">Categories</label>
                            <div className="flex">
                                <div className="form-categories border border-gray-300 rounded-lg px-1 py-2 mr-1 my-2 md:ml-1" role="button">
                                    <Dropdown title="Category" placeholder="Category 1" items={category} onClick={changeCategoryid} idx={1} />
                                </div>
                                <div className="form-categories border border-gray-300 rounded-lg px-1 py-2 mr-1 my-2 md:ml-1" role="button">
                                    <Dropdown title="Category" placeholder="Category 2" items={category} onClick={changeCategoryid} idx={2} />
                                </div>
                                <div className="form-categories border border-gray-300 rounded-lg px-1 py-2 mr-1 my-2 md:ml-1" role="button">
                                    <Dropdown title="Category" placeholder="Category 3" items={category} onClick={changeCategoryid} idx={3} />
                                </div>
                            </div>

                        </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-base text-gray-700">Facebook Page Link</label>
                                <input type="text" value={data.fb_url} onChange={(e)=>{
                                    handleChange('fb_url',e.target.value)
                                }} placeholder="https://facebook.com" className="w-full md:w-4/6 px-4 py-2 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-base text-gray-700">Instagram Page Link</label>
                                <input type="text" value={data.ig_url} onChange={(e)=>{
                                    handleChange('ig_url',e.target.value)
                                }} placeholder="https://instagram.com" className="w-full md:w-4/6 px-4 py-2 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-base text-gray-700">Tiktok Page Link</label>
                                <input type="text" value={data.tiktok_url} onChange={(e)=>{
                                    handleChange('tiktok_url',e.target.value)
                                }} placeholder="https://tiktok.com" className="w-full md:w-4/6 px-4 py-2 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-lg" />
                            </div>
                        </div>
                        <div className="flex flex-col pt-8 md:pt-0 px-4 mt-4 md:mt-8">
                            <h6 className="text-red-600 font-semibold text-lg">Edit Password</h6>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="currentPassword" className="w-full md:w-1/4 text-base text-gray-700">Current Password</label>
                                <input type="text" value={currentPass} onChange={(e)=>handleCurrent(e.target.value)}  placeholder="Your Current Password" className="w-full md:w-4/6 px-4 py-2 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-base text-gray-700">New Password</label>
                                <input type="text" value={newPass} onChange={(e)=>handleNew(e.target.value)} placeholder="Your New Passoword" className="w-full md:w-4/6 px-4 py-2 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-base text-gray-700">Retype Password</label>
                                <input type="text" value={rePass} onChange={(e)=>handleRe(e.target.value)} placeholder="Retype Your new Passoword" className="w-full md:w-4/6 px-4 py-2 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="flex justify-end md:px-8 mt-4">
                                <button className="w-1/3 px-4 py-2 rounded-3xl border border-red-600 text-red-600 mx-5 font-medium">Cancel</button>
                                <button onClick={handleEdit} className="w-1/3 px-4 py-2 rounded-3xl bg-red-600 text-white font-medium">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ProfileEdit;
