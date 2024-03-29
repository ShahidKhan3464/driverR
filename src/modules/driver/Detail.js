import React, { useCallback, useEffect, useState } from 'react';
import ApiClient from 'api';
import { Layout } from 'antd';
import Dialog from '@mui/material/Dialog';
import RejectDialog from 'components/dialog';
import SweetAlert from 'components/sweetAlert';
import Breadcrumbs from 'components/breadCrumbs';
import IconButton from '@mui/material/IconButton';
import RejectCauseDialog from 'components/rejectDialog';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledHeading, StyledTableHeading } from 'components/globaStyle';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ContentContainer, StyledDetailsContent, StyledAttachment } from './style';
const { Content } = Layout;

const Index = () => {
    const { id } = useParams()
    const api = new ApiClient()
    const navigate = useNavigate()
    const { state } = useLocation()
    const [detail, setDetail] = useState(null)
    const [loading, setLoading] = useState(false)
    const [attachment, setAttachment] = useState()
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const breadcrumbs = [
        <Link
            className='link'
            to={state.application ? '/admin/driver-applications/list' : '/admin/verified-drivers/list'}
        >
            {state.application ? 'Driver application' : 'Driver'}
        </Link>,
        <span className='text'>
            {state.application ? 'Application details' : 'Driver details'}
        </span>
    ]

    const handleApplication = async (id, status, data = null) => {
        const profileStatus =
            status === 'approve'
                ? 'APPROVE'
                : status === 'reject' && 'REJECT'

        const isProfileReject = profileStatus === 'REJECT'
        const params = {
            driverId: id,
            profileStatus,
            ...(isProfileReject && data && {
                causeOfRejectionTitle: data.title,
                causeOfRejectionDescription: data.description
            })
        }

        try {
            const response = await api.put('/super-admin/manage-driver-profile', params)
            if (response.data.status) {
                if (profileStatus === 'APPROVE') {
                    SweetAlert('success', 'Approved', 'This application has been approved Successfully')
                }
                else if (profileStatus === 'REJECT') {
                    SweetAlert('success', 'Rejected', 'This application has been rejected Successfully')
                }
                navigate("/admin/driver-applications/list")
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

    const getLicenceType = (licenceType) => {
        const regex = /Category (.+)/;
        const match = licenceType.match(regex)

        let result = ""
        if (match && match[1]) {
            result = match[1]
        }

        return result
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

    const getDriverDetail = useCallback(async () => {
        try {
            setLoading(true)
            const params = { userId: id }
            const response = await api.get('/driver/get-profile-details', params)
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
        getDriverDetail()
    }, [getDriverDetail])

    return (
        <Content>
            {dialogOpen && dialogType === 'view' && (
                <Dialog
                    fullScreen
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    PaperProps={{
                        style: {
                            background: 'rgba(0, 0, 0, 0.7)'
                        }
                    }}
                >
                    <IconButton
                        onClick={() => setDialogOpen(false)}
                        sx={{
                            top: 100,
                            right: 42,
                            padding: 0,
                            position: 'absolute',
                        }}
                    >
                        <img src='/images/pop-cross-icon.svg' alt='cross-icon' />
                    </IconButton>
                    <StyledAttachment>
                        <img src={attachment} alt="document" />
                    </StyledAttachment>
                </Dialog>
            )}
            {dialogOpen &&
                dialogType === 'reject' ? (
                <RejectDialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    content={rejectContent()}
                />
            ) : dialogType === 'cause' && (
                <RejectCauseDialog
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
                        <StyledTableHeading>Driver details</StyledTableHeading>
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
                                                <h3>Name</h3>
                                                <p>{detail?.firstName} {detail?.lastName}</p>
                                            </div>
                                            <div className='profile_content_text_box_pair'>
                                                <h3>Preferred location</h3>
                                                <div className='profile_content_text_box_pair_preferredLocations'>
                                                    {detail?.preferredLocations && (
                                                        <p>{detail.preferredLocations.join(", ")}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='profile_content_text_box'>
                                            <div className='profile_content_text_box_pair'>
                                                <h3>Email</h3>
                                                <p>{detail?.email}</p>
                                            </div>
                                            <div className='profile_content_text_box_pair licenseWithExp'>
                                                {detail?.licenceType?.map(item => {
                                                    return (
                                                        <div>
                                                            <h3>Driving license {getLicenceType(item.licenceType)}</h3>
                                                            <p><span>Experience:</span> {item.experience} Years</p>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div className='profile_content_text_box'>
                                            <div className='profile_content_text_box_pair'>
                                                <h3>Gender</h3>
                                                <p>{detail?.gender}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='driving_materials'>
                                <div className='driving_materials_document'>
                                    <div className='driving_materials_document_header'>
                                        <StyledHeading>Driving license</StyledHeading>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                setDialogOpen(true)
                                                setDialogType('view')
                                                setAttachment(detail?.drivingLicense)
                                            }}
                                        >
                                            View
                                        </button>
                                    </div>
                                    <div className='driving_materials_document_attachment'>
                                        <img src={detail?.drivingLicense} alt='license' />
                                    </div>
                                </div>

                                <div className='driving_materials_document'>
                                    <div className='driving_materials_document_header'>
                                        <StyledHeading>Driving certificate</StyledHeading>
                                        <button
                                            type='button'
                                            onClick={() => {
                                                setDialogOpen(true)
                                                setDialogType('view')
                                                setAttachment(detail?.drivingCertificate)
                                            }}
                                        >
                                            View
                                        </button>
                                    </div>
                                    <div className='driving_materials_document_attachment'>
                                        <img src={detail?.drivingCertificate} alt='certificate' />
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
                </StyledDetailsContent>
            </ContentContainer>
        </Content>
    )
}

export default Index