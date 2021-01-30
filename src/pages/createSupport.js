import React, { useState } from 'react'
import Sidebar from 'components/SideNavbarMerchant'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import support from 'api/support';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Spinner from 'components/spinner'
import { Link } from 'react-router-dom'

const MySwal = withReactContent(Swal)

const CreateSupport = () => {

    const [isLoading, setLoading] = useState(false)
    const [subject, setSubject] = useState();
    const [message, setMessage] = useState();
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [image3, setImage3] = useState();
    //state error handler
    const [errors, seterrors] = useState(null)

    function changeSubject(e) {
        setSubject(e.target.value);
    }
    function changeMessage(e) {
        setMessage(e);
    }

    function changeAttachment1(e) {
        setImage1(e.target.files[0])
    }
    function changeAttachment2(e) {
        setImage2(e.target.files[0])
    }
    function changeAttachment3(e) {
        setImage3(e.target.files[0])
    }

    const submit = (e) => {
        e.preventDefault();
        setLoading(true)

        if (!subject) {
            setLoading(false)
            MySwal.fire('Validation!', 'Subject cannot be empty.', 'warning');
            return;
        }

        if (!message) {
            setLoading(false)
            MySwal.fire('Validation!', 'Message cannot be empty.', 'warning');
            return;
        }

        const formData = new FormData();
        formData.append("subject", subject);
        formData.append("message", message);
        if (image1) {
            formData.append("attachment1", image1);
        }
        if (image2) {
            formData.append("attachment2", image2);
        }
        if (image3) {
            formData.append("attachment3", image3);
        }

        support.create(formData).then((res) => {
            setLoading(false)
            MySwal.fire({
                icon: 'success',
                title: 'Success',
                text: res.message
            }).then(result => {
                console.log(result)
                window.location.href = '/support'
            })
        }).catch(err => {
            seterrors(err?.response?.data?.message)
            console.error(errors)
        })
    }


    return (
        <Spinner isLoading={isLoading}>
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="py-10 md:py-20 px-5 w-full">
                    <h6 className="text-red-600 font-bold text-lg">Create Ticket Support</h6><br />
                    <div className="flex md:pl-10 lg:pt-10 overflow-x-auto">
                        <form className="md:w-3/5">
                            <div className="flex flex-wrap w-full items-start mt-4">
                                <label htmlFor="title" className="w-full text-sm text-gray-700">Subject <span className="text-red-700">*</span></label><br></br>
                                <input type="text" placeholder="Subject" value={subject} onChange={changeSubject} className="text-sm w-full px-4 py-2 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="flex flex-wrap w-full items-start mt-4">
                                <label htmlFor="desc" className="w-full text-sm text-gray-700">Message <span className="text-red-700">*</span></label>
                                {/* <textarea placeholder="Message" value={message} onChange={changeMessage} className="text-sm w-full md:w-4/5 h-32 px-4 py-2 border border-gray-300 rounded-lg" /> */}
                                <CKEditor style={{ width: '99%' }}
                                    editor={ClassicEditor}
                                    // data="<p>Hello from CKEditor 5!</p>"
                                    config={{ placeholder: "Please type a message..." }}
                                    onReady={editor => {
                                        editor.editing.view.change(writer => {
                                            writer.setStyle(
                                                "height",
                                                "200px",
                                                editor.editing.view.document.getRoot()
                                            );
                                        });
                                        const data = editor.getData();
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        changeMessage(data);
                                        console.log({ event, editor, data });
                                    }}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                            </div><br />
                            <div className="flex flex-wrap w-full items-start">
                                <label htmlFor="attachment" className="w-full md:w-1/5 text-sm text-gray-700">Attachment</label>
                                <input type="file" onChange={changeAttachment1} className="text-xs w-4/5 xl:w-2/5 px-4 py-2 mx-2 md:mx-4 border border-gray-300 rounded-lg" />
                            </div>
                            <div className="flex mt-6">
                                <Link to="/support"><button className="border border-gray-300 text-red-600 rounded-lg text-sm px-6 py-2 mr-4">Cancel</button></Link>
                                <button onClick={submit} className="border lg:w-32 w-full text-white font-medium bg-red-600 rounded-lg text-sm px-10 py-2">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Spinner>
    )
}

export default CreateSupport;
