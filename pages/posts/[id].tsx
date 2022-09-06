import { getPost } from 'api/posts';
import { dehydrate, QueryClient } from '@tanstack/react-query';

export const getServerSideProps = async (ctx) => {

    const { id } = ctx.params;

    const queryClient = new QueryClient()

    // prefetch data on the server
    await queryClient.fetchQuery(['post', id], () => getPost(id))

    return {
        props: {
            // dehydrate query cache
            dehydratedState: dehydrate(queryClient),
        },
    }
}