import React, { useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Post from './Post'; // Adjust the path based on your actual file structure
import { useMutation } from '@tanstack/react-query';

const NewPosts = ({ queryClient }: { queryClient: any }) => {
  const [posts, setPosts] = useState<
    { name: string; image: string; id: string; author: string; likes: number; comments: string[]; sk: string }[]
  >([]);
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const env = import.meta.env;

  const newPostMutation = useMutation({
    mutationFn: async (author: string) => {
      await fetch(`${env.VITE_BASE_URL}/posts`, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          author: author,
          description: author
        })
      });
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (image) {
      newPostMutation.mutate(name);

      const reader = new FileReader();
      reader.onload = () => {
        const newPost = {
          id: (posts.length + 1).toString(),
          author: name,
          likes: 0,
          image: reader.result as string,
          comments: [],
          sk: (posts.length + 1).toString()
        };
        setPosts([...posts, newPost]);
        setName('');
        setImage(null);
      };
      reader.readAsDataURL(image);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
      }}
    >
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', width: '100%', color: 'white' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="upload-image"
        />

        {image && (
          <Typography sx={{ mt: 2 }} color="primary">
            {image.name}
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            border: '2px solid black',
            width: '100%'
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginBottom: '10px'
            }}
          >
            <input
              type="text"
              placeholder="New Chapchal?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#101010',
                color: 'white',
                borderWidth: '0 0 1px 0',
                borderStyle: 'solid',
                borderColor: '#fff',
                padding: '10px',
                borderRadius: '0',
                outline: 'none',
                ':focus': {
                  borderColor: '#fff'
                }
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <label htmlFor="upload-image">
              <IconButton component="span" color="primary">
                <PhotoCameraIcon />
              </IconButton>
            </label>
            <Button type="submit" variant="contained" color="primary" disabled={!image && !name}>
              Post
            </Button>
          </Box>
        </Box>
      </form>

      {posts.map((post) => (
        <Post
          name={post.author}
          likes={post.likes}
          image={post.image}
          id={post.sk}
          comments={post.comments}
          key={post.sk}
          queryClient={queryClient}
        />
      ))}
    </Box>
  );
};

export default NewPosts;
