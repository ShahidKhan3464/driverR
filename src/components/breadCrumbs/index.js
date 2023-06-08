import React from 'react';
import { StyledBreadcrumbs } from './style';

const index = ({ children }) => {

    return (
        <StyledBreadcrumbs separator="›" aria-label="breadcrumb">
            {children}
        </StyledBreadcrumbs>
    )
}

export default index