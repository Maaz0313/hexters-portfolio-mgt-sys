import { useSidebar } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function AdminLogoLink() {
    const { state } = useSidebar();
    const isMobile = useIsMobile();
    const isCollapsed = state === 'collapsed';

    // Always show text in mobile view, otherwise follow collapsed state
    const showText = isMobile || !isCollapsed;

    return (
        <div
            className={cn('flex items-center transition-all duration-200', isCollapsed && !isMobile ? 'justify-center p-0 py-4' : 'p-4')}
            style={{ pointerEvents: 'auto' }}
        >
            <Link
                href="/dashboard"
                prefetch
                className={cn('flex items-center gap-2 transition-all duration-200', isCollapsed && !isMobile ? 'w-full justify-center px-0' : '')}
                style={{
                    pointerEvents: 'auto',
                    backgroundColor: 'transparent',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onClick={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                }}
            >
                <img
                    src="/images/logos/logo white.png"
                    alt="Hexters Logo Icon"
                    className={cn(
                        'transition-all duration-200',
                        isCollapsed && !isMobile ? 'mx-auto h-5 w-5' : isMobile ? 'h-7 w-auto' : 'h-6 w-auto',
                    )}
                    style={{
                        objectFit: 'contain',
                        maxWidth: isCollapsed && !isMobile ? '100%' : 'auto',
                    }}
                />
                {showText && (
                    <span
                        className={cn(
                            'font-title overflow-hidden tracking-wide whitespace-nowrap transition-opacity duration-200',
                            isMobile ? 'text-accent text-2xl' : 'text-primary text-xl',
                        )}
                        style={{ fontFamily: 'var(--font-title)' }}
                    >
                        HEXTERS
                    </span>
                )}
            </Link>
        </div>
    );
}
