import Head from 'next/head'
import type { NextPage } from 'next'
import { useState, useEffect } from "react";
import { MainLayout } from '../../components-layout/MainLayout';
import { useRouter } from 'next/router'
import Link from "next/link";
// import { ICoinItem } from '../../interfaces/coin';

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
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </MainLayout>
    }

    console.log(coin);
    
    const srcToImageType: unknown = coin ? Object.values(coin.images)[1] : '';
    const srcToImage: string = srcToImageType as string;

    return (
        <MainLayout title={`${coin.name} Coin Page`}>
            <Head>
            </Head>
            <div className="card coinCardItem">
                <div className="card-body">
                    <img src={srcToImage} width="64" height="64" alt={coin.name} />
                    <h5 className="card-title">{coin.name} ({coin.symbol})</h5>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item list-group-item-action list-group-item-light">Price: ${coin.values.USD.price}</li>
                    <li className="list-group-item list-group-item-action list-group-item-light">Price (BTC): {coin.values.BTC.price}</li>
                    <li className="list-group-item list-group-item-action list-group-item-light">Category: {coin.category}</li>
                    <li className="list-group-item list-group-item-action list-group-item-light">Max supply: {coin.maxSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</li>
                    <li className="list-group-item list-group-item-action list-group-item-light">Total supply: {coin.totalSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</li>
                    <li className="list-group-item list-group-item-action list-group-item-light">Type: {coin.type}</li>
                    <li className="list-group-item list-group-item-action list-group-item-light">Official WebSite: <a href={coin.links[0].value} rel="noreferrer" target="_blank">{coin.links[0].value}</a></li>
                </ul>
                <div className="card-body">
                    <Link href={`/coin`} as={`/coin`}><button className="btn btn-primary">Back to list</button></Link>
                </div>
            </div>
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