import React, { useCallback, useEffect, useState } from 'react';
import ApiClient from 'api';
import moment from 'moment';
import { Layout } from 'antd';
import Dialog from 'components/dialog';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from 'components/breadCrumbs';
import RejectDialog from 'components/rejectDialog';
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useParams, useLocation } from 'react-router-dom';
import { ContentContainer, StyledDetailsContent } from './style';
import { StyledStatus, StyledTableHeading } from 'components/globaStyle';
const { Content } = Layout;

const Index = () => {
    const { id } = useParams()
    const api = new ApiClient()
    const navigate = useNavigate()
    const { state } = useLocation()
    const [detail, setDetail] = useState()
    const [loading, setLoading] = useState(false)
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const breadcrumbs = [
        <Link
            className='link'
            to={state.application ? '/admin/company-applications/list' : '/admin/registered-companies/list'}
        >
            {state.application ? 'Company application' : 'Company'}
        </Link>,
        <span className='text'>
            {state.application ? 'Application details' : `${detail?.name}`}
        </span>
    ]

    const handleApplication = async (id, status, data = null) => {
        const profileStatus =
            status === 'approve'
                ? 'APPROVE'
                : status === 'reject'
                    ? 'REJECT'
                    : status === 'block'
                    && 'BLOCK'

        const isProfileReject = profileStatus === 'REJECT'
        const params = {
            companyId: id,
            profileStatus,
            ...(isProfileReject && data && {
                causeOfRejectionTitle: data.title,
                causeOfRejectionDescription: data.description
            })
        }

        try {
            const response = await api.put('/super-admin/manage-company-profile', params)
            if (response.data.status) {
                if (profileStatus === 'APPROVE') {
                    SweetAlert('success', 'Approved', 'This application has been approved Successfully')
                }
                else if (profileStatus === 'REJECT') {
                    SweetAlert('success', 'Rejected', 'This application has been rejected Successfully')
                }
                navigate("/admin/company-applications/list")
            }
        }
        catch (error) {
            const tokenExpired = error.response?.data.message
            if (tokenExpired === 'Token expired, access denied') {
                localStorage.clear()
                navigate("/")
                return
            }
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
        }
    }

    const rejectContent = () => {
        return (
            <React.Fragment>
                <div className='delete-icon'>
                    <img src='/images/reject.svg' alt='reject-icon' />
                </div>

                <div className='text'>
                    <h3>Reject!</h3>
                    <p>Are you sure you want to reject this “Application”?</p>
                </div>
                <div className='btn-container'>
                    <button
                        type='button'
                        className='cancel-btn'
                        onClick={() => setDialogOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        type='button'
                        className='reject-btn'
                        onClick={() => setDialogType('cause')}>
                        Reject
                    </button>
                </div>
            </React.Fragment>
        )
    }

    const getCompanyDetail = useCallback(async () => {
        try {
            setLoading(true)
            const params = { userId: id }
            const response = await api.get('/company/get-profile', params)
            setDetail(response.data.result.data)
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
        getCompanyDetail()
    }, [getCompanyDetail])

    return (
        <Content>
            {dialogOpen &&
                dialogType === 'reject' ? (
                <Dialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    content={rejectContent()}
                />
            ) : dialogType === 'cause' && (
                <RejectDialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    handleApplication={(data) => handleApplication(detail._id, 'reject', data)}
                />
            )}
            <ContentContainer>
                <Breadcrumbs>
                    {breadcrumbs}
                </Breadcrumbs>
                <StyledDetailsContent>
                    <div className='header'>
                        <StyledTableHeading>Company details</StyledTableHeading>
                        {state.application && (
                            <div className='btn-container'>
                                <button
                                    type='button'
                                    className='reject-btn'
                                    onClick={() => {
                                        setDialogOpen(true)
                                        setDialogType('reject')
                                    }}
                                >
                                    Reject
                                </button>
                                <button
                                    type='button'
                                    className='accept-btn'
                                    onClick={() => handleApplication(detail._id, 'approve')}
                                >
                                    Accept
                                </button>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <div
                            style={{
                                height: '45vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <CircularProgress color="inherit" />
                        </div>
                    ) : (
                        <React.Fragment>
                            <div className='profile'>
                                <div className='profile_logo'>
                                    <img src={detail?.profilePicture} alt='avatar' />
                                </div>
                                <div className='profile_content'>
                                    <div className='profile_content_text'>
                                        <div className='profile_content_text_box'>
                                            <div className='profile_content_text_box_pair'>
                                                <h3>Company name</h3>
                                                <p>{detail?.name}</p>
                                            </div>
                                            <div className='profile_content_text_box_pair'>
                                                <h3>Company size</h3>
                                                <p>{detail?.companySize}</p>
                                            </div>
                                        </div>

                                        <div className='profile_content_text_box'>
                                            <div className='profile_content_text_box_pair'>
                                                <h3>Company email</h3>
                                                <p>{detail?.email}</p>
                                            </div>
                                            <div className='profile_content_text_box_pair'>
                                                <h3>Company founded</h3>
                                                <p>{detail?.establishDate ? moment(detail.establishDate).format('DD/MM/YYYY') : ""}</p>
                                            </div>
                                        </div>

                                        <div className='profile_content_text_box'>
                                            <div className='profile_content_text_box_pair'>
                                                <h3>Company registration number</h3>
                                                <p>{detail?.registrationNumber}</p>
                                            </div>
                                            <div className='profile_content_text_box_pair'>
                                                <h3>Company address</h3>
                                                <p>{detail?.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='profile_content_status'>
                                        {detail && (
                                            <StyledStatus
                                                width={detail.isActive ? '65px' : '100px'}
                                                color={detail.isActive ? '#22C55E' : '#EF4444'}
                                                background={detail.isActive ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)'}
                                            >
                                                {detail.isActive ? 'Active' : 'In-active'}
                                            </StyledStatus>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='description'>
                                <h3>Overview</h3>
                                <p>
                                    {detail?.aboutInfo}
                                </p>
                            </div>
                        </React.Fragment>
                    )}
                </StyledDetailsContent>
            </ContentContainer>
        </Content>
    )
}

export default Index