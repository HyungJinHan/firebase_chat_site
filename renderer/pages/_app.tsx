import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import 'antd/dist/antd.css';
import GlobalStyles from '../public/styles/styledComponents/GlobalStyles';
import '../public/styles/chat/chat.css';
import '../public/styles/main/main.css';
import '../public/styles/sign/sign.css';
import '../public/styles/layout/layout.css';
import Header from '../layout/Header';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function MyApp({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth);

  return (
    <React.Fragment>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      {
        user ?
          <>
            <Header />
          </>
          :
          null
      }
      <Component {...pageProps} />
      <GlobalStyles />
    </React.Fragment>
  );
}

export default MyApp;
