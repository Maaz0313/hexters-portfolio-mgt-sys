import React from "react";

const Footer = () => {
  return (
    <section className="bg-[#300a44] px-0 py-16 text-sm/[1.375] md:text-base/normal">
      <div className="container">
        <div className="mb-14">
          <a aria-current="page" href="/">
            <img
              src="https://www.luminary.com/_astro/luminary-logo-full-inline-white.CknDasue_1EQAc7.svg"
              alt="Luminary Digital"
              width="235"
              height="45"
              loading="lazy"
              decoding="async"
            />
          </a>
        </div>
        <div className="grid grid-flow-row max-[1219px]:[row-gap:32px] md:grid-cols-[repeat(12,1fr)] lg:[grid-column-gap:24px]">
          <div className="col-[span_6] md:col-[span_4]">
            <div>
              <div className="mb-4 text-sm font-semibold leading-tight text-white md:text-base">
                Follow
              </div>
              <div className="space-y-2">
                <div>
                  <a
                    className="flex items-center text-white underline decoration-white decoration-2 underline-offset-4 outline-hidden transition-[text-decoration-color] delay-0 duration-[.4s] ease-[ease] hover:decoration-transparent hover:transition-[text-decoration-color] hover:delay-0 hover:duration-[.2s] hover:ease-[ease]"
                    href="https://www.facebook.com/profile.php?id=61561499371019"
                  >
                    <div className="mr-2 text-white size-4">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16 8.77734C16 4.35906 12.4183 0.777344 8 0.777344C3.58172 0.777344 0 4.35906 0 8.77734C0 12.7703 2.92547 16.08 6.75 16.6802V11.0898H4.71875V8.77734H6.75V7.01484C6.75 5.00984 7.94438 3.90234 9.77172 3.90234C10.6467 3.90234 11.5625 4.05859 11.5625 4.05859V6.02734H10.5538C9.56 6.02734 9.25 6.64406 9.25 7.27734V8.77734H11.4688L11.1141 11.0898H9.25V16.6802C13.0745 16.08 16 12.7703 16 8.77734Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <span>Facebook</span>
                  </a>
                </div>
                <div>
                  <a
                    className="flex items-center text-white underline decoration-white decoration-2 underline-offset-4 outline-hidden transition-[text-decoration-color] delay-0 duration-[.4s] ease-[ease] hover:decoration-transparent hover:transition-[text-decoration-color] hover:delay-0 hover:duration-[.2s] hover:ease-[ease]"
                    href="https://www.x.com/HeXters"
                  >
                    <div className="mr-2 text-white size-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 300 300.251"
                        fill="currentColor"
                      >
                        <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59H300M36.01 19.54h40.65l187.13 262.13h-40.66"></path>
                      </svg>
                    </div>
                    <span>X.com</span>
                  </a>
                </div>
                <div>
                  <a
                    className="flex items-center text-white underline decoration-white decoration-2 underline-offset-4 outline-hidden transition-[text-decoration-color] delay-0 duration-[.4s] ease-[ease] hover:decoration-transparent hover:transition-[text-decoration-color] hover:delay-0 hover:duration-[.2s] hover:ease-[ease]"
                    href="https://www.linkedin.com/company/HeXters/"
                  >
                    <div className="mr-2 text-white size-4">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.8156 0.777344H1.18125C0.528125 0.777344 0 1.29297 0 1.93047V15.6211C0 16.2586 0.528125 16.7773 1.18125 16.7773H14.8156C15.4688 16.7773 16 16.2586 16 15.6242V1.93047C16 1.29297 15.4688 0.777344 14.8156 0.777344ZM4.74687 14.4117H2.37188V6.77422H4.74687V14.4117ZM3.55938 5.73359C2.79688 5.73359 2.18125 5.11797 2.18125 4.35859C2.18125 3.59922 2.79688 2.98359 3.55938 2.98359C4.31875 2.98359 4.93437 3.59922 4.93437 4.35859C4.93437 5.11484 4.31875 5.73359 3.55938 5.73359ZM13.6344 14.4117H11.2625V10.6992C11.2625 9.81484 11.2469 8.67422 10.0281 8.67422C8.79375 8.67422 8.60625 9.63984 8.60625 10.6367V14.4117H6.2375V6.77422H8.5125V7.81797H8.54375C8.85938 7.21797 9.63438 6.58359 10.7875 6.58359C13.1906 6.58359 13.6344 8.16484 13.6344 10.2211V14.4117Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <span>LinkedIn</span>
                  </a>
                </div>
                <div>
                  <a
                    className="flex items-center text-white underline decoration-white decoration-2 underline-offset-4 outline-hidden transition-[text-decoration-color] delay-0 duration-[.4s] ease-[ease] hover:decoration-transparent hover:transition-[text-decoration-color] hover:delay-0 hover:duration-[.2s] hover:ease-[ease]"
                    href="https://www.instagram.com/hexters2010/"
                  >
                    <div className="mr-2 text-white size-4">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.70313 0.824219C5.55625 0.786719 5.82813 0.777344 8 0.777344C10.1719 0.777344 10.4438 0.786719 11.3 0.827344C12.15 0.864844 12.7313 1.00234 13.2406 1.19922C13.7656 1.40234 14.2125 1.67734 14.6563 2.12109C15.1031 2.56484 15.375 3.01172 15.5719 3.54297C15.7688 4.04922 15.9063 4.63359 15.9438 5.48359C15.9813 6.33672 15.9906 6.60859 15.9906 8.78047C15.9906 10.9523 15.9813 11.2242 15.9438 12.0773C15.9063 12.9273 15.7688 13.5086 15.5719 14.018C15.3688 14.543 15.0938 14.9898 14.65 15.4336C14.2063 15.8773 13.7594 16.1523 13.2344 16.3555C12.7281 16.5523 12.1438 16.6898 11.2938 16.7273C10.4406 16.7648 10.1688 16.7742 7.99688 16.7742C5.825 16.7742 5.55313 16.7648 4.7 16.7273C3.85 16.6898 3.26875 16.5523 2.75938 16.3555C2.23438 16.1523 1.7875 15.8773 1.34375 15.4336C0.896875 14.9898 0.625 14.543 0.41875 14.0148C0.221875 13.5086 0.084375 12.9242 0.046875 12.0742C0.009375 11.2211 0 10.9492 0 8.77734C0 6.60547 0.009375 6.33359 0.046875 5.47734C0.084375 4.62734 0.221875 4.04609 0.41875 3.53672C0.625 3.01172 0.896875 2.56484 1.34375 2.12109C1.7875 1.67422 2.23438 1.40234 2.7625 1.19609C3.26875 0.999219 3.85313 0.861719 4.70313 0.824219ZM8 4.66797C5.73125 4.66797 3.89062 6.50859 3.89062 8.77734C3.89062 11.0461 5.73125 12.8867 8 12.8867C10.2688 12.8867 12.1094 11.0461 12.1094 8.77734C12.1094 6.50859 10.2688 4.66797 8 4.66797ZM8 11.443C6.52813 11.443 5.33437 10.2492 5.33437 8.77734C5.33437 7.30547 6.52813 6.11172 8 6.11172C9.47188 6.11172 10.6656 7.30547 10.6656 8.77734C10.6656 10.2492 9.47188 11.443 8 11.443ZM12.2719 5.46481C12.8 5.46481 13.2312 5.03669 13.2312 4.50544C13.2312 3.97731 12.8 3.54606 12.2719 3.54606C11.7438 3.54606 11.3125 3.97419 11.3125 4.50544C11.3125 5.03356 11.7406 5.46481 12.2719 5.46481Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-[span_6] md:col-[span_4]">
            <div>
              <div className="mb-4 text-sm font-semibold leading-tight text-white md:text-base">
                Contact Us
              </div>
              <div className="space-y-2">
                <div>
                  <a
                    className="flex items-center text-white underline decoration-white decoration-2 underline-offset-4 outline-hidden transition-[text-decoration-color] delay-0 duration-[.4s] ease-[ease] hover:decoration-transparent hover:transition-[text-decoration-color] hover:delay-0 hover:duration-[.2s] hover:ease-[ease]"
                    href="tel:+923118465596"
                  >
                    <div className="mr-2 text-white size-4">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.3 14.7773C11.8667 14.7773 10.4694 14.4579 9.10833 13.819C7.74722 13.1801 6.54167 12.3357 5.49167 11.2857C4.44167 10.2357 3.59722 9.03012 2.95833 7.66901C2.31944 6.3079 2 4.91068 2 3.47734C2 3.27734 2.06667 3.11068 2.2 2.97734C2.33333 2.84401 2.5 2.77734 2.7 2.77734H5.4C5.55556 2.77734 5.69444 2.82734 5.81667 2.92734C5.93889 3.02734 6.01111 3.15512 6.03333 3.31068L6.46667 5.64401C6.48889 5.79957 6.48611 5.94123 6.45833 6.06901C6.43056 6.19679 6.36667 6.31068 6.26667 6.41068L4.66667 8.04401C5.13333 8.84401 5.71667 9.59401 6.41667 10.294C7.11667 10.994 7.88889 11.5996 8.73333 12.1107L10.3 10.544C10.4 10.444 10.5306 10.369 10.6917 10.319C10.8528 10.269 11.0111 10.2551 11.1667 10.2773L13.4667 10.744C13.6222 10.7773 13.75 10.8523 13.85 10.969C13.95 11.0857 14 11.2218 14 11.3773V14.0773C14 14.2773 13.9333 14.444 13.8 14.5773C13.6667 14.7107 13.5 14.7773 13.3 14.7773Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <span>+92 311 846 5596</span>
                  </a>
                </div>
                <div>
                  <a
                    className="flex items-center text-white underline decoration-white decoration-2 underline-offset-4 outline-hidden transition-[text-decoration-color] delay-0 duration-[.4s] ease-[ease] hover:decoration-transparent hover:transition-[text-decoration-color] hover:delay-0 hover:duration-[.2s] hover:ease-[ease]"
                    href="mailto:hexters2010@gmail.com"
                  >
                    <div className="mr-2 text-white size-4">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.66666 14.111C2.29999 14.111 1.98611 13.9804 1.72499 13.7193C1.46388 13.4582 1.33333 13.1443 1.33333 12.7777V4.77767C1.33333 4.411 1.46388 4.09711 1.72499 3.836C1.98611 3.57489 2.29999 3.44434 2.66666 3.44434H13.3333C13.7 3.44434 14.0139 3.57489 14.275 3.836C14.5361 4.09711 14.6667 4.411 14.6667 4.77767V12.7777C14.6667 13.1443 14.5361 13.4582 14.275 13.7193C14.0139 13.9804 13.7 14.111 13.3333 14.111H2.66666ZM8 9.32767C8.05555 9.32767 8.11388 9.31934 8.17499 9.30267C8.23611 9.286 8.29444 9.261 8.35 9.22767L13.0667 6.27767C13.1556 6.22211 13.2222 6.15267 13.2667 6.06934C13.3111 5.986 13.3333 5.89434 13.3333 5.79434C13.3333 5.57211 13.2389 5.40545 13.05 5.29434C12.8611 5.18322 12.6667 5.18878 12.4667 5.311L8 8.111L3.53333 5.311C3.33333 5.18878 3.13888 5.186 2.94999 5.30267C2.76111 5.41934 2.66666 5.58322 2.66666 5.79434C2.66666 5.90545 2.68888 6.00267 2.73333 6.086C2.77777 6.16934 2.84444 6.23322 2.93333 6.27767L7.65 9.22767C7.70555 9.261 7.76388 9.286 7.825 9.30267C7.88611 9.31934 7.94444 9.32767 8 9.32767Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <span>hi@luminary.com</span>
                  </a>
                </div>
                <div>
                  <a
                    className="flex items-center text-white underline decoration-white decoration-2 underline-offset-4 outline-hidden transition-[text-decoration-color] delay-0 duration-[.4s] ease-[ease] hover:decoration-transparent hover:transition-[text-decoration-color] hover:delay-0 hover:duration-[.2s] hover:ease-[ease]"
                    href="/our-locations"
                  >
                    <div className="mr-2 text-white size-4">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.33333 14.7773C2.96667 14.7773 2.65278 14.6468 2.39167 14.3857C2.13056 14.1246 2 13.8107 2 13.444V6.77734C2 6.41068 2.13056 6.09679 2.39167 5.83568C2.65278 5.57457 2.96667 5.44401 3.33333 5.44401H4.66667V4.11068C4.66667 3.74401 4.79722 3.43012 5.05833 3.16901C5.31944 2.9079 5.63333 2.77734 6 2.77734H10C10.3667 2.77734 10.6806 2.9079 10.9417 3.16901C11.2028 3.43012 11.3333 3.74401 11.3333 4.11068V8.11068H12.6667C13.0333 8.11068 13.3472 8.24123 13.6083 8.50234C13.8694 8.76346 14 9.07734 14 9.44401V13.444C14 13.8107 13.8694 14.1246 13.6083 14.3857C13.3472 14.6468 13.0333 14.7773 12.6667 14.7773H8.66667V12.1107H7.33333V14.7773H3.33333ZM3.33333 13.444H4.66667V12.1107H3.33333V13.444ZM3.33333 10.7773H4.66667V9.44401H3.33333V10.7773ZM3.33333 8.11068H4.66667V6.77734H3.33333V8.11068ZM6 10.7773H7.33333V9.44401H6V10.7773ZM6 8.11068H7.33333V6.77734H6V8.11068ZM6 5.44401H7.33333V4.11068H6V5.44401ZM8.66667 10.7773H10V9.44401H8.66667V10.7773ZM8.66667 8.11068H10V6.77734H8.66667V8.11068ZM8.66667 5.44401H10V4.11068H8.66667V5.44401ZM11.3333 13.444H12.6667V12.1107H11.3333V13.444ZM11.3333 10.7773H12.6667V9.44401H11.3333V10.7773Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <span>Our locations</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-[span_6] md:col-[span_4]">
            <div>
              <div className="mb-4 text-sm font-semibold leading-tight text-white md:text-base">
                Stay informed
              </div>
              <div className="space-y-2">
                <div className="text-white">
                  Our best articles, observations and news delivered to your
                  inbox
                </div>
                <a
                  className="inline-flex items-center gap-3 mt-4 btn-white"
                  href=""
                >
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.66666 14.111C2.29999 14.111 1.98611 13.9804 1.72499 13.7193C1.46388 13.4582 1.33333 13.1443 1.33333 12.7777V4.77767C1.33333 4.411 1.46388 4.09711 1.72499 3.836C1.98611 3.57489 2.29999 3.44434 2.66666 3.44434H13.3333C13.7 3.44434 14.0139 3.57489 14.275 3.836C14.5361 4.09711 14.6667 4.411 14.6667 4.77767V12.7777C14.6667 13.1443 14.5361 13.4582 14.275 13.7193C14.0139 13.9804 13.7 14.111 13.3333 14.111H2.66666ZM8 9.32767C8.05555 9.32767 8.11388 9.31934 8.17499 9.30267C8.23611 9.286 8.29444 9.261 8.35 9.22767L13.0667 6.27767C13.1556 6.22211 13.2222 6.15267 13.2667 6.06934C13.3111 5.986 13.3333 5.89434 13.3333 5.79434C13.3333 5.57211 13.2389 5.40545 13.05 5.29434C12.8611 5.18322 12.6667 5.18878 12.4667 5.311L8 8.111L3.53333 5.311C3.33333 5.18878 3.13888 5.186 2.94999 5.30267C2.76111 5.41934 2.66666 5.58322 2.66666 5.79434C2.66666 5.90545 2.68888 6.00267 2.73333 6.086C2.77777 6.16934 2.84444 6.23322 2.93333 6.27767L7.65 9.22767C7.70555 9.261 7.76388 9.286 7.825 9.30267C7.88611 9.31934 7.94444 9.32767 8 9.32767Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  Subscribe
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-t-[#E8E4D5] pt-8">
          <div className="flex flex-wrap -mx-3 text-white">
            <div className="order-2 w-full px-3 py-0 mt-8 text-center">
              <p>
                Luminary is a registered trademark of Luminary Digital Pty Ltd
              </p>
            </div>
            <div className="flex flex-wrap justify-center order-1 w-full px-3 py-0 space-x-8">
              <div>
                <a
                  className="text-white underline decoration-white decoration-2 underline-offset-4 outline-hidden transition-[text-decoration-color] delay-0 duration-[.4s] ease-[ease] hover:decoration-transparent hover:transition-[text-decoration-color] hover:delay-0 hover:duration-[.2s] hover:ease-[ease]"
                  href="/terms-of-service"
                >
                  Terms of Services
                </a>
              </div>
              <div>
                <a
                  className="text-white underline decoration-white decoration-2 underline-offset-4 outline-hidden transition-[text-decoration-color] delay-0 duration-[.4s] ease-[ease] hover:decoration-transparent hover:transition-[text-decoration-color] hover:delay-0 hover:duration-[.2s] hover:ease-[ease]"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;

