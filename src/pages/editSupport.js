import React, { useEffect, useState } from 'react'
import Sidebar from 'components/SideNavbarMerchant'
import Card from 'components/card'
import Support from 'api/support'
import Dropdown from 'components/forms/dropdown'
import { Link } from 'react-router-dom'
import Spinner from 'components/spinner'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const EditSupport = (props) => {

    const [isLoading, setLoading] = useState(false)
    const [id] = useState(props.match.params.id)
    const [title, setTitle] = useState('')
    const [data, setData] = useState([])
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')
    const [hideInput, setHideInput] = useState(false);

    function changeMessage(e) {
        setMessage(e.getData());
    }
    const getMessage = () => {
        Support.getTicketHistory(id).then((res) => {
            // setHideInput(isClosed === -1 ? false : true)
            const a = res.data.map(a => {
                return {
                    name: a.name,
                    text: a.text,
                    lastUpdated: a.createdAt,
                    image: ""
                }
            })

            setData(a);
            setLoading(false)
        })
    }

    useEffect(() => {
        setLoading(true)
        Support.getTicketHistory(id).then((res) => {
            const isClosed = res.data.map((el) => el.status).indexOf(1);
            setHideInput(isClosed === -1 ? false : true);
            setTitle(res.data[0].subject);
            const a = res.data.map(a => {
                return {
                    name: a.name,
                    text: a.text,
                    lastUpdated: a.createdAt,
                    image: ""
                }
            })

            setData(a);
            setLoading(false)
        })
    }, [id])

    function changeStatus(e) {
        if (e.id === 1) {
            MySwal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, close it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    setLoading(true)
                    let ticket_id = id;
                    Support.delete({ ticket_id }).then((res) => {
                        setLoading(false)
                        MySwal.fire(
                            'Deleted!',
                            'Your data has been deleted.',
                            'success'
                        ).then(() => {
                            window.location.href = '/support'
                        })
                    })
                }
            })
        }
        setStatus(e.id)
    }

    function handleSubmit() {
        setLoading(true)
        const formData = new FormData();
        formData.append('ticket_id', props.match.params.id)
        formData.append('message', message)
        formData.append('status', status)
        Support.postReplyTicket(formData).then((res) => {
            getMessage()
        })
    }

    function handleChange(data) {
        setMessage(data)
    }

    const items = [
        {
            id: 0,
            value: 'Open'
        },
        {
            id: 1,
            value: 'Close'
        }
    ]

    return (
        <Spinner isLoading={isLoading}>
            <section className="min-h-screen flex flex-col xl:flex-row ">
                <Sidebar />
                <div className="chat-history">
                    {
                        hideInput ? null :
                            (
                                <div className="ml-3 md:ml-20 mt-5">
                                    <div className="flex">
                                        <div className="w-full md:w-40 form-categories border border-gray-300 rounded-md px-2 py-2 mr-4 my-2" role="button">
                                            <Dropdown title="Open" onClick={changeStatus} items={items} />
                                        </div>
                                    </div>
                                </div>
                            )
                    }
                    <Card ListData={data} title={title} key={1} />
                    {
                        hideInput ? (
                            <div className="ml-20 mt-5">
                                <div className="flex">
                                    <Link to={"/support"} className="border border-gray-300 text-red-600 rounded-md text-lg px-6 py-2 mr-4">Back</Link>
                                </div>
                            </div>) :
                            (
                                <div className="md:ml-16">
                                    <div className="flex mb-3 flex-wrap items-start mt-4">
                                        <CKEditor
                                            editor={ClassicEditor}
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
                                            }}
                                            onChange={(event, editor) => {
                                                changeMessage(editor);
                                            }}
                                        />
                                    </div>
                                    <div className="flex">
                                        <Link to={"/support"} className="border border-gray-300 text-red-600 rounded-md text-lg px-6 py-2 mr-4">Back</Link>
                                        <button onClick={handleSubmit} className="border lg:w-32 w-full text-white font-medium bg-red-600 rounded-lg text-lg px-10 py-2">Reply</button>
                                    </div>
                                </div>)
                    }
                </div>
            </section>
        </Spinner>
    )
}

export default EditSupport;
