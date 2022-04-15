import Link from "next/dist/client/link"
import Head from "next/dist/shared/lib/head"
import 'bootstrap/dist/css/bootstrap.css';
import { useContext, useEffect, useState } from "react";
import gitLogo from '../assets/git.png';
import Image from "next/image";

export function MainLayout({ children, title = 'Next App CryptoCurrencies' }: any) {
    useEffect(() => { typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null }, [])

    return (
        <>
            <Head>
                <title>{title} | Next.js</title>
                <meta name="keywords" content="Key, My, Posts"></meta>
                <meta name="description" content="This is my crypto App description"></meta>
                <meta name="charSet" content="utf-8"></meta>
            </Head>
            <nav className="navbar">
                {/* Menu */}
                <div className="navbarMenu">
                    <Link href={'/'}><a>Home</a></Link>
                    <Link href={'/converter'}><a>Converter</a></Link>
                    <Link href={'/coin'}><a>Coins List</a></Link>
                </div>
                {/* Toggle theme dark/light */}
                {/* <div className="form-check form-switch">
                    <input className="form-check-input" onChange={() => setContext('dark')} type="checkbox" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark/light theme</label>
                </div> */}

                {/* Login logout form */}
                <div className="navbarLogin">
                    <form className="d-flex">
                        <Link href={'/api/auth/signin'}>
                            <button className="btn btn-warning logBtn" type="submit">Login</button>
                        </Link>
                        <Link href={'/api/auth/signout'}>
                            <button className="btn btn-warning logBtn" type="submit">Logout</button>
                        </Link>
                    </form>
                </div>
            </nav>
            <main>
                {children}
            </main>
            <footer className="footer">
                <p>Footer 2022. by Khorek</p>
                <a href="https://github.com/khorek/crypto-next-ts-app" target="_blank">
                    <span>Source Code: </span>
                    <Image src={gitLogo} alt="github" />
                </a>
            </footer>

            <style jsx global>
                {`
                    header {
                        display: flex;
                        flex-direction: row;
                    }
                    header-loginForm {
                        font-size: 25px;
                        color: white;
                    }
                    nav { 
                        position: fixed;
                        height: 60px;
                        left: 0;
                        right: 0;
                        top: 0;
                        background: #0d6efd;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }
                    nav a {
                        color: white;
                        text-decoration: none;
                        transition: all ease-in .3s;
                    }
                    nav a:hover {
                        color: lightblue;
                    }
                    .logBtn {
                        margin: auto 15px;
                        color: #100873;
                        background: #FFF673;
                    }
                    footer {
                        position: fixed;
                        height: 70px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: lightcoral;
                        color: white;
                        display: flex;
                        justify-content: center;
                        align-items: baseline;
                    }
                    footer > * {
                        color: white;
                        text-decoration: none;
                        transition: all ease-in .4s;
                        margin: 15px;
                        display: flex;
                        align-items: center;
                    }
                    footer a:hover {
                        color: #ccc;
                    }
                `}
            </style>
        </>
    )
}