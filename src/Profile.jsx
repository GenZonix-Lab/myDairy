import { fetchUserAttributes, signOut, getCurrentUser } from 'aws-amplify/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dairy from './Dairy';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [attributes, setAttributes] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkAuth = async () => {
            try {
                await getCurrentUser();
                const attrs = await fetchUserAttributes();
                console.log('User attributes:', attrs);
                setAttributes(attrs);
            } catch (err) {
                console.error('Not authenticated:', err);
                //navigate('/');
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <main>
           <Dairy name={attributes?.name} signOut={signOut}/>
        </main>
  )
}

export default Profile