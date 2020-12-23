import React, { useState } from 'react'
import { ReactComponent as Pito } from 'assets/images/pito.svg'
import users from 'api/users'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Spinner from 'components/spinner'

const MySwal = withReactContent(Swal)


const ForgotPassword = () => {

    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [errors, seterrors] = useState(null)

    function emailChange(e) {
        setEmail(e.target.value)
    }

    const submit = (e) => {
        setLoading(true);
        e.preventDefault();

        //use function login from users
        users.forgotPassword({
            email
        }).then((res) => {
            setLoading(false)
            MySwal.fire('Success!', res.message, 'success');
        }).catch(err => {
            setLoading(false)
            seterrors(err?.response?.data?.message)
            console.error(errors);
        })
    }

    return (
        <Spinner isLoading={isLoading}>
            <form onSubmit={submit}>
                <div className="fp bg-white md:bg-red-600 md:py-20 md:px-10 xl:px-0">
                    <div className="fp-controller bg-white md:rounded-2xl xl:w-2/5 mx-auto px-6 py-20 xxl:py-40">
                        <Pito className="mx-auto" />
                        <div className="mt-20 xl:mt-16 xxl:mt-32 flex flex-col px-6 md:px-10 ">
                            <h5 className="text-red-600 font-bold text-xl">Forgot Password?</h5>
                            <p className="font-light text-base text-gray-700 mt-4">Enter Your Email Address Registered with Pito</p>
                            <input type="email" value={email} onChange={emailChange} placeholder="Email Address" className="mt-4 border border-red-600 rounded-lg w-full px-3 py-4" />
                            <button type="submit" className="w-4/5 md:w-1/2 bg-red-600 mt-6 mx-auto text-white font-medium text-lg py-2 rounded-3xl">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </Spinner>
    )
}

export default ForgotPassword;
