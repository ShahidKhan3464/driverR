import React, { useCallback, useEffect, useState } from 'react';
import ApiClient from 'api';
import { Layout } from 'antd';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from 'components/breadCrumbs';
import { Link, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { ContentContainer, StyledDetailsContent } from './style';
import { StyledTableHeading, StyledStatus, grey500, grey800 } from 'components/globaStyle';
const { Content } = Layout;

const Index = () => {
    const { id } = useParams()
    const api = new ApiClient()
    const navigate = useNavigate()
    const [detail, setDetail] = useState(null)
    const [loading, setLoading] = useState(false)

    const breadcrumbs = [
        <Link className='link' to="/admin/job/list">Job post</Link>,
        <span className='text'>Job details</span>
    ]

    const getLicenceType = (licenceType) => {
        const regex = /Category (.+)/;
        const match = licenceType.match(regex)

        let result = ""
        if (match && match[1]) {
            result = match[1]
        }

        return result
    }

    const getJobDetail = useCallback(async () => {
        try {
            setLoading(true)
            const params = { jobId: id }
            const response = await api.get('/job/view', params)
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
        getJobDetail()
    }, [getJobDetail])

    return (
        <Content>
            <ContentContainer>
                <Breadcrumbs>
                    {breadcrumbs}
                </Breadcrumbs>
                <StyledDetailsContent>
                    <div className='heading'>
                        <StyledTableHeading>Job details</StyledTableHeading>
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
                            <div className='details'>
                                <div className='details_content'>
                                    <div className='details_content_row'>
                                        <div className='details_content_row_title'>
                                            <h2>{detail?.title}</h2>
                                            <span className='jobId'>Job id: {detail?.jobId}</span>
                                        </div>

                                        <div className='details_content_row_text'>
                                            <div className='details_content_row_text_box'>
                                                <div className='details_content_row_text_box_pair licenseWithExp'>
                                                    {detail?.licenceCategory?.map(item => {
                                                        return (
                                                            <div>
                                                                <h3>Driving license {getLicenceType(item.licenceType)}</h3>
                                                                <p><span>Experience:</span> {item.drivingExperience} Years</p>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div className='details_content_row_text_box'>
                                                <div className='details_content_row_text_box_pair'>
                                                    <h3>Equipment type</h3>
                                                    <div className='details_content_row_text_box_pair_equipmentType'>
                                                        {detail?.equipmentType && (
                                                            <p>{detail.equipmentType.join(", ")}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='details_content_row_text_box'>
                                                <div className='details_content_row_text_box_pair'>
                                                    <h3>Route type</h3>
                                                    <div className='details_content_row_text_box_pair_routeType'>
                                                        {detail?.routeType && (
                                                            <p>{detail.routeType}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='details_content_row_company'>
                                        {detail && (
                                            <div className='status'>
                                                <StyledStatus
                                                    width={detail.isActive ? '65px' : '100px'}
                                                    color={detail.isActive ? '#22C55E' : '#EF4444'}
                                                    background={detail.isActive ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)'}
                                                >
                                                    {detail.isActive ? 'Active' : 'In-active'}
                                                </StyledStatus>
                                            </div>
                                        )}
                                        <div className='details_content_row_company_data'>
                                            <span style={{ color: grey500 }}>Company Info</span>
                                            <img
                                                alt='avatar'
                                                src={detail?.companyId.profilePicture}
                                                style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    objectFit: 'cover',
                                                    borderRadius: '50%'
                                                }}
                                            />
                                            <span style={{ color: grey800 }}>{detail?.companyId.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='description'>
                                <h3>Description</h3>
                                <p>
                                    {detail?.jobDescription}
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