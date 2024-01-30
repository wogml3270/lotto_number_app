import type { AppProps } from 'next/app';
import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
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
}
