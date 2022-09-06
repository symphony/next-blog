import { useState } from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from 'lib/react-query-config';

function MyApp({ Component, pageProps }) {

    // This ensures that data is not shared
    // between different users and requests
    const [queryClient] = useState(() => new QueryClient(config))

    return (
        <QueryClientProvider client={queryClient}>
            // Hydrate query cache
            <Hydrate state={pageProps.dehydratedState}>
                <Component  {...pageProps} />
            </Hydrate>
        </QueryClientProvider>
    )

}

export default MyApp;