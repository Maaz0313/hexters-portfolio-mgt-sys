import Layout from '@/Layout';
import { Head } from '@inertiajs/react';
import { type ReactNode } from 'react';

interface PortfolioLayoutProps {
    children: ReactNode;
    title?: string;
}

export default function PortfolioLayout({ children, title }: PortfolioLayoutProps) {
    return (
        <>
            {title && <Head title={title} />}
            <Layout>{children}</Layout>
        </>
    );
}
