import React from "react";

const SearchBar = ({ isVisible, toggleSearch }: any) => {
  return (
    <div
      className={`fixed inset-0 block bg-[#18161acc] [transition:opacity_.3s_ease] ${isVisible ? `z-6 opacity-100` : `z-[-1] opacity-0`}`}
    >
      <div
        className="absolute z-0 size-full"
        onClick={() => toggleSearch(false)}
      />
      <div
        className={`bg-white [transition-property:transform,visibility] [transition:.3s_ease-in-out] ${isVisible ? `visible [transform:translateY(0)]` : `invisible [transform:translateY(-100%)]`}`}
      >
        <div className="mx-auto flex w-full max-w-[1220px] justify-end px-6 py-0">
          <div className="grid h-[120px] w-[500px] grid-cols-[auto_48px] items-center [grid-column-gap:24px]">
            <div className="relative mb-0">
              <div>
                <div>
                  <form className="relative" action="">
                    <input
                      type="text"
                      className="focus: flex h-12 w-full items-center border-none bg-transparent py-[6px] pl-6 pr-4 text-[#615D61] [-webkit-appearance:none] [border-bottom:_1px_solid_#300A44] placeholder:font-light placeholder:text-[#9ca3af] placeholder:opacity-1 focus:ring-0 focus:[border-bottom:_2px_solid_#9173f4]"
                      placeholder="Search"
                      name=""
                      id=""
                    />
                    <button className="pointer-events-none absolute inset-[12px_8px_0_auto] left-0 right-auto top-[14px] flex w-[unset] items-center justify-center p-0">
                      <svg
                        className="absolute bottom-4 left-0 top-0 size-4 overflow-visible text-[#300a44]"
                        width="10"
                        height="10"
                        viewBox="0 0 40 40"
                      >
                        <path
                          d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"
                          stroke="#300a44"
                          strokeWidth={2}
                        ></path>
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
              {/* Search suggestions */}
              <div className="absolute left-0 right-0 bg-white">
                <div>
                  <div>
                    <ol className="p-0 m-0 list-none">
                      <li className="p-0 m-0">
                        <div className="flex w-full">
                          <a
                            className="flex w-full flex-row items-start justify-between border border-b border-solid border-b-[#EDE9DD] p-4"
                            href="/"
                          >
                            <span className="font-normal text-[#4716ed]">
                              {/* Page Name */}
                            </span>
                            <span className="whitespace-nowrap text-right font-mono text-base/[1.375] text-[#272529]">
                              {/* Page Type */}
                            </span>
                          </a>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
              {/* Search suggestions end */}
            </div>
            <button
              onClick={() => toggleSearch(false)}
              className="flex size-12 cursor-pointer items-center justify-center rounded-[50%] border-none bg-white text-[#4716ed] [transition:_background-color_.2s_ease_0s] hover:bg-[#dad0fb]"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

