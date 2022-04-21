import Head from 'next/head'
import type { NextPage } from 'next'
import { useState, useEffect } from "react";
import { MainLayout } from '../../components-layout/MainLayout';
import { useRouter } from 'next/router'
import Link from "next/link";
import { apiKey } from '../api/apikey';
import { Preloader } from '../../components-layout/preloader';
import React, { useContext } from "react";

type CoinType = {
    id: number;
    category: string;
    name: string,
    symbol: string;
    maxSupply: number;
    totalSupply: number;
    type?: string;
    data: any;
    // coin: any;
    values: any;
    images: string;
    links: Array<string> | any;
    volume24hBase: number | string
}

const Coin: NextPage = ({ coin: serverCoin }: any): any => {
    const router = useRouter();
    const [coin, setCoin] = useState<CoinType>(serverCoin);

    useEffect(() => {
        async function load() {
            const res = await fetch(`https://api.cryptorank.io/v1/currencies/${router.query.id}?api_key=${apiKey}`);
            const data = await res.json()
            console.log("data", coin);
            setCoin(data)
        }
        if (!serverCoin) {
            load()
        }
    }, [])


    // Src to image
    const srcToImageType: unknown = coin ? Object.values(coin.data.images)[1] : '';
    const srcToImage: string = srcToImageType as string;

    // Preloader
    if (!coin) {
        return <Preloader />
    }

    console.log(coin);
    
    // Render page
    return (
        <MainLayout>
            <Head>
                <title>{coin.data.name} | All info</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content={coin.name + ' — All info about Cryptocurrency'} />
            </Head>
            <div className="card coinCardItem">
                <div className="card-body">
                    <img src={srcToImage} width="64" height="64" alt={coin.data.name} />
                    <h5 className="card-title">{coin.data.name} ({coin.data.symbol})</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action list-group-item-light">Price: ${coin.data.values.USD.price}</li>
                    <li className="list-group-item list-group-item-action list-group-item-light">Price (BTC): {coin.data.values.BTC.price}</li>
                    <li className="list-group-item list-group-item-action list-group-item-light">Category: {coin.data.category}</li>
                    <li className="list-group-item list-group-item-action list-group-item-light">Max supply: {coin.data.maxSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</li>
                    <li className="list-group-item list-group-item-action list-group-item-light">Total supply: {coin.data.totalSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</li>
                    <li className="list-group-item list-group-item-action list-group-item-light">Type: {coin.type}</li>
                    <li className="list-group-item list-group-item-action list-group-item-light">Official WebSite: <a href={coin.data.links[0].value} rel="noreferrer" target="_blank">{coin.data.links[0].value}</a></li>
                </ul>
                <div className="card-body">
                    <Link href={`/coin`} as={`/coin`}><button className="btn btn-primary">Back to list</button></Link>
                </div>
            </div>
        </MainLayout>
    )
}

export default Coin;

// SSR

export const getServerSideProps = async (ctx: any) => {
    if (!ctx.req) {
        return { coin: null }
    }

    const res = await fetch(`https://api.cryptorank.io/v1/currencies/${ctx.query.id}?api_key=${apiKey}`)
    const coin = await res.json()
    return {
        props: {
            coin
        }
    }
}

// Get initial Props

// Coin.getInitialProps = async (ctx: any) => {
//     // Context Object
//     if (!ctx.req) {
//         return { coin: null }
//     }
//     const res = await fetch(`https://api.cryptorank.io/v1/currencies/${ctx.query.id}?api_key=${apiKey}`)
//     const coin = await res.json()

//     return {
//         coin
//     }
// }