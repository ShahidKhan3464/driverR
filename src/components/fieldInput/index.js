import React from 'react';
import { StyledTextField } from './style';

const Index = ({ width, mbWidth, label, shrink, field, autoComplete, type, error, placeholder = '', multiline = false }) => {

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
            multiline={multiline}
            placeholder={placeholder}
            autoComplete={autoComplete}
            InputLabelProps={{ shrink }}
        />
    )
}

export default Index