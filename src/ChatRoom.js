import React, { useState, useEffect } from 'react';
import socket from './socket';
import ChatWindow from './ChatWindow';

const ChatRoom = ({ username }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for reply from the server
        socket.on('receive_reply', (serverReply) => {
            console.log(`Reply received from server: ${serverReply.text}`);
            setMessages((prevMessages) => [...prevMessages, serverReply]);
        });

        return () => {
            socket.off('receive_reply');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            const newMessage = { username, text: message };
            console.log(`Sending message: ${newMessage.text}`);
            
            // Emit the message to the server
            socket.emit('send_message', newMessage);
            
            // Add the message to the local message list
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            
            // Clear the input field
            setMessage('');
        }
    };

    return (
        <div className="chat-room">
            <ChatWindow messages={messages} />
            <div className="message-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;
