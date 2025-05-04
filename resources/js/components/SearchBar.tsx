const SearchBar = ({ isVisible, toggleSearch }: any) => {
    return (
        <div className={`bg-primary/80 fixed inset-0 block [transition:opacity_.3s_ease] ${isVisible ? `z-[100] opacity-100` : `z-[-1] opacity-0`}`}>
            <div className="absolute z-0 size-full" onClick={() => toggleSearch(false)} />
            <div
                className={`bg-[var(--color-muted)] [transition-property:transform,visibility] [transition:.3s_ease-in-out] ${isVisible ? `visible [transform:translateY(0)]` : `invisible [transform:translateY(-100%)]`}`}
            >
                <div className="mx-auto flex w-full max-w-[1220px] justify-end px-6 py-0">
                    <div className="grid h-[120px] w-full max-w-[500px] grid-cols-[auto_48px] items-center [grid-column-gap:24px]">
                        <div className="relative mb-0">
                            <div>
                                <div>
                                    <form className="relative" action="">
                                        <input
                                            type="text"
                                            className="focus: flex h-12 w-full items-center rounded-md border-2 border-white bg-[var(--color-muted)] py-[6px] pr-4 pl-10 text-white [-webkit-appearance:none] placeholder:font-light placeholder:text-white placeholder:opacity-1 focus:border-[var(--color-accent)] focus:ring-0"
                                            placeholder="Search"
                                            name=""
                                            id=""
                                        />
                                        <button className="pointer-events-none absolute inset-y-0 left-3 flex items-center justify-center p-0">
                                            <svg className="size-4 overflow-visible text-white" width="10" height="10" viewBox="0 0 40 40">
                                                <path
                                                    d="M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                ></path>
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            {/* Search suggestions */}
                            <div className="absolute right-0 left-0 bg-[var(--color-muted)]">
                                <div>
                                    <div>
                                        <ol className="m-0 list-none p-0">
                                            <li className="m-0 p-0">
                                                <div className="flex w-full">
                                                    <a
                                                        className="flex w-full flex-row items-start justify-between border-b border-white/30 p-4 text-white hover:bg-[var(--color-accent)]/20"
                                                        href="/"
                                                    >
                                                        <span className="font-normal text-white">{/* Page Name */}</span>
                                                        <span className="text-right font-mono text-base/[1.375] whitespace-nowrap text-white/70">
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
                            className="flex size-12 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[var(--color-muted)] text-white transition-colors hover:bg-[var(--color-accent)] hover:text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
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
