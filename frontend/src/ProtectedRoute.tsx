import React from 'react'
import { Navigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
}

const ProtectedRoute = ({children}: Props) => {
    // Check session storage for authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (!isAuthenticated) {
        // Redirect to the login page if not authenticated
        return <Navigate to="/" />;
    }

    // Render the requested component if authenticated
    return <>{children}</>; // Wrap children in a React Fragment
}

export default ProtectedRoute