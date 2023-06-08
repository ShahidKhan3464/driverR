import React, { lazy, useEffect, useState } from 'react';
import { Layout, Space } from 'antd';
import { StyledHeader, StyledMbHeader } from './style';
import { Routes, Route, useNavigate } from 'react-router-dom';
const Help = lazy(() => import('modules/help'));
const JobPost = lazy(() => import('modules/jobPost'));
const Setting = lazy(() => import('modules/setting'));
const Sidebar = lazy(() => import('components/sideBar'));
const Dashboard = lazy(() => import('modules/dashboard'));
const JobDetail = lazy(() => import('modules/jobPost/Detail'));
const Transactions = lazy(() => import('modules/transactions'));
const Subscription = lazy(() => import('modules/subscription'));
const DriverDetail = lazy(() => import('modules/driver/Detail'));
const CompanyDetail = lazy(() => import('modules/company/Detail'));
const BlockedDrivers = lazy(() => import('modules/driver/blocked'));
const VerifiedDrivers = lazy(() => import('modules/driver/verified'));
const BlockedCompanies = lazy(() => import('modules/company/blocked'));
const DriverApplications = lazy(() => import('modules/driver/applications'));
const RegisteredCompanies = lazy(() => import('modules/company/registered'));
const CompanyApplications = lazy(() => import('modules/company/applications'));

const Index = () => {
    const navigate = useNavigate()
    const authToken = localStorage.getItem('authToken')
    const [sidebarVisible, setSidebarVisible] = useState(false)

    const handleOutsideClick = (e) => {
        if (e.target.alt === 'hamburger') return setSidebarVisible(true)
        const sidebar = document.querySelector(".ant-layout-sider")
        if (!sidebar.contains(e.target)) {
            setSidebarVisible(false)
        }
    }

    useEffect(() => {
        if (!authToken) {
            navigate('/')
        }

        document.addEventListener("click", handleOutsideClick)
        return () => document.removeEventListener("click", handleOutsideClick)
    }, [authToken, navigate])

    return (
        <Space
            size={[0, 48]}
            direction="vertical"
            style={{ width: '100%' }}
        >
            <Layout>
                <Sidebar sidebarVisible={sidebarVisible} />
                <Layout>
                    <StyledHeader>
                        <div className='header-icons'>
                            <button type='button' onClick={() => navigate('/admin/setting')}>
                                <img src='/images/setting.svg' alt='setting' />
                            </button>
                            <button type='button'>
                                <img src='/images/notification.svg' alt='notification' />
                            </button>
                        </div>
                    </StyledHeader>

                    <StyledMbHeader>
                        <button className='hamburger-btn' onClick={() => setSidebarVisible(true)}>
                            <img src='/images/hamburger-icon.svg' alt='hamburger' />
                        </button>
                        <div className='logo'>
                            <img src='/images/TIRminator.svg' alt='logo' />
                        </div>
                        <div className='header-icons'>
                            <button type='button' onClick={() => navigate('/admin/setting')}>
                                <img src='/images/setting.svg' alt='setting' />
                            </button>
                            <button type='button'>
                                <img src='/images/notification.svg' alt='notification' />
                            </button>
                        </div>
                    </StyledMbHeader>
                    <Routes>
                        <Route exact path='/dashboard' element={<Dashboard />} />
                        <Route path='/job/list' element={<JobPost />} />
                        <Route path='/job/viewDetail/:id' element={<JobDetail />} />
                        <Route path='/verified-drivers/list' element={<VerifiedDrivers />} />
                        <Route path='/blocked-drivers/list' element={<BlockedDrivers />} />
                        <Route path='/driver-applications/list' element={<DriverApplications />} />
                        <Route path='/driver/viewDetail/:id' element={<DriverDetail />} />
                        <Route path='/registered-companies/list' element={<RegisteredCompanies />} />
                        <Route path='/blocked-companies/list' element={<BlockedCompanies />} />
                        <Route path='/company-applications/list' element={<CompanyApplications />} />
                        <Route path='/company/viewDetail/:id' element={<CompanyDetail />} />
                        <Route path='/transaction/list' element={<Transactions />} />
                        <Route path='/setting' element={<Setting />} />
                        <Route path='/subscription' element={<Subscription />} />
                        <Route path='/help' element={<Help />} />
                    </Routes>
                </Layout>
            </Layout>
        </Space>
    )
}

export default Index