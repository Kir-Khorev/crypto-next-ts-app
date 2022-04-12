import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { MainLayout } from '../components-layout/MainLayout'
import logo from '../assets/favicon.ico';
import { NextPageContext } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = ({ ath: serverAthData }: any) => {
  const [ath, setAth] = useState(serverAthData);

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
  if (!ath) (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )

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
      <MainLayout title={'Home Page | Next.js'}>
        <div>
          <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="Meta description for the Home page" />
          </Head>
          <div className="app-header">
            <h1>Home Page 1. Next.js Crypto SPA</h1>
            <Image src={logo} alt="me" width="64" height="64" className="App-logo" style={{ width: '100px', margin: 'auto' }} />
            {/* AthData */}
            <div className='ath'>
                <p>Bitcoin ATH: ${ath ? ath.data.athPrice.USD.toFixed(2) : 'No data'}</p>
                <p>From ATH: <span>{fromATH.toFixed(2)}%</span></p>
                <p>To ATH: <span>{toATH.toFixed(2)}%</span></p>
            </div>
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