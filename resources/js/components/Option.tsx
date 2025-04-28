import React from "react";

const Option = ({ text, Icon, href, target }: any) => {
  return (
    <div className="relative block">
      <div className="flex h-24 min-w-[200px] cursor-pointer items-center justify-start rounded-2xl border border-[#AC9DB4] p-6 transition-[background-color,border-color] delay-0 duration-[.4s] ease-[ease] hover:border-2 hover:border-[#4716ED] hover:bg-[#dad0fb] hover:duration-[.2s]">
        <div className="flex items-center gap-4 mx-auto">
          <Icon className="grid size-6 shrink-0 appearance-none place-content-center rounded-[50%] border-2 border-[#9173f4] text-[#9173f4] focus:ring-[#9173f4]" />
          <span>{text}</span>
          <a className="absolute inset-0" href={href} target={target}/>
        </div>
      </div>
    </div>
  );
};

export default Option;

