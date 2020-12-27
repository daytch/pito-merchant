import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//import PrivateRoutes
import PrivateRoute from 'Routes/PrivateRoute'

//import pages 
import Login from 'pages/login'
import ForgotPassword from 'pages/forgotPassword'
import Dashboard from 'pages/dashboard'
import CreateDashboard from 'pages/createDashboard'
import EditDashboard from 'pages/editDashboard'
import Profile from 'pages/profile'
import LivestreamDetail from 'pages/livestreamDetail'
import Notif from 'pages/notif'
import Support from 'pages/support'
import CreateSupport from 'pages/createSupport'
import EditSupport from 'pages/editSupport'
import ProfileEdit from 'pages/profileEdit'
import NotFound404 from 'pages/404'

//style from tailwindcss
import 'assets/css/main.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/dashboard"
          render={({ match: { url } }) => (
            <>
              <PrivateRoute path={`${url}/`} component={Dashboard} exact />
              <PrivateRoute path={`${url}/create`} component={CreateDashboard} />
              <PrivateRoute path={`${url}/edit/:id`} component={EditDashboard} />
            </>
          )} />
        <Route path="/profile"
          render={({ match: { url } }) => (
            <>
              <PrivateRoute path={`${url}/`} component={Profile} exact />
              <PrivateRoute path={`${url}/edit`} component={ProfileEdit} />
            </>
          )} />
        <Route path="/livestream"
          render={({ match: { url } }) => (
            <>
              <PrivateRoute path={`${url}/:id`} component={LivestreamDetail} />
            </>
          )} />
        <Route path="/notification"
          render={({ match: { url } }) => (
            <>
              <PrivateRoute path={`${url}`} component={Notif} exact />
            </>
          )} />
        <Route path="/support"
          render={({ match: { url } }) => (
            <>
              <PrivateRoute path={`${url}`} component={Support} exact />
              <PrivateRoute path={`${url}/create`} component={CreateSupport} />
              <PrivateRoute path={`${url}/edit/:id`} component={EditSupport} />
            </>
          )} />

        <Route path="*" component={NotFound404} />
      </Switch>
    </Router>
  );
}

export default App;
