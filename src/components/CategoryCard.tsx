import { getLucideIconByName } from "@/service/GeneralService";
import { useEffect, useRef, useState } from "react";

interface ICategoryCardProps {
  title: string;
  icon: string;
  selected: boolean;
  iconColor: string;
  onClick: () => void;
};

function CategoryCard({ title, icon, selected, onClick, iconColor }: ICategoryCardProps) {
  const IconComponent = getLucideIconByName(icon);

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;
      setShouldScroll(textWidth > containerWidth);
    }
  }, [title]);


  return (
    <div
      onClick={onClick}
      className={`group relative rounded-3xl flex flex-col items-center justify-center
              p-3 cursor-pointer transform transition-shadow transition-colors transition-transform duration-300 ease-in-out
              hover:-translate-y-1
              w-[120px] h-[90px] sm:w-[150px] sm:h-[110px] md:w-[190px] md:h-[120px]
              text-center backdrop-blur-md backdrop-saturate-150
              border border-[rgb(200,236,241)]
              ${selected
          ? "bg-[rgb(252,245,214)] shadow-[0_6px_20px_-2px_rgba(96,165,250,0.5)] border-2 border-blue-400 ring-0 ring-blue-300 ring-offset-2 scale-105 animate-float-card-category"
          : "bg-[rgb(237,246,246)] hover:bg-[rgb(241,246,247)] shadow-[0_4px_12px_-2px_rgba(147,197,253,0.3)] hover:shadow-[0_8px_24px_-4px_rgba(147,197,253,0.5)]"}
            `}
    >

      <IconComponent className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 ${iconColor} mb-2`} />
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden h-6 sm:h-7 md:h-8 flex justify-center items-center mt-2"
      >
        {shouldScroll ? (
          <div className="absolute animate-marquee whitespace-nowrap min-w-max">
            <h1
              ref={textRef}
              className="text-sm sm:text-base md:text-base font-semibold leading-tight text-blue-900 drop-shadow-sm text-primary-color break-keep"
            >
              {title}
            </h1>
          </div>
        ) : (
          <h1
            ref={textRef}
            className="text-sm sm:text-base md:text-base font-semibold leading-tight text-blue-900 drop-shadow-sm text-primary-color whitespace-nowrap overflow-hidden text-ellipsis break-keep"
          >
            {title}
          </h1>
        )}
      </div>
    </div>
  );
}

export default CategoryCard;
