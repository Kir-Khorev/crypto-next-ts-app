import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { NextPageContext } from "next";
import { MainLayout } from '../components-layout/MainLayout'
import logo from '../assets/favicon.ico';
import { useEffect, useState } from 'react';
import Link from "next/link";


const Coins: NextPage = ({ currencies: serverCurrencies }: any) => {
    const [currencies, setCurrencies] = useState(serverCurrencies);

    useEffect(() => {
        async function load() {
            const json = await currencies.json()
            setCurrencies(json)
        }
        if (!serverCurrencies) {
            load()
        }
    }, [])

    // Preload
    if (!currencies) (
        <div className="text-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    

    return (
        <>
            <MainLayout title={'WatchList Page'}>
                <div>
                    <Head>
                    </Head>
                    <div className="watchlist">
                        <h2>WatchList Page</h2>
                        <table className="table table-hover table-sm table-responsive">
                            <thead className="table-dark">
                                <tr className="table-light">
                                    <th scope="col">#id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Values</th>
                                    <th scope="col">Total Supply</th>
                                    <th scope="col">Percent Change 30d</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currencies.data.map((item: any) => {
                                        return (
                                            <Link key={item.id} href={`/coin/[id]`} as={`/coin/${item.id}`}>
                                                <tr className="watchlistItem">
                                                    <td>{item.id}</td>
                                                    <td>{item.name} ({item.symbol})</td>
                                                    <td>${parseFloat(item.values.USD.price).toFixed(3)}</td>
                                                    <td>{item.totalSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</td>
                                                    <td>{parseFloat(item.values.USD.percentChange30d).toFixed(1)}%</td>
                                                </tr>
                                            </Link>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default Coins;

// getStaticProps - третий вариант.
// Используется если контент страницы зависит от внешних данных

export async function getStaticProps(ctx: NextPageContext) {
    const res = await fetch(`https://api.cryptorank.io/v1/currencies?api_key=e3440fe2cc290ca0ad530b27be5f05cc00db9ecbcbb0d1babeaddede1b21`)
    const currencies = await res.json()
    return { props: { currencies } }
}