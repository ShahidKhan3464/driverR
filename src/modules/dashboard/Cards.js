import React, { useState, useCallback, useEffect } from 'react';
import ApiClient from 'api';
import { StyledCards } from './style';
import Skeleton from '@mui/material/Skeleton';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [cardsData, setCardsData] = useState({
        drivers: 0,
        companies: 0,
        jobPost: 0,
    })

    const getData = useCallback(async () => {
        try {
            setLoading(true)
            const drivers = await api.get('/super-admin/total-register-drivers')
            const companies = await api.get('/super-admin/total-register-companies')
            const jobs = await api.get('/super-admin/total-active-jobs')

            const [data1, data2, data3] = await Promise.all([drivers, companies, jobs])
            const statusDriver = data1.data.status
            const statusCompany = data2.data.status
            const statusJobs = data3.data.status

            if (statusDriver && statusCompany && statusJobs) {
                setCardsData({
                    drivers: data1.data.result.data,
                    companies: data2.data.result.data,
                    jobPost: data3.data.result.data
                })
                setLoading(false)
                return
            }
            setLoading(false)
        }
        catch (error) {
            setLoading(true)
            const tokenExpired = error.response?.data.message
            if (tokenExpired === 'Token expired, access denied') {
                localStorage.clear()
                navigate("/")
                return
            }
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <StyledCards>
            {loading ? (
                <Skeleton animation="wave" height={120} />
            ) : (
                <div className='card' onClick={() => navigate('/admin/verified-drivers/list')}>
                    <div className='card_detail'>
                        <h3>Verfied drivers</h3>
                        <p>{cardsData.drivers}</p>
                    </div>
                    <div className='card_icon'>
                        <img src='/images/drivers-crd.svg' alt='crd' />
                    </div>
                </div>
            )}

            {loading ? (
                <Skeleton animation="wave" height={120} />
            ) : (
                <div className='card' onClick={() => navigate('/admin/registered-companies/list')}>
                    <div className='card_detail'>
                        <h3>Registered companies</h3>
                        <p>{cardsData.companies}</p>
                    </div>
                    <div className='card_icon'>
                        <img src='/images/companies-crd.svg' alt='crd' />
                    </div>
                </div>
            )}

            {loading ? (
                <Skeleton animation="wave" height={120} />
            ) : (
                <div className='card' onClick={() => navigate('/admin/job/list')}>
                    <div className='card_detail'>
                        <h3>Active job post</h3>
                        <p>{cardsData.jobPost}</p>
                    </div>
                    <div className='card_icon'>
                        <img src='/images/jobPost-crd.svg' alt='crd' />
                    </div>
                </div>
            )}

            {loading ? (
                <Skeleton animation="wave" height={120} />
            ) : (
                <div className='card' onClick={() => navigate('/admin/driver-applications/list')}>
                    <div className='card_detail'>
                        <h3>Driver pending applications</h3>
                        <p>32</p>
                    </div>
                    <div className='card_icon'>
                        <img src='/images/application-crd.svg' alt='crd' />
                    </div>
                </div>
            )}

            {loading ? (
                <Skeleton animation="wave" height={120} />
            ) : (
                <div className='card' onClick={() => navigate('/admin/driver-applications/list')}>
                    <div className='card_detail'>
                        <h3>Company pending applications</h3>
                        <p>32</p>
                    </div>
                    <div className='card_icon'>
                        <img src='/images/application-crd.svg' alt='crd' />
                    </div>
                </div>
            )}

            {loading ? (
                <Skeleton animation="wave" height={120} />
            ) : (
                <div className='card' onClick={() => navigate('/admin/transaction/list')}>
                    <div className='card_detail'>
                        <h3>No of transactions</h3>
                        <p>16</p>
                    </div>
                    <div className='card_icon'>
                        <img src='/images/transaction-crd.svg' alt='crd' />
                    </div>
                </div>
            )}

        </StyledCards>
    )
}

export default Index