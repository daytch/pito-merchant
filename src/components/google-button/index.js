import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from 'assets/images/google-icon-colorful.svg'
import users from 'api/users'


const CLIENT_ID = '801278591226-h4ec6fqjqrpouqhhsqna81du1piakkhi.apps.googleusercontent.com';


class GoogleBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      accessToken: '',
      error: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(response) {
    
    // if (response.accessToken) {
    //   this.setState(state => ({
    //     isLogined: true,
    //     accessToken: response.accessToken
    //   }));
    // }

    if (!response.error) {
      let emails = response.profileObj.email;
      users.loginSosmed({ emails }).then((res) => {
        setAuthorizationHeader(res.token);
        localStorage.setItem('PITO:merchant-token', res.token)
        localStorage.setItem('PITO:login', 'google')
        toast.success("you have successfully logged in !")
        history.push("/dashboard")
      }).catch(err => {
        this.setState(state => ({
          error: err?.response?.data?.message
        }))
      })
    }
  }

  logout(response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
  }

  handleLoginFailure(response) {
    console.log('Failed to log in')
  }

  render() {
    return (
      <>
        <GoogleLogin
          clientId={CLIENT_ID}
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={GoogleIcon} style={{ width: '40px' }} /></button>
          )}
          buttonText='Login'
          onSuccess={this.login}
          onFailure={this.handleLoginFailure}
          cookiePolicy={'single_host_origin'}
          responseType='code,token'
        />
      </>
    )
  }
}

export default GoogleBtn;