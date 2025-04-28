import Layout from '@/Layout';
import { type ReactNode } from 'react';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return <Layout>{children}</Layout>;
}
