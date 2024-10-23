import React, { useState } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);

    const responseGoogle = (response) => {
        if (response.profileObj) {
            setUser(response.profileObj);
            console.log('User Info:', response.profileObj);
        } else {
            console.error('Login failed:', response);
        }
    };

    const handleLogout = () => {
        setUser(null);
        console.log('Logged out');
    };

    return (
        <div className="App">
            <h2>Login with Google</h2>
            {!user ? (
                <GoogleLogin
                    clientId="742824948443-mu8jmscmf958qb2dal6144d0v9ltnrph.apps.googleusercontent.com" // Your actual client ID
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            ) : (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <img src={user.imageUrl} alt="Profile" />
                    <GoogleLogout
                        buttonText="Logout"
                        onLogoutSuccess={handleLogout}
                    />
                </div>
            )}
        </div>
    );
};

export default App;
