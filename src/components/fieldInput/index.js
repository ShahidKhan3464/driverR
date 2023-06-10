import React from 'react';
import { StyledTextField } from './style';

const Index = ({ width, mbWidth, label, shrink, field, autoComplete, type, error, placeholder = '' }) => {

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
            placeholder={placeholder}
            autoComplete={autoComplete}
            InputLabelProps={{ shrink }}
        />
    )
}

export default Index