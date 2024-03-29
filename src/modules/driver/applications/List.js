import React, { useState } from 'react';
import Dialog from 'components/dialog';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { truncatedString } from 'utils';
import MenuList from 'components/menuList';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Pagination from 'components/pagination';
import { useNavigate } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import RejectDialog from 'components/rejectDialog';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledTableCell, StyledTableRow, StyledNoResultsFound, StyledLoadingContainer, StyledHeading, StyledStatus, infoLink } from 'components/globaStyle';

const options = [
    { icon: '/images/view-icon.svg', text: 'View' },
    { icon: '/images/accept-icon.svg', text: 'Approve' },
    { icon: '/images/reject-icon.svg', text: 'Reject' },
    { icon: '/images/remove-icon.svg', text: 'Remove' },
]

const Index = ({ data, loading, selected, setSelected, handleApplication, handleRemoveApplication }) => {
    const navigate = useNavigate()
    const [id, setId] = useState(null)
    const [page, setPage] = useState(1)
    const noResultsFound = data.length === 0
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const startIndex = (page - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const paginatedData = data.slice(startIndex, endIndex)

    const isSelected = (id) => selected.indexOf(id) !== -1

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10))
        setPage(1)
    }

    const handleTableMenu = (id, userId, status, option) => {
        if (option === 'View') {
            navigate(`/admin/driver/viewDetail/${userId}`, { state: { application: true } })
        }

        else if (option === 'Approve') {
            handleApplication(id, 'approve')
        }

        else if (option === 'Reject') {
            setId(id)
            setDialogOpen(true)
            setDialogType('reject')
        }

        else if (option === 'Remove') {
            setId(id)
            setDialogOpen(true)
            setDialogType('remove')
        }
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((item) => item._id)
            setSelected(newSelected)
            return
        }
        setSelected([])
    }

    const handleClick = (event, id) => {
        if (!event.target.classList.contains('MuiModal-backdrop')) {
            const selectedIndex = selected.indexOf(id)
            let newSelected = []

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, id)
            }

            else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1))
            }

            else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1))
            }

            else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                )
            }

            setSelected(newSelected)
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

    const removeContent = () => {
        return (
            <React.Fragment>
                <div className='remove-icon'>
                    <img src='/images/remove-icon.svg' alt='remove-icon' />
                </div>

                <div className='text'>
                    <h3>Remove!</h3>
                    <p>Are you sure you want to remove this “Driver”?</p>
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
                            setDialogType(null)
                            setDialogOpen(false)
                            handleRemoveApplication(id)
                        }}
                    >
                        Remove
                    </button>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {dialogOpen && (
                dialogType === 'reject' || dialogType === 'remove')
                ? (
                    <Dialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        content={
                            dialogType === 'reject'
                                ? rejectContent()
                                : dialogType === 'remove'
                                && removeContent()
                        }
                    />
                ) : dialogType === 'cause' && (
                    <RejectDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        handleApplication={(data) => handleApplication(id, 'reject', data)}
                    />
                )}
            <TableContainer
                component={Paper}
                sx={{ borderRadius: '12px', border: '1px solid #E7E7E7', boxShadow: 'none' }}
            >
                <Table>
                    <TableHead sx={{ background: '#EFEFEF' }}>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    onChange={handleSelectAllClick}
                                    inputProps={{ 'aria-label': 'select all desserts' }}
                                    checked={data.length > 0 && selected.length === data.length}
                                    indeterminate={selected.length > 0 && selected.length < data.length}
                                />
                            </TableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Gender</StyledTableCell>
                            <StyledTableCell>Equipment type</StyledTableCell>
                            <StyledTableCell>Preferred location</StyledTableCell>
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
                                            <StyledHeading>Driver not found</StyledHeading>
                                        </div>
                                    </StyledNoResultsFound>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((item, index) => {
                                const isItemSelected = isSelected(item._id)
                                const labelId = `enhanced-table-checkbox-${index}`

                                return (
                                    <StyledTableRow
                                        hover
                                        key={labelId}
                                        tabIndex={-1}
                                        role="checkbox"
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                        aria-checked={isItemSelected}
                                        onClick={(event) => handleClick(event, item._id)}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>

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
                                                        src={item.profilePicture}
                                                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                                                    />
                                                </div>
                                                {`${item.firstName} ${item.lastName}`}
                                            </div>
                                        </StyledTableCell>
                                        <StyledTableCell style={{ textTransform: 'lowercase' }}>{truncatedString(item.email)}</StyledTableCell>
                                        <StyledTableCell>{item.gender}</StyledTableCell>
                                        <StyledTableCell>
                                            {/* {item.drivingExperience} */}
                                            {item.equipmentType.length > 4
                                                ? item.equipmentType.slice(0, 4).join(', ') + ',...'
                                                : item.equipmentType.join(", ")
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {item.preferredLocations.length > 4
                                                ? item.preferredLocations.slice(0, 4).join(', ') + ',...'
                                                : item.preferredLocations.join(", ")
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <StyledStatus
                                                width={item.profileStatus === 'REJECT'
                                                    ? '82px' : item.profileStatus === 'PENDING' && '78px'
                                                }
                                                color={item.profileStatus === 'REJECT'
                                                    ? '#EF4444' : item.profileStatus === 'PENDING' && infoLink
                                                }
                                                background={item.profileStatus === 'REJECT'
                                                    ? 'rgba(239, 68, 68, 0.05)' : item.profileStatus === 'PENDING' && 'rgba(17, 83, 218, 0.05)'
                                                }
                                            >
                                                {item.profileStatus === 'REJECT' ? 'Rejected' : item.profileStatus === 'PENDING' && 'Pending'}
                                            </StyledStatus>
                                        </StyledTableCell>
                                        <StyledTableCell align='center'>
                                            <MenuList
                                                id={item._id}
                                                options={options}
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

            {
                !noResultsFound && !loading && (
                    <Pagination
                        page={page}
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )
            }
        </React.Fragment >
    )
}

export default Index