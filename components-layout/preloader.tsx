import { MainLayout } from './MainLayout';

export const Preloader = () => {
    return (
        <MainLayout>
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden"></span>
                </div>
            </div>
        </MainLayout>

    )
}