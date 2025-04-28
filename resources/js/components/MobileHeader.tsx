import React, { useState } from "react";

const MobileHeader = ({ toggleSearch }: any) => {
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState<boolean>(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuVisible((prev) => !prev);
  };

  return (
    <header className="block h-[84px] lg:hidden">
      <div className="h-full [box-shadow:0_1px_2px_#0000004d]">
        <div className="mx-auto flex h-full min-h-12 w-full max-w-[1220px] items-center justify-between px-6 py-0">
          <a className="shrink-0" href="/">
            <img src="/logo.svg" alt="logo" width={105} />
          </a>
          <div className="flex items-center justify-evenly gap-6 [flex-flow:row]">
            <a
              className="flex items-center gap-2 cta-btn max-md:invisible max-md:hidden"
              href="/contact"
            >
              Contact Us
            </a>
            <button
              onClick={toggleSearch}
              className="flex h-12 cursor-pointer items-center border-none bg-transparent p-3 leading-[0] text-[#4716ed]"
            >
              <svg
                className="block size-4 text-[#300a44]"
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
                <g
                  id="Symbols"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g id="Icon-/-UI-/-Search">
                    <mask id="mask-2" fill="white">
                      <use xlinkHref="#path-1"></use>
                    </mask>
                    <use
                      id="Search"
                      fill="currentColor"
                      xlinkHref="#path-1"
                    ></use>
                  </g>
                </g>
              </svg>
            </button>
            <button
              onClick={toggleMobileMenu}
              className="order-1 cursor-pointer mr-4 flex h-12 items-center gap-2 text-[#300a44]"
            >
              <svg
                className="size-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M0,12 L18,12 L18,10.0000313 L0,10.0000313 L0,12 L0,12 Z M0,7.00003125 L18,7.00003125 L18,5.00001563 L0,5.00001563 L0,7.00003125 L0,7.00003125 Z M0,0 L0,1.99992187 L18,1.99992187 L18,0 L0,0 L0,0 Z"
                  transform="translate(3 6)"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`z-[4] ${isMobileMenuVisible ? `visible block [transform:translate3d(-100%,0,0)]` : `invisible`} fixed inset-[0_0_0_100%] w-full bg-white [transition:transform_.5s_cubic-bezier(.165,.84,.44,1),visibility_.3s_ease]`}
      >
        <div className="mx-auto flex w-full max-w-[1220px] flex-col p-6">
          <button
            onClick={toggleMobileMenu}
            className="-mr-5 flex size-12 items-center self-end text-[#300a44]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <polygon
                fill="currentColor"
                fillRule="evenodd"
                points="13.969 1.397 12.572 0 6.984 5.588 1.397 0 0 1.397 5.588 6.984 0 12.572 1.397 13.969 6.984 8.381 12.572 13.969 13.969 12.572 8.381 6.984"
                transform="translate(5.016 5.016)"
              ></polygon>
            </svg>
          </button>
          <div>
            <div className="flex flex-col">
              <div className="flex flex-col items-center">
                <div className="w-full">
                  <div className="[border:unset]">
                    <a
                      href="/services"
                      className="group flex min-h-12 w-full cursor-pointer items-center justify-between px-0 py-6 text-base/[1.375] font-bold text-black no-underline underline-offset-4 [transition:text-decoration-color_.2s_ease_0s] hover:underline hover:decoration-[#6c45f1] hover:outline-0"
                    >
                      <span className="text-2xl/8 font-semibold text-[#18161a] group-hover:text-[#4716ed]">
                        Services
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <nav className="flex flex-col">
                <a
                  className="flex items-center px-0 py-7 text-2xl/8 font-semibold text-[#18161a] hover:text-[#4716ed]"
                  href="/blogs"
                >
                  Insights
                </a>
                <a
                  className="flex items-center px-0 py-7 text-2xl/8 font-semibold text-[#18161a] hover:text-[#4716ed]"
                  href="/about"
                >
                  About
                </a>
              </nav>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-2">
            <div className="flex min-w-[150px] items-center md:hidden">
              <a className="flex cta-btn md:hidden" href="/contact">
                Contact US
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <polygon
                    fill="currentColor"
                    fillRule="evenodd"
                    points="0 9.018 12.174 9.018 6.563 14.629 8.016 16.031 16.031 8.016 8.016 0 6.613 1.403 12.174 7.014 0 7.014"
                    transform="translate(3.984 3.984)"
                  ></polygon>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;

