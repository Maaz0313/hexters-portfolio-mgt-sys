import { useEffect, useState } from 'react';
import DesktopHeader from './components/DesktopHeader';
import Footer from './components/Footer';
import MobileHeader from './components/MobileHeader';
import ProgressBar from './components/ProgressBar';
import SearchBar from './components/SearchBar';

interface LayoutProps {
    children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
    const [isNavigating, setIsNavigating] = useState<boolean>(false);

    const toggleSearch = (force?: boolean) => {
        setIsSearchVisible((prev) => (force !== undefined ? force : !prev));
    };

    // Set up navigation event listeners for the progress bar
    useEffect(() => {
        function handleStart() {
            setIsNavigating(true);
        }

        function handleComplete() {
            setIsNavigating(false);
        }

        // Add event listeners
        document.addEventListener('inertia:start', handleStart);
        document.addEventListener('inertia:finish', handleComplete);
        document.addEventListener('inertia:cancel', handleComplete);
        document.addEventListener('inertia:error', handleComplete);

        return () => {
            // Clean up event listeners
            document.removeEventListener('inertia:start', handleStart);
            document.removeEventListener('inertia:finish', handleComplete);
            document.removeEventListener('inertia:cancel', handleComplete);
            document.removeEventListener('inertia:error', handleComplete);
        };
    }, []);

    return (
        <div className="relative">
            <ProgressBar isAnimating={isNavigating} />
            <DesktopHeader toggleSearch={toggleSearch} />
            <MobileHeader toggleSearch={toggleSearch} isSearchVisible={isSearchVisible} />
            <SearchBar isVisible={isSearchVisible} toggleSearch={toggleSearch} />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;
