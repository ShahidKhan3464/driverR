import React, { useCallback, useEffect, useState } from 'react';
import List from './List';
import ApiClient from 'api';
import moment from 'moment';
import { Layout } from 'antd';
import Dialog from 'components/dialog';
import { ContentContainer } from '../style';
import SweetAlert from 'components/sweetAlert';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'components/tabledropdown';
import { StyledTableHeading } from 'components/globaStyle';
import TableSearchHandler from 'components/tableSearchField';
const { Content } = Layout;

const status = [
    { value: 'reject', text: 'Reject' },
    { value: 'pending', text: 'Pending' },
]

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [selected, setSelected] = useState([])
    const [loading, setLoading] = useState(false)
    const [companies, setCompanies] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [filterStatus, setFilterStatus] = useState('')

    const filteredCompanies = companies.filter((item) => {
        const statusMatch = filterStatus === '' || item.profileStatus.toLowerCase() === filterStatus
        const searchMatch = !searchQuery
            || item.name.toLowerCase().includes(searchQuery.toLowerCase())
            || item.email.toLowerCase().includes(searchQuery.toLowerCase())
        return statusMatch && searchMatch
    })

    const handleSearchQueryChange = (value) => setSearchQuery(value.trim())

    const getData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await api.get('/super-admin/view-all-companies')
            const data = response.data.result.data
            const companiesApplications = data.filter(item => (item.profileStatus === 'PENDING' || item.profileStatus === 'REJECT') && !item.removeApplication)
            const sortedData = [...companiesApplications].sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))
            setCompanies(sortedData)
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

    const handleApplication = async (id, status, data = null) => {
        const profileStatus =
            status === 'approve'
                ? 'APPROVE'
                : status === 'reject' && 'REJECT'

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
        const params = { companyIds: id ? [id] : selected }
        try {
            const response = await api.delete('/super-admin/remove-companies-application', params)
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
                    <p>Are you sure you want to remove {selected.length > 1 ? 'these “Companies”?' : 'this "Company"?'} </p>
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
                        <StyledTableHeading>Company applications</StyledTableHeading>
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
                                name=""
                                options={status}
                                defaultValue="Status"
                                handleFilterChange={(name, value) => setFilterStatus(value)}
                            />
                        </div>
                        <TableSearchHandler handleSearchQueryChange={handleSearchQueryChange} />
                    </div>
                    <List
                        loading={loading}
                        selected={selected}
                        data={filteredCompanies}
                        setSelected={setSelected}
                        handleApplication={handleApplication}
                        handleRemoveApplication={handleRemoveApplication}
                    />
                </div>
            </ContentContainer>
        </Content>
    )
}

export default Index