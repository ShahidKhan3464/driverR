import React, { useCallback, useEffect, useState } from 'react';
import List from './List';
import ApiClient from 'api';
import { Layout } from 'antd';
import Dialog from 'components/dialog';
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
    { value: 'czech republic', text: 'Czech Republic' },
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
    { value: '5', text: '4-5 years' },
    { value: '+5', text: '+5 years' },
]

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [drivers, setDrivers] = useState([])
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [filter, setFilter] = useState({
        gender: '',
        experience: '',
        employmentStatus: '',
        preferredLocation: '',
    })

    const filteredDrivers = drivers.filter((item) => {
        let experienceMatch = true
        const fullName = `${item.firstName} ${item.lastName}`
        const locationMatch = !filter.preferredLocation || item.preferredLocation.toLowerCase() === filter.preferredLocation
        const employmentMatch = !filter.employmentStatus || item.employmentStatus.toLowerCase() === filter.employmentStatus
        const genderMatch = !filter.gender || item.gender.toLowerCase() === filter.gender

        if (filter.experience === '+5') {
            experienceMatch = item.drivingExperience > 5
        }

        else {
            experienceMatch = !filter.experience || item.drivingExperience === filter.experience
        }

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
            const driverApplications = data.filter(item => (item.profileStatus === 'PENDING' || item.profileStatus === 'REJECT') && !item.removeApplication)
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

    const handleRemoveApplication = async (id = null) => {
        const params = { driverIds: id ? [id] : selected }
        try {
            const response = await api.delete('/super-admin/remove-drivers-application', params)
            if (response.data.status) {
                if (id) {
                    SweetAlert('success', 'Removed', 'This application has been removed Successfully')
                }
                else if (selected) {
                    SweetAlert('success', 'Removed', 'Selected applications have been removed Successfully')
                }
            }
            getData()
            setSelected([])
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

    const removeContent = () => {
        return (
            <React.Fragment>
                <div className='remove-icon'>
                    <img src='/images/remove-icon.svg' alt='remove-icon' />
                </div>

                <div className='text'>
                    <h3>Remove!</h3>
                    <p>Are you sure you want to remove {selected.length > 1 ? 'these “Drivers”?' : 'this "Driver"?'} </p>
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
                        className='remove-btn'
                        onClick={() => {
                            setDialogOpen(false)
                            handleRemoveApplication()
                        }}
                    >
                        Remove
                    </button>
                </div>
            </React.Fragment>
        )
    }

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <Content>
            {dialogOpen && (
                <Dialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    content={removeContent()}
                />
            )}
            <ContentContainer>
                <div className='table'>
                    <div className='table_header'>
                        <StyledTableHeading>Driver applications</StyledTableHeading>
                        <button
                            type='button'
                            disabled={selected.length === 0}
                            onClick={() => setDialogOpen(true)}
                            className={`${selected.length === 0 ? 'disabled-btn' : ''}`}
                        >
                            <img src='/images/remove-blue.svg' alt='remove' />
                            Remove
                        </button>
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
                        selected={selected}
                        data={filteredDrivers}
                        setSelected={setSelected}
                        handleApplication={handleApplication}
                        handleRemoveApplication={handleRemoveApplication}
                    />
                </div>
            </ContentContainer>
        </Content >
    )
}

export default Index