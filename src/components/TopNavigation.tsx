import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import icons from '../icons/icons'; 

const { HomeIcon, UploadIcon, LikesIcon, SearchIcon, UserIcon, MailIcon, InboxIcon } = icons;

const TopNavigation = () => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const handleMailClick = () => {
    navigate('/user-mail'); 
  };

  const handleHomeClick = () => {
    navigate('/'); 
  };

  const handleInboxClick = () => {
    setShowNotification(true);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            <Button color="inherit" onClick={handleHomeClick}>
              <a>طلعـــات</a>
            </Button>
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            <Button color="inherit" onClick={handleHomeClick}>
              <HomeIcon color={'white'} />
            </Button>
            <Button color="inherit" onClick={() => navigate('/search')}>
              <SearchIcon color={'white'} />
            </Button>
            <Button color="inherit" onClick={() => navigate('/post')}>
              <UploadIcon color={'white'} />
            </Button>
            <Button color="inherit" onClick={() => navigate('/user-likes')}>
              <LikesIcon color={'white'} />
            </Button>
            <Button color="inherit" onClick={() => navigate('/profile')}>
              <UserIcon color={'white'} />
            </Button>
          </Box>
          <Button color="inherit" onClick={handleMailClick}>
            <MailIcon color={'white'} />
          </Button>
          <Button color="inherit" onClick={handleInboxClick}>
            <InboxIcon color={'white'} />
          </Button>
          <Button color="inherit" onClick={handleLoginClick}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      {showNotification && (
        <Box
          sx={{
            position: 'fixed',
            top: 64,
            right: 0,
            width: '20%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            textAlign: 'center',
            padding: '10px',
            zIndex: 9999, 
          }}
        >
          <Typography variant="body1">
            This is a notification box!
            <Button color="inherit" onClick={closeNotification} style={{ marginLeft: '10px' }}>
              Close
            </Button>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default TopNavigation;
