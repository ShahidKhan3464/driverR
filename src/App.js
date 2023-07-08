import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const Login = lazy(() => import('pages/home/AdminLogin'));
const CheckInbox = lazy(() => import('pages/home/CheckInbox'));
const AdminPanel = lazy(() => import('containers/AdminPanel'));
const ResetPassword = lazy(() => import('pages/home/ResetPassword'));
const ForgotPassword = lazy(() => import('pages/home/ForgotPassword'));
const PasswordChanged = lazy(() => import('pages/home/PasswordChanged'));

const App = () => {

  const SplashScreen = () => {
    const style = {
      top: '50%',
      left: '50%',
      position: 'fixed',
      transform: 'translate(-50%, -50%)'
    }

    return (
      <img src="/images/splash.svg" style={style} alt='loading' />
    )
  }

  return (
    <React.Fragment>
      <Router>
        <Suspense fallback={<SplashScreen />}>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/forgot-password' element={<ForgotPassword />} />
            <Route exact path='/check-inbox' element={<CheckInbox />} />
            <Route exact path='/reset-password' element={<ResetPassword />} />
            <Route exact path='/password-changed' element={<PasswordChanged />} />
            <Route exact path='/admin/*' element={<AdminPanel />} />
          </Routes>
        </Suspense>
      </Router>
    </React.Fragment>
  )
}

export default App