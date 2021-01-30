import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import PHONE from 'assets/images/handphone.png'
import { ReactComponent as PitoLogo } from 'assets/images/pito.svg'
import { ReactComponent as LoginIcon } from 'assets/images/login-icon.svg'
import { ReactComponent as PasswordIcon } from 'assets/images/password-icon.svg'
import { ReactComponent as GoogleIcon } from 'assets/images/google-icon-colorful.svg'
import { ReactComponent as GoogleplaySign } from 'assets/images/googleplay-sign.svg'
import { ReactComponent as AppstoreSign } from 'assets/images/appstore-sign.svg'
import { setAuthorizationHeader } from 'configs/axios'
import { ToastContainer, toast } from 'react-toastify';
import FacebookLoginButton from 'components/fb-button'
import users from 'api/users'
import 'react-toastify/dist/ReactToastify.css';

import firebase from 'firebase'
import firebaseConfig from 'configs/firebase.config'
firebase.initializeApp(firebaseConfig);


const Login = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [token] = useState(localStorage.getItem('PITO:merchant-token'));

    //state error handler
    const [errors, setErrors] = useState(null)

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                firebase
                    .auth()
                    .signInWithPopup(provider)
                    .then(result => {
                        let emails = result.user.email;
                        users.loginSosmed({ emails }).then((res) => {
                            setAuthorizationHeader(res.token);
                            localStorage.setItem('PITO:merchant-token', res.token)
                            localStorage.setItem('PITO:login', 'google')
                            toast.success("you have successfully logged in !")
                            history.push("/dashboard")
                        }).catch(err => {
                            setErrors(err?.response?.data?.message)
                        })
                    })
                    .catch(e => setErrors(e.message))
            })
    }

    //email on Change text
    function emailChange(e) {
        setEmail(e.target.value)
    }
    //password on Change text
    function passwordChange(e) {
        setPassword(e.target.value)
    }

    //Check tokens if ready
    useEffect(() => {

        if (token) {
            history.push("/dashboard")
        }
        // eslint-disable-next-line
    }, [token])

    //on submit Login
    const submit = (e) => {
        e.preventDefault();

        //use function login from users
        users.merchantLogin({
            email,
            password
        }).then((res) => {
            setAuthorizationHeader(res.token);

            localStorage.setItem('PITO:merchant-token', res.token)
            localStorage.setItem('PITO:merchant-img', res.image)
            localStorage.setItem('PITO:merchant-name', res.name)
            localStorage.setItem('PITO:login', 'email')
            toast.success("you have successfully logged in !")
            history.push("/dashboard")
            // setTimeout(() => {
            //     history.push("/dashboard")
            // }, 2000);
        }).catch(err => {
            setErrors(err?.response?.data?.message)
        })
    }

    return (
        <section className="min-h-screen login-clipping w-full">
            <ToastContainer position="top-right" />
            <div className="xxl:min-h-screen xxl:w-full clipper hidden xl:block"></div>
            <div className="img-phone xl:w-1/2 hidden xl:absolute py-20 xl:flex justify-end">
                <img draggable="false" src={PHONE} alt="pito logo" />
            </div>
            <div className="form-login container mx-auto flex justify-end py-16 xl:py-12 xxl:py-20">
                <div className="w-full xl:w-1/2 md:px-24">
                    <PitoLogo className="mx-auto" />
                    <div className="pt-4 xl:pt-2 xxl:pt-24 px-10">
                        <form onSubmit={submit}>
                            <div className={["pt-10 flex border-b-2 items-center pb-2 text-xl", errors ? "border-red-600" : "border-gray-400"].join(" ")}>
                                <LoginIcon />
                                <input type="email" name="email" value={email} onChange={emailChange} className="ml-3 focus:outline-none relative w-full" placeholder="Email" />
                            </div>
                            <div className={["pt-10 flex border-b-2 items-center pb-2 text-xl", errors ? "border-red-600" : "border-gray-400"].join(" ")}>
                                <PasswordIcon />
                                <input type="password" name="password" value={password} onChange={passwordChange} className="ml-3 focus:outline-none relative w-full" placeholder="Password" />
                            </div>
                            <button type="submit" className="bg-red-600 py-2 px-10 w-full mt-6 text-xl rounded-3xl text-white font-medium hover:bg-red-700 transition-all duration-200 focus:outline-none">Login</button>
                            <div className="text-center mt-4">
                                <Link to="/forgot-password" className="text-red-600 border-b border-red-600 font-light hover:font-medium">Forgot Password?</Link>
                            </div>
                        </form>
                    </div>

                    <div className="socmed-icon-login flex justify-center items-center mt-6 xl:mt-6 xxl:mt-12">
                        <h6 className="md:text-lg font-light text-gray-700 px-4">Or Continue with
                        </h6>
                        <span className="flex">
                            <FacebookLoginButton className="mr-4" />
                            <br />
                            <button onClick={() => signInWithGoogle()}><GoogleIcon /></button>
                        </span>
                    </div>

                    <div className="flex flex-col mt-4 xl:mt-2 xxl:mt-8">
                        <h6 className="md:text-lg font-light mx-auto text-gray-700 px-4">Not a member yet?
                        </h6>
                        <h6 className="md:text-lg font-light mx-auto text-gray-700 px-4"><span className="font-medium text-red-600">Create Account</span> Via Download Pito App
                        </h6>
                        <div className="flex px-4 mx-auto">
                            <GoogleplaySign className="w-40 mr-4" />
                            <AppstoreSign className="w-40" />
                        </div>
                        <div className="px-4 mx-auto">
                            <h6 className="md:text-lg font-light text-gray-700 px-4">Contact Pito at admin@pito.com.sg</h6>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default withRouter(Login);
