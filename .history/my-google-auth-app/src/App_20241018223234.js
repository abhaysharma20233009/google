import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, GoogleLogout } from '@react-oauth/google';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);

    const responseGoogle = (response) => {
        const userProfile = response.credential;
        if (userProfile) {
            setUser(userProfile);
            console.log('User Info:', userProfile);
        } else {
            console.error('Login failed:', response);
        }
    };

    const handleLogout = () => {
        setUser(null);
        console.log('Logged out');
    };

    return (
        <GoogleOAuthProvider clientId="742824948443-mu8jmscmf958qb2dal6144d0v9ltnrph.apps.googleusercontent.com">
            <div className="App">
                <h2>Login with Google</h2>
                {!user ? (
                    <GoogleLogin
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                ) : (
                    <div>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <img src={user.picture} alt="Profile" />
                        <GoogleLogout
                            buttonText="Logout"
                            onLogoutSuccess={handleLogout}
                        />
                    </div>
                )}
            </div>
        </GoogleOAuthProvider>
    );
};

export default App;