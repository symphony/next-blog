import { useRouter } from 'next/router';
import { usePost } from 'hooks/api/posts'
import Loader from 'components/Loader';
import Post from 'components/Post';
import Pagination from 'components/Pagination';
import axios from 'lib/axios';

export const PostPage = () => {

  const { query: { id } } = useRouter();

  const { data, isLoading } = usePost(id);

  if (isLoading) return <Loader />;

  return (
    <>
      <Post id={data.id} title={data.title} body={data.body} />
      <Pagination id={id} />
    </>
  );
};

export const getPost = async id => {
  const { data } = await axios.get('/posts/' + id);
  return data;
};

const Page = ({ isError }) => {

  //show custom error component if there is an error
  if (isError) return <Error />

  return <PostPage />

}

export const getServerSideProps = withCSR(async (ctx) => {

  const { id } = ctx.params;

  const queryClient = new QueryClient();

  let isError = false;

  try {
      await queryClient.fetchQuery(['post', id], () => getPost(id));
  } catch (error) {
      isError = true
      ctx.res.statusCode = error.response.status;
  }

  return {
      props: {
          //also passing down isError state to show a custom error component.
          isError,
          dehydratedState: dehydrate(queryClient),
      },
  }
})

export default Page;