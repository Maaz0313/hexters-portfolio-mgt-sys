import React from "react";

const ExpertiseSection = ({ title, items }: any) => (
  <div className="md:w-1/3">
    <h3 className="text-2xl font-medium leading-tight text-white md:text-3xl md:leading-tight">
      {title}
    </h3>
    <div className="mt-8 lg:mt-10">
      {items.map((item, index) => (
        <div
          key={item.href}
          className={`border-t border-[#E5E3E8] ${index === items.length - 1 ? "border-b" : ""}`}
        >
          <a
            href={item.href}
            className="flex items-center px-0 py-4 transition-colors duration-200 ease-in-out hover:bg-[#593b69]"
          >
            <div className="shrink-0 w-10 mr-3 md:w-12">
              <img src={item.iconSrc} alt={item.iconAlt} />
            </div>
            <div className="grow">
              <p className="text-white">{item.title}</p>
            </div>
            <svg
              className="text-white"
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
              />
            </svg>
          </a>
        </div>
      ))}
    </div>
  </div>
);

const expertiseSections = [
  {
    title: "We're experts in",
    items: [
      {
        href: "/digital-strategy",
        iconSrc: "/images/icon-digital.webp",
        iconAlt: "Digital Strategy",
        title: "Digital strategy",
      },
      {
        href: "/ux-design-agency",
        iconSrc: "/images/icon-ux.webp",
        iconAlt: "User experience",
        title: "User experience",
      },
      {
        href: "/digital-design",
        iconSrc: "/images/icon-digital-design.webp",
        iconAlt: "Digital Design",
        title: "Digital design",
      },
      {
        href: "/development",
        iconSrc: "/images/icon-development.webp",
        iconAlt: "Digital Strategy",
        title: "Development",
      },
    ],
  },
  {
    title: "What we deliver",
    items: [
      {
        href: "/websites",
        iconSrc: "/images/icon-best-class.webp",
        iconAlt: "Best in class websites icon",
        title: "Best in class websites",
      },
      {
        href: "/digital-transformation",
        iconSrc: "/images/icon-digital-transformation.webp",
        iconAlt: "Digital transformation icon",
        title: "Digital transformation",
      },
      {
        href: "/web-apps",
        iconSrc: "/images/icon-modern-web-apps.webp",
        iconAlt: "Modern web apps icon",
        title: "Modern web apps",
      },
    ],
  },
  {
    title: "How we do it",
    items: [
      {
        href: "/agile-project-management",
        iconSrc: "/images/icon-agile.webp",
        iconAlt: "Agile Focused Delivery Icon",
        title: "Agile-focused Delivery",
      },
      {
        href: "/platforms",
        iconSrc: "/images/icon-platform.webp",
        iconAlt: "Deep platform knowledge Icon",
        title: "Deep platform knowledge",
      },
    ],
  },
];

const Expertise = () => (
  <React.Fragment>
    {expertiseSections.map((section) => (
      <ExpertiseSection
        key={section.title}
        title={section.title}
        items={section.items}
      />
    ))}
  </React.Fragment>
);

export default Expertise;

