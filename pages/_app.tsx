import '@/styles/globals.css';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';
import { store } from '@/stores/store';
import Footer from '@/components/widgets/Footer';
import type { AppProps } from 'next/app';
import NavBar from '@/components/widgets/NavBar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: 'dark', fontFamily: 'Verdana, sans-serif' }}
    >
      <Provider store={store}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </MantineProvider>
  );
}
