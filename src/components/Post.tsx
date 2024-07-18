import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { MoreHoriz } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { TextField, Button, List, ListItem, ListItemText, Modal, Box } from '@mui/material';
import icons from '../icons/icons';

const { CommIcon } = icons;

const Post = (props: {
  name: string;
  likes: number;
  image: string;
  id: string;
  comments: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryClient: any;
}) => {
  const { id, name, likes, image, comments } = props;
  const [totalLikes, setTotalLikes] = useState(likes);
  const [color, setColor] = useState<'default' | 'success'>();
  const [fontColor] = useState<'black' | 'white'>('black');
  const [comment, setComment] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const env = import.meta.env;

  const likesMutation = useMutation({
    mutationFn: async () => {
      await fetch(`${env.VITE_BASE_URL}/posts/${id}`, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
    }
  });

  const commentsMutation = useMutation({
    mutationFn: async (commentBody: string) => {
      await fetch(`${env.VITE_BASE_URL}/posts/${id}/comments`, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          commentText: commentBody
        })
      });
    },
    onSuccess: () => {
      props.queryClient.invalidateQueries(['posts']);
    }
  });

  const onLike = () => {
    likesMutation.mutate();
    setColor('success');
    setTotalLikes(totalLikes + 1);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim() !== '') {
      commentsMutation.mutate(comment);
      setComment('');
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          maxWidth: 700,
          width: 500,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#101010',
          color: fontColor,
          borderBottom: '2px solid #FFFFFF'
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
              Alaa
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreHoriz sx={{ color: 'white' }} />
            </IconButton>
          }
          sx={{ color: 'white' }}
          title={name}
          subheader="September 14, 2016"
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CardMedia
            sx={{ maxWidth: 300, maxHeight: 300, borderRadius: '20px' }}
            component="img"
            width="700"
            height="500"
            image={image ? image : 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gragas_2.jpg'}
            alt="Paella dish"
          />
        </div>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={onLike} color={color === 'success' ? 'error' : 'default'}>
            <FavoriteIcon />
            {totalLikes}
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Button onClick={handleModalOpen} sx={{ color: 'white' }}>
            <CommIcon color={'white'} />
          </Button>
        </CardActions>
      </Card>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="comments-modal-title"
        aria-describedby="comments-modal-description"
      >
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
            color: 'white'
          }}
        >
          <Typography id="comments-modal-title" variant="h6" component="h2">
            Comments
          </Typography>
          <List>
            {comments.map((comment: string, index: number) => (
              <ListItem key={index}>
                <ListItemText primary={comment} />
              </ListItem>
            ))}
          </List>
          <TextField
            label="Add a comment"
            variant="outlined"
            fullWidth
            value={comment}
            onChange={handleCommentChange}
            sx={{ mt: 2, mb: 2 }}
            InputLabelProps={{ style: { color: 'white' } }} // Change label color
            InputProps={{ style: { color: 'white' } }} // Change input text color
          />
          <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
            Add Comment
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Post;
