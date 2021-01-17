import React, { useEffect, useState } from 'react'
import SideNavbarMerchant from 'components/SideNavbarMerchant'
import { useHistory } from "react-router-dom";
import { ReactComponent as FbIcon } from 'assets/images/fb-icon-blue.svg'
import { ReactComponent as EmailIcon } from 'assets/images/email-icon.svg'
import { ReactComponent as GoogleIcon } from 'assets/images/google-icon-colorful.svg'
import Avatar from 'react-avatar';
import users from 'api/users'
import { toast, ToastContainer } from 'react-toastify'
import Dropdown from 'components/forms/dropdown'
import livestream from 'api/livestream';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Spinner from 'components/spinner'

const MySwal = withReactContent(Swal)
const ProfileEdit = () => {

    let history = useHistory();
    const [data, setData] = useState('');
    const [mypic, setMypic] = useState('')
    const [category, setCategory] = useState(data.category)
    const [categoryid, setCategoryid] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [newPass, setnewPass] = useState('')
    const [rePass, setrePass] = useState('')
    const [delAva, setDelAva] = useState('')
    const [currentPass, setcurrentPass] = useState('')
    const [loginBy] = useState(localStorage.getItem('PITO:login'));
    const [cat1, setCat1] = useState('Select...')
    const [cat2, setCat2] = useState('Select...')
    const [cat3, setCat3] = useState('Select...')
    const [ava, setAva] = useState('')
    const [value, setValue] = useState(0)

    function handleCurrent(data) {
        setcurrentPass(data)
    }
    function handleNew(data) {
        setnewPass(data)
    }
    function handleRe(data) {
        setrePass(data)
    }

    function useForceUpdate(c1, c2, c3) {// integer state

        setValue(value => value + 1)
        setCat1(c1)
        setCat2(c2)
        setCat3(c3)
        // update the state to force render
    }

    const getData = () => {
        users.getProfile().then(e => {

            setAva(e.data.img_avatar)
            setData(e.data);
            let categories = e.data.categories;
            let c1 = categories[0] && categories[0].name ? categories[0].name : 'Category'
            let c2 = categories[1] && categories[1].name ? categories[1].name : 'Category'
            let c3 = categories[2] && categories[2].name ? categories[2].name : 'Category'
            
            // useForceUpdate(c1, c2, c3)
            // setCat1(c1)
            // setCat2(c2)
            // setCat3(c3)
            let c = e.data.categories.map((item, index) => {
                return {
                    key: index + 1,
                    value: item.category_id
                }
            })
            var result = [];
            let idx = 1;
            for (var i = 0; i < c.length; i++) {
                result = [...result, { [idx]: c[i].value }];
                idx = idx + i
            }

            setCategoryid(result)
            setLoading(false);
            return () => {
                useForceUpdate(c1, c2, c3)
            }
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
        // getData()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        users.getProfile().then(e => {

            setAva(e.data.img_avatar)
            setData(e.data);
            let categories = e.data.categories;
            let c1 = categories[0] && categories[0].name ? categories[0].name : 'Category'
            let c2 = categories[1] && categories[1].name ? categories[1].name : 'Category'
            let c3 = categories[2] && categories[2].name ? categories[2].name : 'Category'

            let c = e.data.categories.map((item, index) => {
                return {
                    key: index + 1,
                    value: item.category_id
                }
            })
            var result = [];
            let idx = 1;
            for (var i = 0; i < c.length; i++) {
                result = [...result, { [idx]: c[i].value }];
                idx = idx + i
            }

            setCategoryid(result)
            setLoading(false);

            useForceUpdate(c1, c2, c3)

        })
    }, [])
    function mypicChange(e) {
        setMypic(e.target.files[0])
        data.img_avatar = URL.createObjectURL(e.target.files[0])
    }

    function changeCategoryid(e, idx) {
        let arrCat = Object.keys(categoryid).length === 0 && categoryid.constructor === Object ? [] : [...categoryid]
        arrCat.splice(idx, 1)
        if (e) { arrCat.push(e.id) }
        setCategoryid(arrCat)
    }

    function deleteAvatar() {
        setDelAva('X')
        MySwal.fire("Success", 'Your image has been successfully deleted, but the changes will be visible after you re-login', 'success')
    }

    function handleCancel() {
        history.goBack()
    }

    function handleEdit() {
        setLoading(true);
        let cat = []
        for (const [value] of Object.entries(categoryid)) {
            cat.push(value)
        }

        if (new Set(cat).size !== cat.length) {
            setLoading(false)
            MySwal.fire('Validation!', 'Cannot pick same categories.', 'warning');
            return;
        }

        const formData = new FormData();
        // for (const [key, value] of Object.entries(data)) {
        //     formData.append(key, value)
        // }
        formData.append('mypic', mypic)
        formData.append('company_name', data.company_name)
        formData.append('about', data.about)
        formData.append('company_website', data.company_website)
        formData.append('fb_url', data.fb_url)
        formData.append('ig_url', data.ig_url)
        formData.append('tiktok_url', data.tiktok_url)
        formData.append('categories', cat)
        formData.append('delAvatar', delAva)

        if (currentPass && rePass && newPass) {
            if (newPass !== rePass) {
                MySwal.fire("Validation!", "Password does not same", 'warning')
            } else {
                users.changePassword({
                    old_password: currentPass,
                    new_password: newPass
                }).then(e => {
                    toast.success(e.message);
                })
            }
        }

        users.submitProfile(formData).then(e => {
            if (e.isSuccess) {
                MySwal.fire("Success", e.message, 'success')
                getData()
            } else {
                MySwal.fire("Error", e.message, 'error')
            }
        })
    }
    function UploadNewAva() {
        document.getElementById("uploadAva").click()
    }
    function handleChange(data, value) {
        setData((e) => {
            return {
                ...e,
                [data]: value
            }
        })
    }

    return (
        <Spinner isLoading={isLoading} className="min-h-screen">
            <section className="min-h-screen flex flex-col xl:flex-row">
                <SideNavbarMerchant />
                <ToastContainer position="top-right" />
                <div className="py-10 md:py-10 flex flex-col md:flex-row w-full">
                    <div className="w-full md:w-3/5 xxl:w-1/2 px-4">
                        <div className="flex flex-col xl:flex-row md:pl-24 items-center">
                            <div className=" w-4/5 xl:w-1/3 ">
                                {
                                    data.img_avatar === '' && ava === '' ? (<Avatar name={data.name} className="mx-auto" round={true} size="125px" />) :
                                        (<img src={data.img_avatar ? data.img_avatar : ava} draggable={false} style={{ width: '150px', height: '150px' }} className="rounded-full border-8 mb-4 xl:mb-0 xl:mr-4 border-red-600 mx-auto" alt={data.name} />)

                                }
                                <br />
                                <h3 className="mr-8 text-sm font-light flex flex-row-reverse">{data && data.email}</h3>
                            </div>
                            <div className="xl:px-8 w-3/6">
                                <div className="flex flex-wrap w-full pt-2">
                                    <input hidden type="file" onChange={(e) => mypicChange(e)} id="uploadAva" />
                                    <button onClick={UploadNewAva} className="px-4 py-1 w-full bg-red-600 shadow-md my-2 text-white text-sm rounded-xl">Upload New Avatar</button>
                                    <button onClick={deleteAvatar} className="px-6 py-1 w-full border border-red-600 shadow-md my-2 text-red-600 text-sm rounded-xl">Delete Avatar</button>
                                    <div className="user-detail w-full justify-center pt-2">
                                        {
                                            loginBy === "facebook" ? (<span className="text-sm flex justify-center md:text-base shadow-md px-2 mt-2 py-1 border border-gray-50 rounded-xl bg white text-gray-700">
                                                <FbIcon className="mr-3" /> Facebook </span>) :   // if(a) then `b`
                                                loginBy === "facebook" ? (<span className="text-sm flex justify-center md:text-base shadow-md px-2 mt-2 py-1 border border-gray-50 rounded-xl bg white text-gray-700">
                                                    <GoogleIcon className="mr-3" /> Google </span>) : (<span className="text-sm flex justify-center md:text-base shadow-md px-2 mt-2 py-1 border border-gray-50 rounded-xl bg white text-gray-700">
                                                        <EmailIcon className="mr-3" /> Connected by Email </span>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col">
                        <div className="flex flex-col pt-8 md:pt-0 px-4">
                            <h6 className="text-red-600 font-semibold text-lg">Edit Profile</h6>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Display Name</label>
                                <input type="text" value={data && data.name} onChange={(e) => {
                                    handleChange('name', e.target.value)
                                }} placeholder="Your Display Name" className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="about" className="w-full md:w-1/4 text-sm text-gray-700">About</label>
                                <textarea value={data && data.about} onChange={(e) => {
                                    handleChange('about', e.target.value)
                                }} placeholder="Describe Your Self" className="w-full text-sm md:w-4/6 px-2 py-1 h-32 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Category 1</label>
                                <div className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" >
                                    <Dropdown isNeedReset={true} title={cat1} placeholder="Category 1" items={category} onClick={changeCategoryid} idx={0} />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Category 2</label>
                                <div className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" >
                                    <Dropdown isNeedReset={true} title={cat2} placeholder="Category 2" items={category} onClick={changeCategoryid} idx={1} />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Category 3</label>
                                <div className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" >
                                    <Dropdown isNeedReset={true} title={cat3} placeholder="Category 3" items={category} onClick={changeCategoryid} idx={2} />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Facebook Page Link</label>
                                <input type="text" value={data && data.fb_url} onChange={(e) => {
                                    handleChange('fb_url', e.target.value)
                                }} placeholder="https://facebook.com" className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Instagram Page Link</label>
                                <input type="text" value={data && data.ig_url} onChange={(e) => {
                                    handleChange('ig_url', e.target.value)
                                }} placeholder="https://instagram.com" className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Tiktok Page Link</label>
                                <input type="text" value={data && data.tiktok_url} onChange={(e) => {
                                    handleChange('tiktok_url', e.target.value)
                                }} placeholder="https://tiktok.com" className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" />
                            </div>
                        </div>
                        <div className="flex flex-col pt-8 md:pt-0 px-4 mt-4 md:mt-4">
                            <h6 className="text-red-600 font-semibold text-lg">Edit Password</h6>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="currentPassword" className="w-full md:w-1/4 text-sm text-gray-700">Current Password</label>
                                <input type="password" value={currentPass} onChange={(e) => handleCurrent(e.target.value)} placeholder="Your Current Password" className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">New Password</label>
                                <input type="password" value={newPass} onChange={(e) => handleNew(e.target.value)} placeholder="Your New Passoword" className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" />
                            </div>
                            <div className="flex flex-wrap w-full items-start my-2">
                                <label htmlFor="name" className="w-full md:w-1/4 text-sm text-gray-700">Retype Password</label>
                                <input type="password" value={rePass} onChange={(e) => handleRe(e.target.value)} placeholder="Retype Your new Passoword" className="w-full text-sm md:w-4/6 px-2 py-1 my-2 md:my-0 md:ml-4 border border-gray-300 rounded-md" />
                            </div>
                            <div className="flex justify-end md:px-8 mt-4">
                                <button onClick={handleCancel} className="w-1/3 px-4 py-1 rounded-3xl border border-red-600 text-red-600 mx-5 font-medium">Cancel</button>
                                <button onClick={handleEdit} className="w-1/3 px-4 py-1 rounded-3xl bg-red-600 text-white font-medium">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Spinner>
    )
}

export default ProfileEdit;
