import Link from "next/link"
import classes from '../styles/error.module.scss'
import { MainLayout } from "../components-layout/MainLayout"
import Image from "next/image"
import errorImg from '../public/404.jpg';

export default function ErrorPage() {
    return (
        <MainLayout>
            <section className="errorPage">
                <h2>Oops... Error 404. Page not found</h2>
                <Image src={errorImg}/>
                <Link href={'/'}><button className="btn btn-primary">Back to home</button></Link>
            </section>
        </MainLayout>
    )
}
