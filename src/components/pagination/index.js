import React from 'react';
import Pagination from '@mui/material/Pagination';
import { StyledPaginationContainer } from './style';

const Index = ({ page, count, rowsPerPage, onPageChange, onRowsPerPageChange }) => {

    return (
        <StyledPaginationContainer>
            <div className='left-container'>
                <span>Show</span>
                <select
                    value={rowsPerPage}
                    onChange={onRowsPerPageChange}
                >
                    {[5, 10, 15].map((rowsPerPageOption) => (
                        <option key={rowsPerPageOption} value={rowsPerPageOption}>
                            {rowsPerPageOption}
                        </option>
                    ))}
                </select>
                <span>entries of {count} entries</span>
            </div>
            <Pagination
                page={page}
                shape="rounded"
                variant="outlined"
                onChange={onPageChange}
                count={Math.ceil(count / rowsPerPage)}
            />
        </StyledPaginationContainer>
    )
}

export default Index