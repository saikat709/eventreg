import React, { useEffect, type PropsWithChildren } from 'react';
import { useAuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute: React.FC<PropsWithChildren> = ({children}) => {
    const { isAuthenticated } = useAuthStore();
    const [ isLoading, setIsLoading ] = React.useState(true);
    const navigate = useNavigate();

    console.log('ProtectedRoute - isAuthenticated:', isAuthenticated);

    useEffect(() => {
        if ( !isAuthenticated ) {
            navigate('/login', { replace: true });   
        } else {
            setIsLoading(false);
        }
    }, [isAuthenticated, navigate]);

    if ( isLoading ) return <div>Loading...</div>;

    return <div>
        {children}
    </div>;
}

export default ProtectedRoute;