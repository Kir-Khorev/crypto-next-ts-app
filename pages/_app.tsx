import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import Head from "next/head";
import type { AppProps } from 'next/app'
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>
  
  useEffect(() => { typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null }, [])

  return <Component {...pageProps} />
}

export default MyApp
