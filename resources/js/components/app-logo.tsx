export default function AppLogo() {
    return (
        <>
            <div className="flex items-center gap-2">
                <img
                    src="/images/logos/logo white.png"
                    alt="Hexters Logo Icon"
                    className="h-6 w-auto"
                />
                <span
                    className="font-title text-xl text-primary tracking-wide"
                    style={{ fontFamily: 'var(--font-title)' }}
                >
                    HEXTERS
                </span>
            </div>
        </>
    );
}
