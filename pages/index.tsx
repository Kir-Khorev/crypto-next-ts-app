import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { MainLayout } from '../components-layout/MainLayout'
import logo from '../assets/favicon.ico';
import { NextPageContext } from "next";
import { useEffect, useState, useContext } from "react";
import { Preloader } from '../components-layout/preloader'
import AppContext from '../AppContext'

import { useAppDispatch, useAppSelector } from '../hooks'

// import { getKanyeQuote, selectKanye } from '../features/kanye/kanyeSlice';
// import { getKanyeQuote, kanyeQuoteSelector } from '../features/kanye';

const Home: NextPage = ({ ath: serverAthData }: any) => {
  const dispatch = useAppDispatch();
  // kanye
  // const { data, pending, error } = useAppSelector(selectKanye);
  // const { data, pending, error }: any = useAppSelector(kanyeQuoteSelector);

  // 
  const [ath, setAth] = useState(serverAthData);
  const value = useContext(AppContext);
  let { homeTitle } = value.state.languages[value.state.setLanguageSelected];

  // Await and set data from Server
  useEffect(() => {
    async function load() {
      const json = await ath;
      setAth(json);
    }
    if (!serverAthData) {
      load()
    }
  }, [])

  // Preloader
  if (!ath) {
    return <Preloader />
  }

  // ATH price
  const athPrice = ath.data.athPrice.USD;
  const currentPrice = ath.data.price.USD;

  //  From ATH
  const fromATH = (athPrice - currentPrice) / athPrice * 100;

  // To ATH
  const toATH = (athPrice - currentPrice) / currentPrice * 100;

  // Render page
  return (
    <>
      <MainLayout title={'Home Page'}>
        <div>
          <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="Meta description for the Home page" />
          </Head>
          <div className="app-header">
            <h1>{homeTitle}</h1>
            <Image src={logo} alt="me" width="64" height="64" className="App-logo" style={{ width: '100px', margin: 'auto' }} />
            {/* AthData */}
            <div className='ath'>
              <p>Bitcoin ATH: ${ath ? ath.data.athPrice.USD.toFixed(2) : 'No data'}</p>
              <p>From ATH: <span>{fromATH.toFixed(2)}%</span></p>
              <p>To ATH: <span>{toATH.toFixed(2)}%</span></p>
            </div>
            {/* ============ */}

            {/* KANYE EXAMPLE */}

            {/* <div>
              <h2>Generate random Kanye West quote</h2>
              {pending && <p>Loading...</p>}
              {data && <p>{data.quote}</p>}
              {error && <p>Oops, something went wrong</p>}
              <button onClick={() => dispatch(getKanyeQuote())} disabled={pending}>
                Generate Kanye Quote
              </button>
            </div> */}

            {/* KANYE EXAMPLE */}
          </div>
        </div>


      </MainLayout>
    </>
  )
}

export default Home;

// getStaticProps 

export async function getStaticProps(ctx: NextPageContext) {
  const res = await fetch('https://tstapi.cryptorank.io/v0/coins/bitcoin');
  const ath = await res.json();
  return { props: { ath } }
}