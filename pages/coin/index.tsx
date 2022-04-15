import type { NextPage } from 'next'
import Head from 'next/head'
import { NextPageContext } from "next";
import { MainLayout } from '../../components-layout/MainLayout'
import { useEffect, useState } from 'react';
import Link from "next/link";
import { ICoinItem } from '../../interfaces/coin';
import { apiKey } from '../api/apikey';
import { Preloader } from '../../components-layout/preloader';
import React, { useContext } from "react";
import { Context } from '../../components-layout/Context';

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

    // Preloader
    if (!currencies) {
        return <Preloader />
    }

    return (
        <>
            <MainLayout title={'Currencies List Page'}>
                <div>
                    <Head>
                        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                        <meta name="description" content="Currencies List Page. Info table." />
                    </Head>
                    <div className="watchlist">
                        <h2>CoinsList Page</h2>
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
                                    currencies.data.map((item: ICoinItem) => {
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

// getStaticProps 

export async function getStaticProps(ctx: NextPageContext) {
    const res = await fetch(`https://api.cryptorank.io/v1/currencies?api_key=${apiKey}`)
    const currencies = await res.json()
    return { props: { currencies } }
}