import React, { useState } from 'react';
import Dialog from 'components/dialog';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import MenuList from 'components/menuList';
import TableRow from '@mui/material/TableRow';
import Pagination from 'components/pagination';
import { useNavigate } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import RadioGroup from '@mui/material/RadioGroup';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import { StyledTableCell, StyledTableRow, StyledStatus, primaryBlue, StyledNoResultsFound, StyledLoadingContainer, StyledHeading } from 'components/globaStyle';

const options = [
    { icon: '/images/view-icon.svg', text: 'View' },
    { icon: '/images/status-icon.svg', text: 'Change status' },
    { icon: '/images/delete-icon.svg', text: 'Delete' },
]

const radiosButton = [
    { value: 'Active', label: 'Active' },
    { value: 'In-active', label: 'Inactive' }
]

const Index = ({ data, loading, handleJobDelete, handleJobStatus }) => {
    const navigate = useNavigate()
    const [id, setId] = useState(null)
    const [page, setPage] = useState(1)
    const [value, setValue] = useState()
    const noResultsFound = data.length === 0
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const startIndex = (page - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const paginatedData = data.slice(startIndex, endIndex)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10))
        setPage(1)
    }

    const handleTableMenu = (id, userId, status, option) => {
        if (option === 'View') {
            navigate(`/admin/job/viewDetail/${id}`)
        }

        else if (option === 'Change status') {
            setId(id)
            setDialogOpen(true)
            setDialogType('status')
            setValue(status ? 'Active' : 'In-active')
        }

        else if (option === 'Delete') {
            setId(id)
            setDialogOpen(true)
            setDialogType('delete')
        }
    }

    const deleteContent = () => {
        return (
            <React.Fragment>
                <div className='delete-icon'>
                    <img src='/images/delete-icon.svg' alt='delete-icon' />
                </div>

                <div className='text'>
                    <h3 style={{ color: '#EF4444' }}>Delete!</h3>
                    <p>Are you sure you want to delete this “Job”?</p>
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
                        className='delete-btn'
                        onClick={() => {
                            setDialogOpen(false)
                            handleJobDelete(id)
                        }}>
                        Delete
                    </button>
                </div>
            </React.Fragment>
        )
    }

    const statusContent = () => {
        return (
            <React.Fragment>
                <div className='status-icon'>
                    <img src='/images/status-icon.svg' alt='status-icon' />
                </div>

                <div className='content'>
                    <h3>Change status!</h3>
                    <RadioGroup
                        row
                        value={value}
                        sx={{ justifyContent: 'center' }}
                        onChange={(e) => setValue(e.target.value)}
                    >
                        {radiosButton.map((item) => {
                            return (
                                <FormControlLabel
                                    key={item.value}
                                    value={item.value}
                                    label={item.label}
                                    control={
                                        <Radio
                                            sx={{
                                                color: '#A2ACBD',
                                                '&.Mui-checked': {
                                                    color: primaryBlue,
                                                    'svg:last-child': {
                                                        transform: 'scale(1.3)'
                                                    }
                                                },
                                            }}
                                        />
                                    }
                                    sx={{
                                        marginLeft: '3px',
                                        marginRight: '15px',
                                        '& .MuiFormControlLabel-label': {
                                            color: '#3E4756',
                                            fontSize: '16px',
                                            fontWeight: '400',
                                            lineHeight: '121.4%',
                                            fontFamily: 'Poppins',
                                        },
                                    }}
                                />
                            )
                        })}
                    </RadioGroup>
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
                        className='update-btn'
                        onClick={() => {
                            setDialogOpen(false)
                            handleJobStatus(id, value)
                        }}
                    >
                        Update
                    </button>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {dialogOpen && (
                <Dialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    content={dialogType === 'delete' ? deleteContent() : dialogType === 'status' && statusContent()}
                />
            )}
            <TableContainer
                component={Paper}
                sx={{ borderRadius: '12px', border: '1px solid #E7E7E7', boxShadow: 'none' }}
            >
                <Table>
                    <TableHead sx={{ background: '#EFEFEF' }}>
                        <TableRow>
                            <StyledTableCell>Company name</StyledTableCell>
                            <StyledTableCell>Job title</StyledTableCell>
                            <StyledTableCell>Equipment type</StyledTableCell>
                            <StyledTableCell>Route type</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ borderBottom: 'none' }}>
                                    <StyledLoadingContainer>
                                        <CircularProgress color="inherit" />
                                    </StyledLoadingContainer>
                                </TableCell>
                            </TableRow>
                        ) : noResultsFound ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ borderBottom: 'none' }}>
                                    <StyledNoResultsFound>
                                        <div className='container'>
                                            <img src='/images/search-not-found.svg' alt='not-found' />
                                            <StyledHeading>Job not found</StyledHeading>
                                        </div>
                                    </StyledNoResultsFound>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((item, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell
                                        size="12px"
                                        weight="500"
                                        color="#2C2E3E"
                                    >
                                        <div
                                            style={{
                                                gap: '10px',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%' }}>
                                                <img
                                                    alt='avatar'
                                                    width="100%"
                                                    height="100%"
                                                    src={item.companyId?.profilePicture}
                                                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            {item.companyId?.name}
                                        </div>
                                    </StyledTableCell>
                                    <StyledTableCell>{item.title}</StyledTableCell>
                                    <StyledTableCell>
                                        {item.equipmentType.length > 4
                                            ? item.equipmentType.slice(0, 4).join(', ') + ',...'
                                            : item.equipmentType.join(", ")
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        {item.routeType}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <StyledStatus
                                            width={item.isActive ? '65px' : '82px'}
                                            color={item.isActive ? '#22C55E' : '#EF4444'}
                                            background={item.isActive ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)'}
                                        >
                                            {item.isActive ? 'Active' : 'In-active'}
                                        </StyledStatus>
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <MenuList
                                            id={item._id}
                                            options={options}
                                            status={item.isActive}
                                            handleTableMenu={handleTableMenu}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {!noResultsFound && !loading && (
                <Pagination
                    page={page}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </React.Fragment>
    )
}

export default Index