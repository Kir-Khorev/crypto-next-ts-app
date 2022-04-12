import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { MainLayout } from '../components-layout/MainLayout'
import Link from "next/link"
import logo from '../assets/favicon.ico';

const Home: NextPage = () => {
  return (
    <>
      <MainLayout title={'Home Page | Next.js'}>
        <div>
          <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="Meta description for the Home page" />
          </Head>
          <div className="app-header">
            <h1>Home Page. Next.js Crypto SPA</h1>
            <Image src={logo} alt="me" width="64" height="64" className="App-logo" style={{ width: '100px', margin: 'auto' }} />
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default Home
