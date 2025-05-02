import { useState } from 'react';
import { Link } from '@inertiajs/react';
import TextualLogo from './TextualLogo';

const MobileHeader = ({ toggleSearch }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = !isOpen ? 'hidden' : '';
    };

    const closeMenu = () => {
        setIsOpen(false);
        document.body.style.overflow = '';
    };

    return (
        <header className="relative z-50 flex h-[70px] items-center justify-between bg-[#f5f5f5] px-4 text-[#0a2550] lg:hidden">
            <Link href={route('home')} className="flex items-center">
                <div className="flex items-center">
                    <img src="/images/logos/logo white.png" alt="Hexters Logo" width={30} height={30} className="mr-3 block dark:hidden" />
                    <img src="/images/logos/logo black.png" alt="Hexters Logo" width={30} height={30} className="mr-3 hidden dark:block" />
                    <TextualLogo size="md" showTagline={false} />
                </div>
            </Link>

            <div className="flex items-center">
                <button onClick={toggleSearch} className="mr-4 p-2 cursor-pointer">
                    <svg
                        className="block"
                        width="20px"
                        height="20px"
                        viewBox="0 0 10 10"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                    >
                        {/* <!-- Generator: Sketch 50.2 (55047) - http://www.bohemiancoding.com/sketch --> */}
                        <title>Search</title>
                        <desc>Created with Sketch.</desc>
                        <defs>
                            <path
                                d="M9.86328125,8.65232312 C9.95442718,8.74346884 10,8.85414546 10,8.98435358 C10,9.1145617 9.95442718,9.22523832 9.86328125,9.31638404 L9.31640625,9.86325773 C9.22526032,9.95440345 9.11458343,9.99997616 8.984375,9.99997616 C8.85416657,9.99997616 8.74348968,9.95440345 8.65234375,9.86325773 L6.69921875,7.91013739 C6.60807282,7.81899168 6.5625,7.70831505 6.5625,7.57810693 L6.5625,7.26560768 C5.83333343,7.83852288 5,8.12498063 4.0625,8.12498063 C3.3203125,8.12498063 2.63997406,7.9426895 2.02148438,7.57810693 C1.40299469,7.21352437 0.911458433,6.72198928 0.546875,6.10350107 C0.182291567,5.48501287 0,4.80467604 0,4.06249031 C0,3.32030458 0.182291567,2.63996776 0.546875,2.02147956 C0.911458433,1.40299135 1.40299469,0.91145626 2.02148438,0.546873696 C2.63997406,0.182291133 3.3203125,0 4.0625,0 C4.8046875,0 5.48502594,0.182291133 6.10351562,0.546873696 C6.72200531,0.91145626 7.21354157,1.40299135 7.578125,2.02147956 C7.94270843,2.63996776 8.125,3.32030458 8.125,4.06249031 C8.125,4.99998808 7.83854157,5.83331952 7.265625,6.56248435 L7.578125,6.56248435 C7.70833343,6.56248435 7.81901032,6.60805706 7.91015625,6.69920278 L9.86328125,8.65232312 Z M4.06249031,6.56248435 C4.5182183,6.56248435 4.93813917,6.45180743 5.32225294,6.2304539 C5.7063667,6.00910036 6.00910036,5.7063667 6.2304539,5.32225294 C6.45180743,4.93813917 6.56248435,4.5182183 6.56248435,4.06249031 C6.56248435,3.60676233 6.45180743,3.18684146 6.2304539,2.80272769 C6.00910036,2.41861393 5.7063667,2.11588027 5.32225294,1.89452673 C4.93813917,1.67317319 4.5182183,1.56249627 4.06249031,1.56249627 C3.60676233,1.56249627 3.18684146,1.67317319 2.80272769,1.89452673 C2.41861393,2.11588027 2.11588027,2.41861393 1.89452673,2.80272769 C1.67317319,3.18684146 1.56249627,3.60676233 1.56249627,4.06249031 C1.56249627,4.5182183 1.67317319,4.93813917 1.89452673,5.32225294 C2.11588027,5.7063667 2.41861393,6.00910036 2.80272769,6.2304539 C3.18684146,6.45180743 3.60676233,6.56248435 4.06249031,6.56248435 Z"
                                id="path-1"
                            ></path>
                        </defs>
                        <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Icon-/-UI-/-Search">
                                <mask id="mask-2" fill="white">
                                    <use xlinkHref="#path-1"></use>
                                </mask>
                                <use id="Search" fill="currentColor" xlinkHref="#path-1"></use>
                            </g>
                        </g>
                    </svg>
                </button>

                <button
                    className="flex h-10 w-10 items-center justify-center rounded-md p-2 focus:outline-none"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <svg
                        className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`fixed inset-0 z-50 flex flex-col bg-white transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{ top: '70px' }}
            >
                <div className="flex flex-1 flex-col overflow-y-auto p-4">
                    <nav className="flex flex-col space-y-1">
                        <Link
                            className="flex items-center px-0 py-7 text-2xl/8 font-semibold text-[#0a2550] hover:text-[#4ecdc4]"
                            href={route('services')}
                            onClick={closeMenu}
                        >
                            Services
                        </Link>
                        <Link
                            className="flex items-center px-0 py-7 text-2xl/8 font-semibold text-[#0a2550] hover:text-[#4ecdc4]"
                            href={route('portfolio')}
                            onClick={closeMenu}
                        >
                            Portfolio
                        </Link>
                        <Link className="flex items-center px-0 py-7 text-2xl/8 font-semibold text-[#0a2550] hover:text-[#4ecdc4]" href={route('blogs')} onClick={closeMenu}>
                            Blogs
                        </Link>
                        <Link className="flex items-center px-0 py-7 text-2xl/8 font-semibold text-[#0a2550] hover:text-[#4ecdc4]" href={route('about')} onClick={closeMenu}>
                            About
                        </Link>
                        <Link
                            className="flex items-center px-0 py-7 text-2xl/8 font-semibold text-[#0a2550] hover:text-[#4ecdc4]"
                            href={route('contact')}
                            onClick={closeMenu}
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default MobileHeader;
