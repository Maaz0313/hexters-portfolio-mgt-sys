import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/react';
import { Fragment } from 'react';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    return (
        <>
            {breadcrumbs.length > 0 && (
                <nav aria-label="breadcrumb" data-slot="breadcrumb">
                    <ol
                        data-slot="breadcrumb-list"
                        className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5"
                    >
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;
                            return (
                                <Fragment key={index}>
                                    <li
                                        data-slot="breadcrumb-item"
                                        className="inline-flex items-center gap-1.5"
                                    >
                                        {isLast ? (
                                            <span
                                                data-slot="breadcrumb-page"
                                                role="link"
                                                aria-disabled="true"
                                                aria-current="page"
                                                className="text-foreground font-normal"
                                            >
                                                {item.title}
                                            </span>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="hover:text-foreground transition-colors"
                                            >
                                                {item.title}
                                            </Link>
                                        )}
                                    </li>
                                    {!isLast && (
                                        <li
                                            data-slot="breadcrumb-separator"
                                            role="presentation"
                                            aria-hidden="true"
                                            className="[&>svg]:size-3.5"
                                        >
                                            <ChevronRight />
                                        </li>
                                    )}
                                </Fragment>
                            );
                        })}
                    </ol>
                </nav>
            )}
        </>
    );
}
