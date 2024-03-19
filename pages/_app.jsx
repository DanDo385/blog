// pages/_app.js 
import Head from 'next/head';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>C2DeFi</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
