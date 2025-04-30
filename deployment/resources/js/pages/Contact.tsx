import React, { ReactNode } from "react";
import Option from "../components/Option";
import { Head } from '@inertiajs/react';
import Layout from '@/Layout';

// Define interface for PortfolioLayout props
interface PortfolioLayoutProps {
  children: ReactNode;
  title?: string;
}

// Define a local PortfolioLayout component
const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({ children, title }) => {
  return (
    <>
      {title && <Head title={title} />}
      <Layout>{children}</Layout>
    </>
  );
};

const Contact = () => {
  const messengerIcon = () => (
    <svg
      className="grid size-6 shrink-0 appearance-none place-content-center"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <radialGradient
        id="8O3wK6b5ASW2Wn6hRCB5xa_YFbzdUk7Q3F8_gr1"
        cx="11.087"
        cy="7.022"
        r="47.612"
        gradientTransform="matrix(1 0 0 -1 0 50)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#1292ff"></stop>
        <stop offset=".079" stopColor="#2982ff"></stop>
        <stop offset=".23" stopColor="#4e69ff"></stop>
        <stop offset=".351" stopColor="#6559ff"></stop>
        <stop offset=".428" stopColor="#6d53ff"></stop>
        <stop offset=".754" stopColor="#df47aa"></stop>
        <stop offset=".946" stopColor="#ff6257"></stop>
      </radialGradient>
      <path
        fill="url(#8O3wK6b5ASW2Wn6hRCB5xa_YFbzdUk7Q3F8_gr1)"
        d="M44,23.5C44,34.27,35.05,43,24,43c-1.651,0-3.25-0.194-4.784-0.564 c-0.465-0.112-0.951-0.069-1.379,0.145L13.46,44.77C12.33,45.335,11,44.513,11,43.249v-4.025c0-0.575-0.257-1.111-0.681-1.499 C6.425,34.165,4,29.11,4,23.5C4,12.73,12.95,4,24,4S44,12.73,44,23.5z"
      ></path>
      <path
        fill="#fff"
        d="M34.394,18.501l-5.7,4.22c-0.61,0.46-1.44,0.46-2.04,0.01L22.68,19.74 c-1.68-1.25-4.06-0.82-5.19,0.94l-1.21,1.89l-4.11,6.68c-0.6,0.94,0.55,2.01,1.44,1.34l5.7-4.22c0.61-0.46,1.44-0.46,2.04-0.01 l3.974,2.991c1.68,1.25,4.06,0.82,5.19-0.94l1.21-1.89l4.11-6.68C36.434,18.901,35.284,17.831,34.394,18.501z"
      ></path>
    </svg>
  );

  const telephoneIcon = () => (
    <svg
      className="grid size-6 shrink-0 appearance-none place-content-center"
      height="800px"
      width="800px"
      version="1.1"
      id="_x32_"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      fill="#6559ff"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <style type="text/css">{`.st0 { fill: #6559ff; }`}</style>
        <g>
          <path
            className="st0"
            d="M94.811,21.696c-35.18,22.816-42.091,94.135-28.809,152.262c10.344,45.266,32.336,105.987,69.42,163.165
          c34.886,53.79,83.557,102.022,120.669,129.928c47.657,35.832,115.594,58.608,150.774,35.792
          c17.789-11.537,44.218-43.058,45.424-48.714c0,0-15.498-23.896-18.899-29.14l-51.972-80.135
          c-3.862-5.955-28.082-0.512-40.386,6.457c-16.597,9.404-31.882,34.636-31.882,34.636c-11.38,6.575-20.912,0.024-40.828-9.142
          c-24.477-11.262-51.997-46.254-73.9-77.947c-20.005-32.923-40.732-72.322-41.032-99.264
          c-0.247-21.922-2.341-33.296,8.304-41.006c0,0,29.272-3.666,44.627-14.984c11.381-8.392,26.228-28.286,22.366-34.242
          l-51.972-80.134c-3.401-5.244-18.899-29.14-18.899-29.14C152.159-1.117,112.6,10.159,94.811,21.696z"
          />
        </g>
      </g>
    </svg>
  );

  const mailIcon = () => (
    <svg
      className="grid size-6 shrink-0 appearance-none place-content-center"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      {/* <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
      <path
        fill="#FFD43B"
        d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
      />
    </svg>
  );
  const options = [
    {
      text: "Chat with us on Messenger",
      icon: messengerIcon,
      href: "https://www.messenger.com/t/374430925746254/",
      target: "_blank",
    },
    {
      text: "Call us",
      icon: telephoneIcon,
      href: "tel:+923118465596",
      target: "_self",
    },
    {
      text: "Send us an email",
      icon: mailIcon,
      href: "mailto:hi@hexters.com",
      target: "_blank",
    },
  ];
  return (
    <PortfolioLayout title="Contact Us">
      {/* Banner section starts */}
      <section className="my-auto container flex flex-nowrap items-center max-lg:min-h-[540px] max-[1023px]:flex-col-reverse max-[1023px]:p-8 lg:flex-row lg:justify-between">
        <div className="flex flex-col max-[1023px]:items-center max-[1023px]:px-0 max-[1023px]:py-8 max-[1023px]:text-center">
          <h1 className="mb-12 text-[45px]/none font-medium text-[#18161a] md:text-[67px]/none">
            Let's create something special together
          </h1>
          <div className="max-w-[245px] font-mono text-base font-medium">
            <p className="mb-2">Choose from the options below or call us on</p>
            <a href="tel:+923118465596">
              <h3 className="text-[34px]/10 font-poppins font-medium underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] delay-0 duration-[.4s] ease-[ease] hover:decoration-[#300a44] hover:duration-[.2s]">
                3118 465 596
              </h3>
            </a>
          </div>
        </div>
        <div>
          <img
            className="size-auto max-w-[600px] max-[1023px]:max-w-[325px]"
            src="/contact-header.webp"
            alt="Contact us"
          />
        </div>
      </section>
      {/* Banner section ends */}
      {/* Contact options section starts */}
      <section className="pb-20 pt-12">
        <div className="container">
          <div className="relative h-full rounded-3xl border border-[#E8E0E5] bg-white">
            <div className="p-14 md:p-20">
              <h3 className="mb-6 text-[26px] font-semibold leading-[1.08] text-[#18161a] md:text-[37px]">
                Get in touch
              </h3>
              <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
                {options.map((opt, index) => (
                  <Option
                    key={index}
                    text={opt.text}
                    Icon={opt.icon}
                    href={opt.href}
                    target={opt.target}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact options section ends */}
    </PortfolioLayout>
  );
};

export default Contact;

