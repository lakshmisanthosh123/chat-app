import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onLogin(name);
        }
    };

    return (
        <div className="login">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your username"
                />
                <button type="submit">Join Chat</button>
            </form>
        </div>
    );
};

export default Login;
