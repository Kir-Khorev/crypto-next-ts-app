import type { NextPage } from 'next';
import Head from 'next/head';
import { MainLayout } from '../components-layout/MainLayout';
import getAllСryptocurrencies from '../api/getAllСryptocurrencies';
import { NextPageContext } from "next";
import { useEffect, useState } from 'react';


const Converter: NextPage = ({ currencies: serverCurrencies }) => {
    const [currencies, setCurrencies] = useState(serverCurrencies);

    useEffect(() => {
        async function load() {
            const res = await currencies;
            const json = await currencies.json()
            console.log("json", json);
            
            setCurrencies(json)
        }
        if (!serverCurrencies) {
            load()
        }
    }, [])

    console.log(currencies.data);
    

    if (!currencies) (<div>Load...</div>)

    return (
        <>
            <MainLayout title={'Converter Page'}>
                <div>
                    <Head>
                    </Head>
                    <h1>Converter Page. Next.js React Crypto SPA</h1>
                    <section>
                        {
                            currencies.data.map((item):any => {
                                return <div key={item.id}>
                                    {item.name}
                                </div>
                            })
                        }
                    </section>
                </div>
            </MainLayout>
        </>

    )
}

export default Converter;

// getStaticProps - третий вариант.
// Используется если контент страницы зависит от внешних данных

export async function getStaticProps(ctx: NextPageContext) {
    const res = await fetch('https://api.cryptorank.io/v1/currencies?api_key=e3440fe2cc290ca0ad530b27be5f05cc00db9ecbcbb0d1babeaddede1b21')
    const currencies = await res.json()
    return { props: { currencies } }
}