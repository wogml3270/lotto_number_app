import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import type { AppProps } from 'next/app';

import '@/styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<QueryClient>();

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          suspense: true,
        },
      },
    });
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default App;
