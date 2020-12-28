import React, { Component } from 'react';
import { ReactComponent as FbIcon } from 'assets/images/fb-icon-square.svg'
import users from 'api/users'
import { setAuthorizationHeader } from 'configs/axios'


class FacebookLoginButton extends Component {
    componentDidMount() {
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));


        window.fbAsyncInit = () => {
            window.FB.init({
                appId: '199209148505469', //Change with your Facebook app id
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v3.0'
            });

            window.FB.Event.subscribe('auth.statusChange', response => {
                if (response.authResponse) {
                    this.checkLoginState();
                } else {
                    console.log('[FacebookLoginButton] User cancelled login or did not fully authorize.');
                }
            });
        };
    }

    checkLoginState() {
        window.FB.getLoginStatus(function (response) {
            this.statusChangeCallback(response);
        }.bind(this));
    }

    login() {
        window.FB.login(this.checkLoginState(), { scope: 'email' });
    }

    statusChangeCallback(response) {
        if (response.status === 'connected') {
            this.getAPI();
        } else if (response.status === 'not_authorized') {
            console.log("[FacebookLoginButton] Person is logged into Facebook but not your app");
        } else {
            console.log("[FacebookLoginButton] Person is not logged into Facebook");
        }
    }

    getAPI() {
        window.FB.api('/me?fields=email', function (response) {
            let email = response.email;
            users.loginSosmed({ email }).then((res) => {
                setAuthorizationHeader(res.token);
                localStorage.setItem('PITO:merchant-token', res.token)
                localStorage.setItem('PITO:login', 'facebook')
                window.history.push("/dashboard")
            }).catch(err => {
                console.error(err);
            })
        });
    }

    render() {
        return (<button onClick={() => this.login()} className="mr-4"><FbIcon /></button>)
    }
}

export default FacebookLoginButton;