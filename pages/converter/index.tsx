import type { NextPage } from 'next';
import Head from 'next/head';
import { MainLayout } from '../../components-layout/MainLayout';
import { NextPageContext } from "next";
import { useEffect, useState, useContext } from 'react';
import AppContext from '../../AppContext';
import CurrencyRow from './currency-row';
import icon from '../../assets/arrow.svg';
import Image from 'next/image';
import { Preloader } from '../../components-layout/preloader';
import { apiKey } from '../api/apikey';
// Redux
import { useAppDispatch, useAppSelector } from '../../hooks';
import { decrement, increment, incrementByAmount, selectCount } from '../../features/counter';

const Converter: NextPage = ({ currencies: serverCurrencies }: any) => {
    const [currencies, setCurrencies] = useState(serverCurrencies);
    const [fromCurrency, setFromCurrency] = useState(currencies.data[0].values.USD.price);
    const [toCurrency, setToCurrency] = useState(currencies.data[4].values.USD.price);
    const value = useContext(AppContext);
    let { navbarConverter } = value.state.languages[value.state.setLanguageSelected];

    // AppRedux
    const dispatchApp = useAppDispatch();
    const countApp = useAppSelector(selectCount);

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
    if (!currencies) (<Preloader />)

    return (
        <>
            <MainLayout title={'Converter Page'}>
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="description" content="Converter Page. Info about price all crypto currencies." />
                </Head>
                <section className='converter'>
                    <h1>{navbarConverter}</h1>
                    {/* Amount */}
                    <div className="input-group">
                        <input value={countApp} onChange={(e) => dispatchApp(incrementByAmount(Number(e.target.value)))}
                            type="number" className="form-control" placeholder="0" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <div className="input-group-append">
                            <button onClick={() => dispatchApp(increment())} className="btn btn-outline-secondary" type="button">+</button>
                            <button onClick={() => dispatchApp(decrement())} className="btn btn-outline-secondary" type="button">-</button>
                        </div>
                    </div>
                    {/* Converter */}
                    <div className='currencyRows'>
                        {/* Choose first currensie */}
                        <CurrencyRow currencyOptions={currencies.data} selectedCurrency={fromCurrency}
                            onChangeCurrency={(e: any) => setFromCurrency(e.target.value)} />
                        <div className='currencyRow--icon'>
                            <Image src={icon} width="70px" height='70px' alt='arrow-icon' />
                        </div>
                        {/* Choose second currensie */}
                        <CurrencyRow currencyOptions={currencies.data} selectedCurrency={toCurrency}
                            onChangeCurrency={(e: any) => setToCurrency(e.target.value)} />
                    </div>
                    {/* Result */}
                    <div className='converterResult'>
                        <h1>Result: {fromCurrency && toCurrency ? ((fromCurrency * countApp) / toCurrency).toFixed(4) : 0}</h1>
                    </div>
                </section>
            </MainLayout>
        </>
    )
}

export default Converter;

// getStaticProps

export async function getStaticProps(ctx: NextPageContext) {
    const res = await fetch(`https://api.cryptorank.io/v1/currencies?api_key=${apiKey}`)
    const currencies = await res.json()
    return { props: { currencies } }
}