import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Card from '@mui/material/Card';

const Mail = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Gragas', content: 'Hey Teemo, how are you?' },
    { id: 2, sender: 'Teemo', content: 'Hi Gragas, I\'m good thanks!' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMsg = {
        id: messages.length + 1,
        sender: 'Gragas', // Simulating sending from Alice for simplicity
        content: newMessage,
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  return (
    <Card sx={{ border: "10px solid black", width: '100%', height: '80vh', boxSizing: 'border-box', padding: '10px', bgcolor: '#101010' }}>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Box sx={{ color: 'white', border: "10px solid black", flexGrow: 1, padding: '20px', marginRight: '20px' }}>
          <i>Here</i>
        </Box>
        <Box sx={{ border: "10px solid black", flexGrow: 3, display: 'flex', flexDirection: 'column', padding: '20px' }}>
          <Box sx={{ flexGrow: 1, padding: '20px', overflowY: 'auto', marginBottom: '10px' }}>
            {messages.map((msg) => (
              <Paper key={msg.id} elevation={3} sx={{ padding: '10px', marginBottom: '10px' }}>
                <Typography variant="subtitle2" color="primary">{msg.sender}</Typography>
                <Typography variant="body1">{msg.content}</Typography>
              </Paper>
            ))}
          </Box>
          <Box sx={{ display: 'flex', padding: '10px', backgroundColor: '#f0f0f0' }}>
            <TextField
              label="Type a message"
              variant="outlined"
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              sx={{ mr: 2 }}
            />
            <IconButton onClick={handleSendMessage} color="primary" aria-label="send message">
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default Mail;
