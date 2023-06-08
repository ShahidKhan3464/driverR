import { Navigate } from 'react-router-dom';

const Index = ({ isAuthenticated, children }) => {
    console.log(isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to="/" />
    }

    return children
}

export default Index