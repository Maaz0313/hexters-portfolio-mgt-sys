import type { route as routeFn } from 'ziggy-js';
import { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

interface PortfolioLayoutProps {
  children: ReactNode;
  title?: string;
}

declare global {
    const route: typeof routeFn;

    interface Window {
        Layout: FC<LayoutProps>;
        PortfolioLayout: FC<PortfolioLayoutProps>;
    }
}
