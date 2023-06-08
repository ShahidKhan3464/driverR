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
    // { icon: '/images/delete-icon.svg', text: 'Delete' },
    { icon: '/images/block-icon.svg', text: 'Block' },
]

const radiosButton = [
    { value: 'Active', label: 'Active' },
    { value: 'In-active', label: 'Inactive' }
]

const Index = ({ data, loading, handleDriverStatus }) => {
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

    const handleBlockApplication = () => {
        setDialogType(null)
        setDialogOpen(false)
        // handleApplication(id, 'block')
    }

    const handleTableMenu = (id, userId, status, option) => {
        if (option === 'View') {
            navigate(`/admin/driver/viewDetail/${userId}`, { state: { application: false } })
        }

        else if (option === 'Change status') {
            setId(id)
            setDialogOpen(true)
            setDialogType('status')
            setValue(status ? 'Active' : 'In-active')
        }

        else if (option === 'Block') {
            setId(id)
            setDialogOpen(true)
            setDialogType('block')
        }
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
                            handleDriverStatus(id, value)
                        }}
                    >
                        Update
                    </button>
                </div>
            </React.Fragment>
        )
    }

    const blockContent = () => {
        return (
            <React.Fragment>
                <div className='block-icon'>
                    <img src='/images/block-icon.svg' alt='block-icon' />
                </div>

                <div className='text'>
                    <h3>Block!</h3>
                    <p>Are you sure you want to block this “Driver”?</p>
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
                        className='block-btn'
                        onClick={handleBlockApplication}
                    >
                        Block
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
                    content={dialogType === 'block' ? blockContent() : dialogType === 'status' && statusContent()}
                />
            )}
            <TableContainer
                component={Paper}
                sx={{ borderRadius: '12px', border: '1px solid #E7E7E7', boxShadow: 'none' }}
            >
                <Table>
                    <TableHead sx={{ background: '#EFEFEF' }}>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Gender</StyledTableCell>
                            <StyledTableCell>Experience</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Preferred location</StyledTableCell>
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
                                            <StyledHeading>Driver not found</StyledHeading>
                                        </div>
                                    </StyledNoResultsFound>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((item, index) => {
                                return (
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
                                                <img src='/images/driver-logo.svg' alt='driver' />
                                                {`${item.firstName} ${item.lastName}`}
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell style={{ textTransform: 'lowercase' }}>{item.email}</StyledTableCell>
                                        <StyledTableCell>{item.gender}</StyledTableCell>
                                        <StyledTableCell>{item.drivingExperience}</StyledTableCell>
                                        <StyledTableCell>
                                            <StyledStatus
                                                width={item.isActive ? '65px' : '82px'}
                                                color={item.isActive ? '#22C55E' : '#EF4444'}
                                                background={item.isActive ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)'}
                                            >
                                                {item.isActive ? 'Active' : 'In-active'}
                                            </StyledStatus>
                                        </StyledTableCell>
                                        <StyledTableCell>{item.preferredLocation}</StyledTableCell>
                                        <StyledTableCell align='center'>
                                            <MenuList
                                                id={item._id}
                                                options={options}
                                                status={item.isActive}
                                                userId={item.userId._id}
                                                handleTableMenu={handleTableMenu}
                                            />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })
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