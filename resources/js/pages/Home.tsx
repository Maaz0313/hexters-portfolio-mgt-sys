import React, { useEffect, useState } from 'react'
import VideoOverlay from '../components/VideoOverlay';
import { motion } from "framer-motion";
import StageItems from '../components/StageItem';
import Expertise from '../components/Expertise';
import BlogPostCard from '../components/BlogPostCard';
import PortfolioLayout from '@/layouts/portfolio-layout';
import { Head } from '@inertiajs/react';
const words = ["minds", "culture", "structure", "approach", "results"];

function useWordCycle(words, letterInterval = 100, pauseDuration = 2000) {
  const [index, setIndex] = useState(0);
  const [displayedLetters, setDisplayedLetters] = useState("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    let timer;
    if (isDeleting) {
      if (displayedLetters.length > 0) {
        timer = setTimeout(() => {
          setDisplayedLetters((prev) => prev.slice(0, -1));
        }, letterInterval);
      } else {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (displayedLetters.length < words[index].length) {
        timer = setTimeout(() => {
          setDisplayedLetters(
            words[index].slice(0, displayedLetters.length + 1),
          );
        }, letterInterval);
      } else {
        timer = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    }
    return () => clearTimeout(timer);
  }, [
    displayedLetters,
    isDeleting,
    index,
    words,
    letterInterval,
    pauseDuration,
  ]);

  return {
    displayedWord: displayedLetters,
    fullWord: words[index],
  };
}

const Home = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);
  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };
  const { displayedWord, fullWord } = useWordCycle(words);
  const postsData = [
    {
      href: "/blog/foundations-of-personalisation",
      imageSrc:
        "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/40747a78-7e30-4db5-976f-c4ad7a04496f/personalisation%20blog.jpeg?h=350&fm=webp",
      imageAlt:
        "Picture of seven bodies standing together to depict personalisation",
      readTime: "5",
      title: "Foundations of personalisation",
      excerpt:
        "In today's digital landscape, personalisation isn't just a buzzword; it's a strategic imperative.",
      authorImage:
        "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/755fee77-3e9e-42ca-9f92-e88b0de4efdc/Josh_thumb.jpg?w=90&h=90&fm=webp",
      authorName: "Josh Smith",
      date: "18 July 2024",
    },
    {
      href: "/blog/figma-releases-new-tools-at-figma-configapac-in-singapore",
      imageSrc:
        "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/d374e6f0-5596-4510-84ab-b23cda9b6226/Figma%20CONFIG.jpg?h=350&fm=webp",
      imageAlt: "Picture of the screen at Figma ConfigAPAC",
      readTime: "4",
      title: "Figma releases new tools at Figma Config APAC in Singapore",
      excerpt:
        "The passion and energy were contagious at Figma Config APAC, reminding us of the immense power of design to connect and inspire. As Figma Enterprise clients, Luminary hopes to further build upon the Figma community in Melbourne and Australia.",
      authorImage:
        "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/9cf8c468-76a6-48b9-8cf5-47f5f3165ce1/Thom_thumb.jpg?w=90&h=90&fm=webp",
      authorName: "Thom Bransom & Marty Drill",
      date: "16 July 2024",
    },
    {
      href: "/blog/luminary-turns-25",
      imageSrc:
        "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/1654369b-ceb5-49a1-98db-48e5cd1267b5/Melb%20team%20celebration%20-%201600%20x%20900.png?h=350&fm=webp",
      imageAlt:
        "Picture of the Luminary Australian team celebrating 25 years with confetti",
      readTime: "7",
      title: "Luminary turns 25",
      excerpt:
        "This wasn't a birthday we were going to let pass without a bang! We share a couple of exciting announcements about how we're marking our 25 years, and reminisce about our early days as an emerging digital agency.",
      authorImage:
        "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/d346f3bc-fbe2-401a-81e2-0a81b6ff7aaa/Claire_thumb.jpg?w=90&h=90&fm=webp",
      authorName: "Claire Dunton",
      date: "24 June 2024",
    },
  ];
  const guides = [
    {
      href: "/blog/how-to-choose-the-right-cms",
      imageSrc:
        "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/101e7fc0-41c8-43f6-90c5-fd2486694732/Choosing-the-right-CMS.png?h=350&fm=webp",
      imageAlt:
        "An image of a digital device with logos of various apps overlaid",
      readTime: "8",
      title: "How to choose the right CMS",
      excerpt:
        "You’ve decided you need a new Content Management System – but where do you start in deciding which one to go with? Here, we distill our learnings over the past two decades of advising clients on choosing digital platforms. We’ve even included a downloadable comparison matrix for you to rank contending CMS or DXP options.",
      authorImage:
        "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/83a52d8d-13c7-4380-8f15-7f24726983a6/Adam_thumb.jpg?w=90&h=90&fm=webp",
      authorName: "Adam Griffith",
      date: "29 July 2022",
    },
    {
      href: "/blog/choosing-a-martech-stack",
      imageSrc:
        "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/77610993-f9fa-4180-9727-4c14f50f64a1/Martech-Stack.png?h=350&fm=webp",
      imageAlt: "Toolbox with a number of digital apps and tools inside",
      readTime: "9",
      title: "Building a martech stack",
      excerpt:
        "Selecting a martech stack can be overwhelming. The right mix of products can be the make or break of an organisation’s digital strategy. Here, we share our insights and tips from many years of assisting clients with this daunting task. We also include our downloadable Martech Audit Matrix for you to audit your existing stack.",
      authorImage:
        "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/83a52d8d-13c7-4380-8f15-7f24726983a6/Adam_thumb.jpg?w=90&h=90&fm=webp",
      authorName: "Adam Griffith",
      date: "29 March 2022",
    },
    {
      href: "/blog/how-to-roadmap-your-digital-strategy",
      imageSrc:
        "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/6525c1ce-6128-4d69-8b63-1b4807fddcaa/Roadmap.jpg?h=350&fm=webp",
      imageAlt: "Digital Roadmap",
      readTime: "6",
      title: "How to create a digital strategy roadmap",
      excerpt:
        "A good strategic roadmap not only outlines what you want to achieve with your digital strategy, but sets out the detail of how you're going to get there. Here we provide guidance on how to do it, along with a downloadable Digital Roadmap Toolkit.",
      authorImage:
        "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/0ce53126-3ad8-4c99-a986-4041993d8e4b/Liam_thumb.jpg?w=90&h=90&fm=webp",
      authorName: "Liam Thomas",
      date: "01 February 2019",
    },
    {
      href: "/blog/how-to-do-a-content-audit-and-why-you-should",
      imageSrc:
        "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/21666b50-b807-44da-adf4-057438e6d157/Content%20Audit.jpg?h=350&fm=webp",
      imageAlt: "Content Audit",
      readTime: "10",
      title: "Why conducting a content audit is essential ",
      excerpt:
        "Performing a content audit is a crucial step in optimising a website's performance. It can help identify outdated or irrelevant content, identify content gaps, improve SEO efforts, enhance user experience, and save time and resources. ",
      authorImage:
        "https://assets-us-01.kc-usercontent.com/90e79cae-25c6-00b5-6f5b-27efe5c250ab/1c65b8af-9e2b-4796-bc14-12cf4aebce9c/Victoria_thumb.jpg?w=90&h=90&fm=webp",
      authorName: "Victoria Whatmore",
      date: "31 July 2023",
    },
  ];

  return (
    <PortfolioLayout title="Home">
      {/* Hero section starts */}
      <section className="relative overflow-hidden bg-orange-gradient md:py-20">
        <div className="mx-auto w-full max-w-[1220px] px-6 py-0">
          <div className="lg:grid lg:grid-flow-row lg:grid-cols-12 lg:gap-6">
            <div className="flex flex-col justify-center lg:col-[span_6]">
              <h1 className="mb-6 text-7xl font-bold leading-tight text-[#18161a] md:leading-none lg:leading-tight">
                Brighter digital experiences
              </h1>
              <p className="m-0 text-[21px]/[28.883px] font-light text-[#18161a]">
                A full service digital agency creating bright digital experiences
                for your customers and your organisation.
              </p>
              <div className="mt-8">
                <button
                  onClick={toggleOverlay}
                  aria-expanded={isOverlayVisible}
                  className="inline-flex cursor-pointer items-center gap-3 rounded-[80px] bg-[#300a44] px-6 py-4 font-medium text-white [box-shadow:0_6px_12px_#0000004d,0_1px_2px_#0000004d] [transition:all_.3s_ease-in-out] hover:bg-white hover:text-[#18161a]"
                >
                  <svg
                    className="shrink-0 size-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M19.494 10.917 6.444 3.15A.984.984 0 0 0 5.933 3a.935.935 0 0 0-.928.938H5v16.125h.005c0 .515.417.937.928.937.192 0 .351-.066.525-.16l13.036-7.757a1.412 1.412 0 0 0 0-2.166Z"
                    ></path>
                  </svg>
                  <span className="min-w-0 truncate">Play showreel</span>
                </button>
              </div>
            </div>
            <div className="mt-0 [grid-column:8/span_5]">
              <div className="flex items-center h-full">
                <img
                  src="/images/hero-img.webp"
                  alt=""
                  sizes="(max-width: 479px) 432px, (max-width: 1023px) 975px, 474px"
                />
              </div>
            </div>
          </div>
        </div>
        <VideoOverlay
          isOverlayVisible={isOverlayVisible}
          toggleOverlay={toggleOverlay}
        />
      </section>
      {/* Hero section ends */}
      {/* Announcement section starts */}
      <section className="relative flex min-h-[304px] flex-col items-center justify-center overflow-hidden bg-[#4716ed] py-16 md:py-20">
        <div className="container relative z-2 md:grid md:grid-flow-row md:grid-cols-[repeat(12,1fr)] md:max-lg:gap-6">
          <div className="md:col-[span_6] md:flex md:flex-col md:justify-center lg:col-[span_7]">
            <h4 className="mb-6 text-2xl/[1.08] font-semibold text-white">
              Why Luminary?
            </h4>
            <h2 className="mb-10 font-semibold text-white text-7xl">
              Brighter{" "}
              <span className="relative inline-block">
                <span className="invisible">{fullWord}</span>
                <span className="absolute left-0 z-2">{displayedWord}</span>
                <motion.div
                  className="absolute bottom-[2px] left-0 z-1 h-[5px] bg-[#FF5438]"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(displayedWord.length / fullWord.length) * 100}%`,
                  }}
                  transition={{ duration: 0.1 }}
                />
              </span>
            </h2>
            <div>
              <a
                className="inline-block cursor-pointer btn-white"
                href="/about"
              >
                About us
              </a>
            </div>
          </div>
          <div className="w-full max-[767px]:mt-12 md:col-[span_6] lg:col-[span_5]">
            <img
              className="w-full size-auto"
              src="/images/Pattern.webp"
              alt="Luminary Pattern"
              width={520}
              height={520}
            />
          </div>
        </div>
      </section>
      {/* Announcement section ends */}
      {/* Stages section starts */}
      <section className="relative overflow-hidden bg-[#300a44] md:py-20">
        <div className="container">
          <div className="lg:grid lg:grid-flow-row lg:grid-cols-[repeat(12,1fr)] lg:[grid-column-gap:24px]">
            <div className="flex flex-col justify-end lg:col-[span_5]">
              <h2 className="font-medium text-white text-7xl">
                Our flexible 3 stage framework to craft digital experiences
              </h2>
              <div className="mt-10 lg:mt-16">
                <a
                  className="inline-block btn-white"
                  href="/explore-build-grow"
                >
                  See how we make it work
                </a>
              </div>
            </div>
            <div className="mt-12 flex flex-col gap-12 md:mt-20 md:gap-20 lg:col-[7/span_6] lg:mt-0">
              <StageItems />
            </div>
          </div>
          <div className="mt-20 md:mt-24 lg:mt-40 lg:grid lg:grid-flow-row lg:grid-cols-[repeat(12,1fr)] lg:[grid-column-gap:24px]">
            <div className="lg:col-[span_3]">
              <h2 className="text-3xl font-medium leading-[1.08] text-white md:text-4xl">
                Using our experience to make your digital experience brighter
              </h2>
            </div>
            <div className="mt-14 flex flex-col gap-12 md:flex-row md:gap-6 lg:col-[span_9] lg:mt-0 lg:gap-8">
              <Expertise />
            </div>
          </div>
        </div>
      </section>
      {/* Stages section ends */}
      {/* Posts section starts */}
      <section className="py-16 md:py-20">
        <div className="mx-auto mb-12 flex w-full max-w-[1220px] justify-between px-6 py-0 max-lg:mb-8 max-lg:flex-col max-lg:flex-nowrap">
          <h4 className="text-[34px]/[1.03] font-medium text-[#18161a] md:text-[51px]/[1.04]">
            Latest posts
          </h4>
          <div className="inline-flex items-center gap-1 max-lg:mt-6">
            <a
              href="#"
              className="cursor-pointer font-light text-[#18161a] underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] duration-[.4s] ease-[ease] hover:decoration-[#6c45f1]"
            >
              View more
            </a>
            <svg
              className="size-5 text-[#4716ed]"
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
          </div>
        </div>
        <div className="container grid grid-cols-[repeat(3,1fr)] gap-6 max-lg:grid-cols-[repeat(1,1fr)]">
          {postsData.map((post, index) => (
            <BlogPostCard key={index} {...post} />
          ))}
        </div>
      </section>
      {/* Posts section ends */}
      {/* Guides section starts */}
      <section className="relative py-16 overflow-hidden bg-ferozi-gradient md:py-20">
        <div className="container flex flex-col items-start gap-[72px]">
          <div className="order-1 lg:max-w-[70%]">
            <h4 className="relative mb-6 text-[14px]/[1.25] font-semibold text-white md:text-[16px]/[1.25]">
              Guides and resources
            </h4>
            <h2 className="relative text-[67px]/none font-medium text-white md:text-[45px]/none">
              Handy tools to help you win at your job
            </h2>
            <p className="relative mt-6 text-base/[1.5] font-light text-white md:text-[21px]/[1.375]">
              Our most popular guides and templates.
            </p>
            <a
              className="mt-6 inline-block rounded-full bg-white px-6 py-4 text-sm/[1.375] font-medium text-[#4716ed] shadow-[0_6px_12px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-[#4716ed] hover:text-white hover:shadow-[0_10px_24px_rgba(0,0,0,0.3),0_6px_12px_rgba(0,0,0,0.3)] md:text-base"
              href="/handy-resources"
            >
              More handy resources
            </a>
          </div>
          <div className="order-2 grid justify-center [grid-gap:32px] lg:grid-cols-[1fr_1fr]">
            {guides.map((post, index) => (
              <BlogPostCard
                borderColor="border-[#300a44] hover:border-[#E5E3E8]"
                key={index}
                {...post}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Guides section ends */}
    </PortfolioLayout>
  );
}

export default Home
