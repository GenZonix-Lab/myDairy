import React from 'react'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Profile from './Profile';
const Login = () => {
  return (
    <>        
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Authenticator 
                socialProviders={['google']}
                loginMechanisms={['email']}
            >
                {({ signOut, user }) => (
                    <Profile user={user} signOut={signOut}/>
                )}
            </Authenticator>
        </div>
    </>
  )
}

export default Login