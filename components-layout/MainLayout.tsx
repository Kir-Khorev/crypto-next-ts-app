import Link from "next/dist/client/link"
import Head from "next/dist/shared/lib/head"
import 'bootstrap/dist/css/bootstrap.css';
import { useContext, useEffect, useState } from "react";
import gitLogo from '../assets/git.png';
import Image from "next/image";
import AppContext from "../AppContext";

export function MainLayout({ children, title = 'Next App CryptoCurrencies' }: any) {
    useEffect(() => { typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null }, [])
    const value = useContext(AppContext);
    let { navbarHome, navbarConverter, navbarCoinslist, login, logout } = value.state.languages[value.state.setLanguageSelected];

    console.log(value);


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
                    <Link href={'/'}><a>{navbarHome}</a></Link>
                    <Link href={'/converter'}><a>{navbarConverter}</a></Link>
                    <Link href={'/coin'}><a>{navbarCoinslist}</a></Link>
                </div>

                <div className="navbarLogin">
                    {/* Chouse language */}
                    <select className="form-select" name="lang" id="lang" value={value.state.setLanguageSelected}
                        onChange={(e) => value.setLanguageSelected(e.target.value)}>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                    </select>
                    {/* Login, logout form */}
                    <form className="d-flex">
                        <Link href={'/api/auth/signin'}>
                            <button className="btn btn-warning logBtn" type="submit">{login}</button>
                        </Link>
                        <Link href={'/api/auth/signout'}>
                            <button className="btn btn-warning logBtn" type="submit">{logout}</button>
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
                    .form-select {
                        width: 7rem;
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