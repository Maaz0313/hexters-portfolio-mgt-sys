const Option = ({ text, Icon, href, target }: any) => {
    return (
        <div className="relative block">
            <div className="border-border hover:border-accent hover:bg-muted flex h-24 min-w-[200px] cursor-pointer items-center justify-start rounded-2xl border p-6 transition-[background-color,border-color] delay-0 duration-[.4s] ease-[ease] hover:border-2 hover:duration-[.2s]">
                <div className="mx-auto flex items-center gap-4">
                    <Icon className="border-accent text-accent focus:ring-accent grid size-6 shrink-0 appearance-none place-content-center rounded-[50%] border-2" />
                    <span className="text-foreground">{text}</span>
                    <a className="absolute inset-0" href={href} target={target} />
                </div>
            </div>
        </div>
    );
};

export default Option;
