import React, { useCallback, useEffect, useState } from 'react';
import List from './List';
import ApiClient from 'api';
import { Layout } from 'antd';
import { ContentContainer } from '../style';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'components/tabledropdown';
import { StyledTableHeading } from 'components/globaStyle';
import TableSearchHandler from 'components/tableSearchField';
const { Content } = Layout;

const location = [
    { value: 'albania', text: 'Albania' },
    { value: 'andorra', text: 'Andorra' },
    { value: 'austria', text: 'Austria' },
    { value: 'belarus', text: 'Belarus' },
    { value: 'belgium', text: 'Belgium' },
    { value: 'bulgaria', text: 'Bulgaria' },
    { value: 'croatia', text: 'Croatia' },
    { value: 'czechRepublic', text: 'Czech Republic' },
    { value: 'denmark', text: 'Denmark' },
    { value: 'france', text: 'France' },
    { value: 'germany', text: 'Germany' },
    { value: 'greece', text: 'Greece' },
    { value: 'hungary', text: 'Hungary' },
    { value: 'italy', text: 'Italy' },
    { value: 'luxemburg', text: 'Luxemburg' },
    { value: 'moldova', text: 'Moldova' },
    { value: 'netherlands', text: 'Netherlands' },
    { value: 'norway', text: 'Norway' },
    { value: 'poland', text: 'Poland' },
    { value: 'portugalia', text: 'Portugalia' },
    { value: 'serbia', text: 'Serbia' },
    { value: 'slovakia', text: 'Slovakia' },
    { value: 'slovenia', text: 'Slovenia' },
    { value: 'spain', text: 'Spain' },
    { value: 'sweden', text: 'Sweden' },
    { value: 'switzerland', text: 'Switzerland' },
    { value: 'turkey', text: 'Turkey' },
    { value: 'ucraina', text: 'Ucraina' },
    { value: 'united kingdom', text: 'United Kingdom' },
]

const gender = [
    { value: 'male', text: 'Male' },
    { value: 'female', text: 'Female' },
]

const experience = [
    { value: '1', text: '0-1 year' },
    { value: '2', text: '1-2 years' },
    { value: '3', text: '2-3 years' },
    { value: '4', text: '3-4 years' },
    { value: '5', text: '+5 years' },
]

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [drivers, setDrivers] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState({
        gender: '',
        experience: '',
        employmentStatus: '',
        preferredLocation: '',
    })

    const filteredDrivers = drivers.filter((item) => {
        const fullName = `${item.firstName} ${item.lastName}`
        const locationMatch = !filter.preferredLocation || item.preferredLocation.toLowerCase() === filter.preferredLocation
        const employmentMatch = !filter.employmentStatus || item.employmentStatus.toLowerCase() === filter.employmentStatus
        const genderMatch = !filter.gender || item.gender.toLowerCase() === filter.gender
        const experienceMatch = !filter.experience || item.drivingExperience === filter.experience
        const searchMatch = !searchQuery
            || fullName.toLowerCase().includes(searchQuery.toLowerCase())
            || item.email.toLowerCase().includes(searchQuery.toLowerCase())
        return locationMatch && employmentMatch && genderMatch && experienceMatch && searchMatch
    })

    const handleSearchQueryChange = (value) => setSearchQuery(value.trim())

    const getData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/super-admin/view-all-drivers')
            const data = response.data.result.data
            const driverApplications = data.filter(item => item.applicationStatus === 'REJECT')
            setDrivers(driverApplications)
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

    const handleFilterChange = (name, value) => {
        setFilter({ ...filter, [name]: value })
    }

    const handleApplication = async (id, status) => {
        const applicationStatus =
            status === 'approve'
                ? 'APPROVE'
                : status === 'reject'
                    ? 'REJECT'
                    : status === 'block'
                    && 'BLOCK'

        const causeOfRejection = applicationStatus === 'REJECT' ? 'Incomplete' : undefined
        const params = { driverId: id, applicationStatus, ...(causeOfRejection && { causeOfRejection }) }

        try {
            const response = await api.get('/super-admin/approve-driver', params)
            if (response.data.status) {
                if (applicationStatus === 'APPROVE') {
                    SweetAlert('success', 'Approved', 'This application has been approved Successfully')
                }
                else if (applicationStatus === 'REJECT') {
                    SweetAlert('success', 'Rejected', 'This application has been rejected Successfully')
                }
                else if (applicationStatus === 'BLOCK') {
                    SweetAlert('success', 'Blocked', 'This application has been blocked Successfully')
                }
            }
            getData()
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

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Content>
            <ContentContainer>
                <div className='table'>
                    <div className='table_heading'>
                        <StyledTableHeading>Driver applications</StyledTableHeading>
                    </div>
                    <div className='table_control-elements'>
                        <div className='table_control-elements_filterbox'>
                            <Dropdown
                                options={location}
                                name="preferredLocation"
                                defaultValue="Preferred location"
                                handleFilterChange={handleFilterChange}
                            />
                            <Dropdown
                                name="gender"
                                options={gender}
                                defaultValue="Gender"
                                handleFilterChange={handleFilterChange}
                            />
                            <Dropdown
                                name="experience"
                                options={experience}
                                defaultValue="Experience"
                                handleFilterChange={handleFilterChange}
                            />
                        </div>
                        <TableSearchHandler handleSearchQueryChange={handleSearchQueryChange} />
                    </div>
                    <List
                        loading={loading}
                        data={filteredDrivers}
                        handleApplication={handleApplication}
                    />
                </div>
            </ContentContainer>
        </Content>
    )
}

export default Index