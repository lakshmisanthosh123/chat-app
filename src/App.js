import React, { useState } from 'react';
import ChatRoom from './ChatRoom';
import Login from './Login';
import './App.css';

function App() {
    const [username, setUsername] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (name) => {
        setUsername(name);
        setIsAuthenticated(true);
    };

    return (
        <div className="App">
            {!isAuthenticated ? (
                <Login onLogin={handleLogin} />
            ) : (
                <ChatRoom username={username} />
            )}
        </div>
    );
}

export default App;
