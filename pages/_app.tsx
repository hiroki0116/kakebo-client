import '@/styles/globals.css';
import Layout from '@/components/widgets/Layout';
import { MantineProvider } from '@mantine/core';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: 'dark', fontFamily: 'Verdana, sans-serif' }}
    >
      <Layout title="KaKeBo">
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
