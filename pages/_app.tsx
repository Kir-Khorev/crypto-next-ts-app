import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import Head from "next/head";
import type { AppProps } from 'next/app'
import { useEffect, useState } from "react";
import AppContext from '../AppContext';
import languagesObject from '../languagesObject';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [languageSelected, setLanguageSelected] = useState('en');
  const languageObject = languagesObject;

  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Head>

  useEffect(() => { typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null }, [])

  return <AppContext.Provider value={{
        state: {
          languages: languageObject[languageSelected],
          setLanguageSelected: languageSelected
        },
        setLanguageSelected: setLanguageSelected,
      }}>
        <Component {...pageProps} />
  </AppContext.Provider>
}

export default MyApp
