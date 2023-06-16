import React, { useState } from 'react';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { truncatedString } from 'utils';
import MenuList from 'components/menuList';
import TableRow from '@mui/material/TableRow';
import Pagination from 'components/pagination';
import { useNavigate } from 'react-router-dom';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledTableCell, StyledTableRow, StyledNoResultsFound, StyledLoadingContainer, StyledHeading } from 'components/globaStyle';

const options = [
    // { icon: '/images/view-icon.svg', text: 'View' },
    // { icon: '/images/accept-icon.svg', text: 'Approve' },
    // { icon: '/images/reject-icon.svg', text: 'Reject' },
    // { icon: '/images/block-icon.svg', text: 'Block' },
]

const Index = ({ data, loading, handleApplication }) => {
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

        else if (option === 'Block') {
            setId(id)
            setDialogOpen(true)
            setDialogType('block')
        }
    }

    return (
        <React.Fragment>
            {/* {dialogOpen && (
                dialogType === 'reject' || dialogType === 'block')
                ? (
                    <Dialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        content={dialogType === 'reject' ? rejectContent() : dialogType === 'block' && blockContent()}
                    />
                ) : dialogType === 'cause' && (
                    <RejectDialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        handleApplication={() => handleApplication(id, 'reject')}
                    />
                )} */}
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
                                        <StyledTableCell style={{ textTransform: 'lowercase' }}>{truncatedString(item.email)}</StyledTableCell>
                                        <StyledTableCell>{item.gender}</StyledTableCell>
                                        <StyledTableCell>{item.drivingExperience}</StyledTableCell>
                                        <StyledTableCell>{item.preferredLocation}</StyledTableCell>
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

            {!noResultsFound && !loading && (
                <Pagination
                    page={page}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )}
        </React.Fragment >
    )
}

export default Index