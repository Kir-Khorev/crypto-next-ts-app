import Head from 'next/head'
import type { NextPage } from 'next'
import { useState, useEffect } from "react";
import { MainLayout } from '../../components-layout/MainLayout';
import { useRouter } from 'next/router'

const Coin: NextPage = ({ coin: serverCoin }: any): any => {
    const router = useRouter();
    const [coin, setCoin] = useState(serverCoin);

    useEffect(() => {
        async function load() {
            const res = await fetch(`https://api.cryptorank.io/v1/currencies/${router.query.id}?api_key=e3440fe2cc290ca0ad530b27be5f05cc00db9ecbcbb0d1babeaddede1b21`)
            const data = await res.json()
            setCoin(data.data)
        }
        if (!serverCoin) {
            load()
        }
    }, [])

    if (!coin) {
        return <MainLayout>
            <h2>Loading...</h2>
        </MainLayout>
    }

    console.log(coin);

    return (
        <MainLayout title={`${coin.name} Coin Page`}>
            <Head>
            </Head>
            <h1>{coin.name}</h1>
            <div>{coin.id}</div>
            <div>{coin.values.USD.price}</div>
        </MainLayout>
    )
}

export default Coin;

Coin.getInitialProps = async (ctx: any) => {
    // Context Object
    if (!ctx.req) {
        return { coin: null }
    }
    const res = await fetch(`https://api.cryptorank.io/v1/currencies/${ctx.query.id}?api_key=e3440fe2cc290ca0ad530b27be5f05cc00db9ecbcbb0d1babeaddede1b21`)
    const coin = await res.json()

    return {
        coin
    }
}