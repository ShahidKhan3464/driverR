import styled from "styled-components";
import { infoLink } from "components/globaStyle";
import Breadcrumbs from '@mui/material/Breadcrumbs';

export const StyledBreadcrumbs = styled(Breadcrumbs)`
    .MuiBreadcrumbs-ol {
        gap: 8px;

        .MuiBreadcrumbs-separator {
            margin: 0;
            font-weight: 700;
        } 

        .MuiBreadcrumbs-li {
            a, span {
                font-size: 14px;
                font-weight: 400;
                line-height: 150%;
                font-style: normal;
                font-family: SF Pro Text;

                @media screen and (max-width: 520px) {
                    font-size: 12px;
                }
            }
    
            a {
                color: #374151;
                &:hover {
                    text-decoration: underline;
                }
            }
    
            span {
                color: ${infoLink};
            }
        } 
    }      
`