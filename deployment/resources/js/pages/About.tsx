import { useState } from "react";
import VideoOverlay from "../components/VideoOverlay";
import PortfolioLayout from '@/layouts/portfolio-layout';
import { Head } from '@inertiajs/react';

const About = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };
  return (
    <PortfolioLayout title="About Us">
      {/* Hero section starts */}
      <section className="relative overflow-hidden bg-[#300a44] py-16 md:py-20">
        <div className="container relative z-2">
          <div className="min-[1220px]:grid min-[1220px]:grid-flow-row min-[1220px]:grid-cols-12 min-[1220px]:[grid-column-gap:1.5rem] min-[1220px]:items-center">
            {/* Video Container */}
            <div className="relative my-8 flex min-h-[420px] w-full items-center justify-center bg-[#18161a] min-[1220px]:col-[span_7] min-[1220px]:min-h-[508px]">
              <div className="absolute inset-0 bg-[url(https://img.youtube.com/vi/QtN10Eb3U0o/maxresdefault.jpg?h=503&fm=webp)] bg-cover bg-center opacity-50" />
              {/* Button Container */}
              <div className="relative flex content-center justify-center w-full">
                <button
                  className="btn-white z-2 m-auto"
                  onClick={toggleOverlay}
                >
                  &#9655; Watch our showreel
                </button>
              </div>
            </div>
            <div className="min-[1220px]:col-[span_5]">
              <h1 className="mb-6 text-[67px]/none font-medium text-white">
                We are Luminary
              </h1>
              <p className="mb-6 text-white">
                <strong>Luminary</strong> (n). One who has attained eminence in
                their field. One who inspires. Luminary supports, protects and
                guides the way.
              </p>
            </div>
          </div>
        </div>
        <VideoOverlay
          isOverlayVisible={isOverlayVisible}
          toggleOverlay={toggleOverlay}
        />
      </section>
      {/* Hero section ends */}
      {/* About section starts */}
      <section className="py-16 md:py-20">
        <div className="container md:grid md:grid-flow-row md:grid-cols-[repeat(12,1fr)] md:[grid-column-gap:24px]">
          <div className="md:col-[3/span_8]">
            <h6 className="font-mono text-[0.688rem]/[1.5] font-bold text-[#4716ed] md:text-xs/[1.375]">
              About Us
            </h6>
            <div className="mt-8 space-y-4 md:mt-12">
              <h3 className="text-xl/[1.1] font-semibold text-[#18161a] md:text-2xl/[1.08]">
                We’re an award-winning independent digital agency.
              </h3>
              <p className="font-light">
                With a portfolio that includes some of the most well-known names
                in the Australian government, retail and corporate sectors, our
                offering includes strategy, discovery, SEO, data analytics,
                content strategy, UX design, digital design, product design,
                digital transformation, website and web app development, QA, and
                ongoing support and maintenance. We specialise in the
                implementation of mid to large-scale digital projects across
                leading DXP, CMS and headless platforms including Kentico,
                Kontent.ai, Optimizely, Sitecore and Umbraco.{" "}
              </p>
              <p className="font-light">
                Our experience covers a broad range of industries, including
                automotive, charities and NFPs, education, e-commerce and retail,
                financial services, government, health, manufacturing,
                professional services, property and construction, and tourism and
                hospitality.
              </p>
              <p className="font-light">
                We’ve been in business since 1999, so we’ve seen the industry
                evolve, riding the waves of growth and adaptation. Experience is a
                hallmark of our offering, both in terms of the experience we hold,
                and the experiences we create. We bring together some of the
                brightest minds in digital to craft experiences that are
                intuitive, engaging, impactful and enlightening.{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* About section ends */}
      {/* Mission sections starts */}
      <section className="py-16 md:py-20">
        <div className="container md:grid md:grid-flow-row md:grid-cols-[repeat(12,1fr)] md:[grid-column-gap:24px]">
          <div className="md:col-[3/span_8]">
            <h6 className="font-mono text-[0.688rem]/[1.5] font-bold text-[#4716ed] md:text-xs/[1.375]">
              Our Mission
            </h6>
            <div className="mt-8 space-y-4 md:mt-12">
              <h3 className="text-xl/[1.1] font-semibold text-[#18161a] md:text-2xl/[1.08]">
                To make digital bright and the human experience brighter.
              </h3>
              <p className="font-light">
                What does this mean? It means making the websites we build perform
                quickly and flawlessly. It means helping our clients navigate
                stakeholder sign-offs so they can win at their jobs and go home
                happy. It means giving our team the freedom to work in a way that
                works for them. It means creating beautiful, functional digital
                products while committing to carbon neutrality.
              </p>
              <p className="font-light">
                Ultimately, it means creating experiences that excite and inspire.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Mission sections ends */}
      {/* Our Values section starts */}
      <section className="relative overflow-hidden bg-[#4716ed] py-16 md:py-20">
        <div className="container relative z-2 text-white">
          <h5 className="relative mb-6 text-xs/[1.375] font-semibold">
            Who we are
          </h5>
          <div className="grid w-full grid-flow-row grid-cols-2 gap-[32px_0] md:gap-[96px_24px]">
            <div className="col-span-2 text-base font-light md:col-span-1 md:text-[1.313rem]/[1.375]">
              <h2 className="mb-4 text-[1.625rem] font-normal leading-[1.08] md:text-[2.313rem]">
                Real
              </h2>
              <p className="font-light">
                We're authentic and down-to-earth, true to ourselves and honest to
                our clients. We say what we'll do, and we do what we say.
              </p>
            </div>
            <div className="col-span-2 text-base font-light md:col-span-1 md:text-[1.313rem]/[1.375]">
              <h2 className="mb-4 text-[1.625rem] font-normal leading-[1.08] md:text-[2.313rem]">
                Solid
              </h2>
              <p className="font-light">
                We've been in the business since 1999. Everything we say and do is
                backed by solid experience and proven results.
              </p>
            </div>
            <div className="col-span-2 text-base font-light md:col-span-1 md:text-[1.313rem]/[1.375]">
              <h2 className="mb-4 text-[1.625rem] font-normal leading-[1.08] md:text-[2.313rem]">
                Human
              </h2>
              <p className="font-light">
                We put people first every time – in our business and our work.
                Creating genuinely human-centered experiences is what drives us.
              </p>
            </div>
            <div className="col-span-2 text-base font-light md:col-span-1 md:text-[1.313rem]/[1.375]">
              <h2 className="mb-4 text-[1.625rem] font-normal leading-[1.08] md:text-[2.313rem]">
                Bright
              </h2>
              <p className="font-light">
                We aim to be the brightest minds in digital – intelligent,
                insightful and enlightening. We’re always looking for new ways to
                make a difference.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Our Values section ends */}
    </PortfolioLayout>
  );
};

export default About;

