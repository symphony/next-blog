import { useRouter } from 'next/router';
import { usePost } from 'hooks/api/posts'
import Loader from 'components/Loader';
import Post from 'components/Post';
import Pagination from 'components/Pagination';
import axios from 'lib/axios';

const PostPage = () => {

  const { query: { id } } = useRouter();

  const { data, isLoading } = usePost(id);

  if (isLoading) return <Loader />

  return (
    <>
    <Post id= { data.id } title = { data.title } body = { data.body } />
      <Pagination id={ id } />
        < />
    )
}

export const getPost = async id => {
  const { data } = await axios.get('/posts/' + id);
  return data;
}