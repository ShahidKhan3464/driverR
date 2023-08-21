import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import Dialog from './Dialog';
import { saveAs } from 'file-saver';
import PrintReceipt from './Receipt';
import Table from '@mui/material/Table';
import { truncatedString } from 'utils';
import Paper from '@mui/material/Paper';
import { pdf } from '@react-pdf/renderer';
import MenuList from 'components/menuList';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Pagination from 'components/pagination';
import DownloadReceipt from './DownloadReceipt';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import { useReactToPrint } from 'react-to-print';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledTableCell, StyledTableRow, StyledNoResultsFound, StyledHeading } from 'components/globaStyle';

const options = [
    { icon: '/images/view-icon.svg', text: 'View' },
    { icon: '/images/print-receipt.svg', text: 'Print receipt' },
    { icon: '/images/download.svg', text: 'Download' },
]

const Index = ({ data, loading, selected, setSelected }) => {
    const componentRef = useRef()
    const [page, setPage] = useState(1)
    const noResultsFound = data.length === 0
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [trscDetails, setTrscDetails] = useState(null)
    const [printTrigger, setPrintTrigger] = useState(false)

    const startIndex = (page - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const paginatedData = data.slice(startIndex, endIndex)

    const isSelected = (id) => {
        const index = selected.findIndex(item => item.transactionId === id)
        if (index !== -1) {
            return true
        }
        else {
            return false
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10))
        setPage(1)
    }

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((item) => item)
            setSelected(newSelected)
            return
        }
        setSelected([])
    }

    const handleClick = (event, id, isItemSelected) => {
        if (!event.target.classList.contains('MuiModal-backdrop')) {
            if (isItemSelected) {
                const selectedIndex = selected.filter(item => item.transactionId !== id)
                setSelected(selectedIndex)
                return
            }

            const selectedIndex = data.find(item => item.transactionId === id)
            setSelected([...selected, selectedIndex])
        }
    }

    const handleTableMenu = async (id, userId, status, option, trscDetails) => {
        if (option === 'View') {
            setDialogOpen(true)
            setDialogType('view')
            setTrscDetails(trscDetails)
        }

        else if (option === 'Print receipt') {
            setPrintTrigger(true)
            setTrscDetails(trscDetails)
        }

        else if (option === 'Download') {
            const doc = pdf(<DownloadReceipt data={trscDetails} />)
            const blob = await doc.toBlob()
            saveAs(blob, 'driverR.pdf')
        }
    }

    const printReceipt = useReactToPrint({
        content: () => componentRef.current
    })

    useEffect(() => {
        if (printTrigger) {
            printReceipt()
            setPrintTrigger(false)
        }
    }, [printTrigger, printReceipt])

    return (
        <React.Fragment>
            {dialogOpen && (
                <Dialog
                    open={dialogOpen}
                    data={trscDetails}
                    dialogType={dialogType}
                    setOpen={setDialogOpen}
                />
            )}
            <div style={{ display: 'none' }}>
                <PrintReceipt data={trscDetails} componentRef={componentRef} />
            </div>
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
                            <StyledTableCell>Company name</StyledTableCell>
                            <StyledTableCell>Transaction id</StyledTableCell>
                            <StyledTableCell>Plan type</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Time</StyledTableCell>
                            <StyledTableCell>Amount</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ borderBottom: 'none' }}>
                                    <div
                                        style={{
                                            height: '100vh',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <CircularProgress color="inherit" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : noResultsFound ? (
                            <TableRow>
                                <TableCell colSpan={8} align="center" sx={{ borderBottom: 'none' }}>
                                    <StyledNoResultsFound>
                                        <div className='container'>
                                            <img src='/images/search-not-found.svg' alt='not-found' />
                                            <StyledHeading>Transaction not found</StyledHeading>
                                        </div>
                                    </StyledNoResultsFound>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((item, index) => {
                                const isItemSelected = isSelected(item.transactionId)
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
                                        onClick={(event) => handleClick(event, item.transactionId, isItemSelected)}
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
                                            {item.name}
                                        </StyledTableCell>
                                        <StyledTableCell>{truncatedString(item.transactionId)}</StyledTableCell>
                                        <StyledTableCell>{item.planType?.split(" ")[0]}</StyledTableCell>
                                        <StyledTableCell>{moment(item.date).format('DD MMM YYYY')}</StyledTableCell>
                                        <StyledTableCell>{moment(item.date, 'HH:mm').format('hh:mm A')}</StyledTableCell>
                                        <StyledTableCell>€{Math.floor(item.amount / 100)}</StyledTableCell>
                                        <StyledTableCell>
                                            <MenuList
                                                options={options}
                                                trscDetails={item}
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