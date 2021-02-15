import React, { useState } from 'react'
import { ReactComponent as Pito } from 'assets/images/pito.svg'
import users from 'api/users'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Spinner from 'components/spinner'
import { useLocation } from "react-router-dom";

const MySwal = withReactContent(Swal)

const ChangePassword = () => {

    const [isLoading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')
    const [errors, seterrors] = useState(null)
    const [token] = useState(useQuery().get('token'))

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    function passwordChange(e) {
        setPassword(e.target.value)
    }

    function RePasswordChange(e) {
        setRePassword(e.target.value)
    }

    const submit = (e) => {
        setLoading(true);
        e.preventDefault();

        if (password !== repassword) {
            MySwal.fire('Validation!', "Passwords don't match", 'info');
        }
debugger;
        users.changePassword({
            password: password,
            retype_password: repassword,
            token: token
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
                            <h5 className="text-red-600 font-bold text-xl">Change Password</h5>
                            <p className="font-light text-base text-gray-700 mt-4">Please enter new Password</p>
                            <input type="password" value={password} onChange={passwordChange} placeholder="Password" className="mt-4 border border-red-600 rounded-lg w-full px-3 py-4" />
                            <input type="password" value={repassword} onChange={RePasswordChange} placeholder="Re-type Password" className="mt-4 border border-red-600 rounded-lg w-full px-3 py-4" />
                            <button type="submit" className="w-4/5 md:w-1/2 bg-red-600 mt-6 mx-auto text-white font-medium text-lg py-2 rounded-3xl">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </Spinner>
    )
}

export default ChangePassword;
