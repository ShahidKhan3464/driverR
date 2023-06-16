import React, { useState, useCallback, useEffect } from 'react';
import ApiClient from 'api';
import { StyledCards } from './style';
import Skeleton from '@mui/material/Skeleton';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [cardsData, setCardsData] = useState()
    const [loading, setLoading] = useState(false)

    const getData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/super-admin/dashboard-kpis')

            if (response.data.status) {
                setCardsData(response.data.result.data)
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
                        <p>{cardsData?.approvedDriversProfiles}</p>
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
                        <p>{cardsData?.approvedCompaniesProfiles}</p>
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
                        <p>{cardsData?.activeJobs}</p>
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
                        <p>{cardsData?.pendingDriversProfiles}</p>
                    </div>
                    <div className='card_icon'>
                        <img src='/images/application-crd.svg' alt='crd' />
                    </div>
                </div>
            )}

            {loading ? (
                <Skeleton animation="wave" height={120} />
            ) : (
                <div className='card' onClick={() => navigate('/admin/company-applications/list')}>
                    <div className='card_detail'>
                        <h3>Company pending applications</h3>
                        <p>{cardsData?.pendingCompaniesProfiles}</p>
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
                        <p>{cardsData?.trxCount}</p>
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