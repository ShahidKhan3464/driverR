import React from 'react';
import { StyledTextField } from './style';

const Index = ({ width, mbWidth, label, field, autoComplete, type, error }) => {

    return (
        <StyledTextField
            fullWidth
            {...field}
            type={type}
            width={width}
            label={label}
            error={error}
            mbWidth={mbWidth}
            variant="outlined"
            autoComplete={autoComplete}
        />
    )
}

export default Index