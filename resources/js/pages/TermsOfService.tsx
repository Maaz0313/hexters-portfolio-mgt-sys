import PortfolioLayout from '@/layouts/portfolio-layout';
import { PageProps } from '@/types';

interface Page {
    id: number;
    title: string;
    slug: string;
    content: string;
    meta_title: string | null;
    meta_description: string | null;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

interface TermsOfServiceProps {
    page: Page;
}

export default function TermsOfService({ page }: PageProps<TermsOfServiceProps>) {
    return (
        <PortfolioLayout title={page.meta_title || page.title}>
            <div className="bg-background py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-primary mb-8 text-4xl font-bold">{page.title}</h1>

                    <div className="prose prose-lg text-card-foreground max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
                </div>
            </div>
        </PortfolioLayout>
    );
}
