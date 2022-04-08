import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { About } from './about'
import { MainLayout } from '../components-layout/MainLayout'
import Link from "next/link"
import logo from '../assets/favicon.ico';


const Home: NextPage = () => {
  return (
    <>
      <MainLayout title={'Home Page'}>
        <div>
          <Head>
            <title>My Own Title Next.js</title>
          </Head>
          <div className="app-header">
            <h1>Home Page. Next.js React Crypto SPA</h1>
            <Image src={logo} alt="me" width="64" height="64" />
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default Home
