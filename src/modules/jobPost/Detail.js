import React, { useCallback, useEffect, useState } from 'react';
import ApiClient from 'api';
import { Layout } from 'antd';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from 'components/breadCrumbs';
import { Link, useParams } from 'react-router-dom';
import { ContentContainer, StyledDetailsContent } from './style';
import { StyledTableHeading, StyledStatus, grey500, grey800 } from 'components/globaStyle';
const { Content } = Layout;

const Index = () => {
    const { id } = useParams()
    const api = new ApiClient()
    const navigate = useNavigate()
    const [detail, setDetail] = useState(null)

    const breadcrumbs = [
        <Link className='link' to="/admin/job/list">Job post</Link>,
        <span className='text'>Job details</span>
    ]

    const getJobDetail = useCallback(async () => {
        try {
            const params = { jobId: id }
            const response = await api.get('/job/view', params)
            setDetail(response.data.result.data)
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
                    <div className='details'>
                        <div className='details_content'>
                            <div className='details_content_row'>
                                <div className='details_content_row_title'>
                                    <h2>{detail?.title}</h2>
                                </div>

                                <div className='details_content_row_text'>
                                    <div className='details_content_row_text_box'>
                                        <div className='details_content_row_text_box_pair'>
                                            <h3>Equipment type</h3>
                                            <p>{detail?.equipmentType}</p>
                                        </div>
                                        <div className='details_content_row_text_box_pair'>
                                            <h3>Medical insurance</h3>
                                            {detail && (
                                                <p>{detail.medicalInsuranceRequired ? 'Yes' : 'No'}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className='details_content_row_text_box'>
                                        <div className='details_content_row_text_box_pair'>
                                            <h3>Required experience</h3>
                                            {detail && (
                                                <p>{detail.requiredExperience} years</p>
                                            )}
                                        </div>
                                        <div className='details_content_row_text_box_pair'>
                                            <h3>Route type</h3>
                                            <p>{detail?.routeType}</p>
                                        </div>
                                    </div>
                                    <div className='details_content_row_text_box'>
                                        <div className='details_content_row_text_box_pair'>
                                            <h3>License required</h3>
                                            {detail && (
                                                <p>{detail.licenseRequired ? 'Yes' : 'No'}</p>
                                            )}
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
                                    <img src='/images/fedex.svg' alt='fedex' />
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
                </StyledDetailsContent>
            </ContentContainer>
        </Content>
    )
}

export default Index