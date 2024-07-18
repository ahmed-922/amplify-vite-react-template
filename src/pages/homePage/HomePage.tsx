/* eslint-disable @typescript-eslint/no-explicit-any */
import Post from '../../components/Post';
import { useQuery } from '@tanstack/react-query';
import NewPosts from '../../components/NewPosts';

const HomePage = (props: { queryClient: any }) => {
  const { queryClient } = props;

  const env = import.meta.env;

  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch(`${env.VITE_BASE_URL}/posts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Filter out the current posts from the data array
  const otherPosts = data.filter((post) => post.sk !== 'post1' && post.sk !== 'post2' && post.sk !== 'post3');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <NewPosts posts={otherPosts} queryClient={queryClient} />
      {data.map(
        (post: { author: string; likes: number; image: string; id: string; sk: string; comments: string[] }) => (
          <Post
            name={post.author}
            likes={post.likes}
            image={post.image}
            id={post.sk}
            comments={post.comments}
            key={post.sk}
            queryClient={queryClient}
          />
        )
      )}
    </div>
  );
};

export default HomePage;
