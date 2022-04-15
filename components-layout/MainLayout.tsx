import Link from "next/dist/client/link"
import Head from "next/dist/shared/lib/head"
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from "react";
import { getProviders, signIn as signIntoProvider } from "next-auth/react";

export function MainLayout({ children, title = 'Next App CryptoCurrencies' }: any) {
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null;

        (async () => {
            const res: any = await getProviders();
            setProviders(res);
        })();
    }, []);

    // useEffect(() => { typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null }, [])

    return (
        <>
            <Head>
                <title>{title} | Next.js</title>
                <meta name="keywords" content="Key, My, Posts"></meta>
                <meta name="description" content="This is my crypto App description"></meta>
                <meta name="charSet" content="utf-8"></meta>
            </Head>
            <nav className="navbar">
                <div className="navbarMenu">
                    <Link href={'/'}><a>Home</a></Link>
                    <Link href={'/converter'}><a>Converter</a></Link>
                    <Link href={'/coin'}><a>Coins List</a></Link>
                </div>
                <div className="navbarLogin">
                    {providers &&
                        Object.values(providers).map((provider: any) => (
                            <div key={provider.name}>
                                <button
                                    onClick={() => {
                                        signIntoProvider(provider.id);
                                    }}
                                >
                                    Sign in with {provider.name}
                                </button>
                            </div>
                        ))}
                    {/* Login logout form */}
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
                        height: 60px;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: lightcoral;
                        color: white;
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

export async function getServerSideProps(context) {
    const providers = await getProviders();
    return {
        props: {
            providers,
        },
    };
}