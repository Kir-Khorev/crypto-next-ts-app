import Link from "next/dist/client/link"
import Head from "next/dist/shared/lib/head"
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect } from "react";
import getAllСryptocurrencies from '../api/getAllСryptocurrencies';

export function MainLayout({ children, title = 'Next App Layout' }: any) {
    useEffect(() => { typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null }, [])

    return (
        <>
            <Head>
                <title>{title} | Next Kurs</title>
                <meta name="keywords" content="Key, My, Posts"></meta>
                <meta name="description" content="This is my posts description"></meta>
                <meta name="charSet" content="utf-8"></meta>
            </Head>
            <h2>Navigation</h2>
            <nav>
                <Link href={'/'}><a>Home</a></Link>
                <Link href={'/converter'}><a>Converter</a></Link>
                <Link href={'/watchlist'}><a>Watchlist</a></Link>
            </nav>
            <main>
                {children}
            </main>

            <footer className="footer">
                <p>Footer 2022. by khorek</p>
            </footer>

            <style jsx global>
                {`
                    nav { 
                        position: fixed;
                        height: 60px;
                        left: 0;
                        right: 0;
                        top: 0;
                        background: lightcoral;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }
                    nav a {
                        color: white;
                        text-decoration: none;
                    }
                    footer {
                        position: fixed;
                        height: 60px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: lightblue;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }
                    footer a {
                        color: white;
                        text-decoration: none;
                    }
                `}
            </style>
        </>
    )
}