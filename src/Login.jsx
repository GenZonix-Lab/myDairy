import React from 'react'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Dairy from './Dairy';
const Login = () => {
  return (
    <>        
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Authenticator 
                loginMechanisms={['email']}
            >
                {({ signOut, user }) => (
                    <Dairy user={user} signOut={signOut}/>
                )}
            </Authenticator>
        </div>
    </>
  )
}

export default Login