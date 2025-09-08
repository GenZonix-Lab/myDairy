import { fetchUserAttributes, signOut } from 'aws-amplify/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dairy from './Dairy';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [attributes, setAttributes] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const loadAttributes = async () => {
            try {
                const attrs = await fetchUserAttributes();
                setAttributes(attrs);
            } catch (err) {
                console.error('Failed to fetch attributes:', err);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        loadAttributes();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <main>
           <Dairy name={attributes?.name} signOut={signOut}/>
        </main>
  )
}

export default Profile