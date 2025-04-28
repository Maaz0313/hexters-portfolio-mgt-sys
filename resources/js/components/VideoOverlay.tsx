import React from "react";

const VideoOverlay = ({ isOverlayVisible, toggleOverlay }: any) => {
  return (
    <div
      className={`fixed left-0 top-0 h-screen w-full ${
        isOverlayVisible
          ? `visible z-7 flex items-center justify-center`
          : `invisible hidden`
      }`}
    >
      <div className="absolute inset-0 bg-[#300a44]" />
      <div className="absolute right-6 top-4 z-3">
        <button
          onClick={toggleOverlay}
          className="inline-flex items-center gap-3 rounded-full bg-white p-4 text-[#300a44] [box-shadow:0_6px_12px_#0000004d,0_1px_2px_#0000004d] [transition:all_.3s_ease-in-out] hover:bg-[#18161a] hover:text-white"
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
      <div className="w-full">
        <div className="relative w-full pb-20 overflow-hidden md:pr-20">
          <div className="container relative z-2">
            <div className="relative pb-[40%]">
              <iframe
                className="min-[1300px]:h-[90vh] min-[1400px]:h-[48vh] absolute left-0 top-0 w-full sm:h-[55vh] md:h-[67vh] lg:h-[90vh] 2xl:h-[50vh] [@media_(min-height:_1080px)_and_(min-width:_1280px)]:h-[50vh] [@media_(min-height:_720px)_and_(min-width:_1280px)]:h-[70vh]"
                id="video-iframe-6o3RCvWMZyE"
                src="https://www.youtube.com/embed/6o3RCvWMZyE"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoOverlay;

