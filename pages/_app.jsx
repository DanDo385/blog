// pages/_app.js or pages/_app.tsx
import Head from 'next/head';
import '@/styles/globals.css';


const poppins = Poppins({ subsets: ['latin'], weight: ['500', '700'] })
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>C2DeFi Zone</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
