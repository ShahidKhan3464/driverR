import React from 'react';
import { StyledTableSearchField } from './style';

const Index = ({ handleSearchQueryChange }) => {

    return (
        <StyledTableSearchField>
            <div className='field'>
                <img src='/images/search-icon.svg' alt='input-search' />
                <input type='text' placeholder='Search' onChange={(e) => handleSearchQueryChange(e.target.value)} />
            </div>
        </StyledTableSearchField>
    )
}

export default Index