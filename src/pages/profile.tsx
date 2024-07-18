import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Box, Button, Grid, TextField, Modal } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import icons from '../icons/icons';

dayjs.extend(customParseFormat);

const { BdayIcon, CalIcon } = icons;

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({
    name: "Gragas",
    bio: "GRAGAS THE RABBLE ROUSER The only thing more important to Gragas than fighting is drinking. His unquenchable thirst for stronger ale has led him in search of the most potent and unconventional ingredients to toss in his still. Impulsive and unpredictable, this rowdy carouser loves cracking kegs as much as cracking heads. Thanks to his strange brews and temperamental nature, drinking with Gragas is always a risky proposition.",
    email: "Gragas@Gragas.com",
    phone: "+123456789",
    bday: "22nd September 2000", // Changed to the desired format
    join: "16 April 2002",
    avatar: "https://pbs.twimg.com/profile_images/1324140691967102980/m5pBhZ27_400x400.jpg",
    posts: 3,
    followers: 1000000,
    following: 1,
  });

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditUser(prevState => ({ ...prevState, [name]: value }));
  };

  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const formatBirthday = (date: string) => {
    const parsedDate = dayjs(date, 'YYYY-MM-DD');
    const day = parsedDate.date();
    const month = parsedDate.format('MMMM');
    const year = parsedDate.year();
    return `Born in ${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEditUser(prevState => ({ ...prevState, bday: formatBirthday(value) }));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 3, backgroundColor: "#101010" }}>
        <Box display="flex" alignItems="center">
          <Avatar
            sx={{ width: 150, height: 150, bgcolor: blue[500], mr: 4 }}
            src={editUser.avatar}
          />
          <Box flexGrow={1}>
            <Typography variant="h5" color="white">{editUser.name}</Typography>
            <Typography variant="body2" color="white">{editUser.bio}</Typography>
            <Box display="flex" justifyContent="space-between" sx={{ mt: 2, mb: 2 }}>
              <Box textAlign="center">
                <Typography variant="h6" color="white">{editUser.posts}</Typography>
                <Typography variant="body2" color="white">Posts</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h6" color="white">{editUser.followers}</Typography>
                <Typography variant="body2" color="white">Followers</Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h6" color="white">{editUser.following}</Typography>
                <Typography variant="body2" color="white">Following</Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" flexGrow={1} sx={{ mt: 2, mb: 2 }}>
              <Typography variant="h6" color="white">
                <BdayIcon color={'white'} /> {editUser.bday}
              </Typography>
              <Typography variant="h6" color="white">
                <CalIcon color={'white'} /> {editUser.join}
              </Typography>
            </Box>
            <Button variant="contained" color="primary" onClick={handleModalOpen}>
              Edit Profile
            </Button>
          </Box>
        </Box>
      </Card>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {Array.from(new Array(3)).map((_, index) => (
          <Grid item xs={4} key={index}>
            <Box
              sx={{
                width: '100%',
                paddingTop: '100%',
                backgroundColor: '#f0f0f0',
                border: '2px solid yellow'
              }}
            />
          </Grid>
        ))}
      </Grid>
      <Modal open={modalOpen} onClose={handleModalClose} aria-labelledby="edit-profile-modal">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#101010',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            color: 'white',
          }}
        >
          <Typography id="edit-profile-modal" variant="h6" component="h2" sx={{ mb: 2 }}>
            Edit Profile
          </Typography>
          <TextField
            label="Name"
            name="name"
            required
            InputLabelProps={{ style: { color: "white" } }} // Change label color
            InputProps={{ style: { color: "white" } }} // Change label color
            value={editUser.name}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField 
            label="Bio"
            name="bio"
            InputLabelProps={{ style: { color: "white" } }} // Change label color
            InputProps={{ style: { color: "white" } }} // Change label color
            value={editUser.bio}
            onChange={handleInputChange}
            multiline
            rows={4}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Birthday"
            name="bday"
            required
            type="date"
            InputLabelProps={{  shrink: true, style: {  color: "white" } }} // Change label color
            InputProps={{ style: { color: "white" } }} // Change label color
            onChange={handleDateChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button variant="contained" color="primary" onClick={handleModalClose}>
              Save
            </Button>
            <Button variant="contained" color="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Profile;
