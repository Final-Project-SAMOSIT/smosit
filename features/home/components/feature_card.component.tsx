import React, { useEffect } from "react";
import { Observer } from "mobx-react-lite";

interface FeatureCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export const FeatureCard = (props: FeatureCardProps) => {
  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className=" laptop:px-[31px] px-[16px] pt-[32px] pb-[72px] laptop:pt-[42px] laptop:pb-[96px] bg-[#f3f3f3] rounded-[10px] flex flex-col justify-center space-y-[24px] laptop:space-y-[57px] relative">
          <p className="text-center topic">{props.title}</p>
          <p className="text-center body">{props.description}</p>
          <div className="absolute bottom-[24px] laptop:bottom-[42px] left-0 w-full flex justify-center">
            <p
              className="transform translate-y-0 border-b border-black cursor-pointer button hover:translate-y-[-4px] hover:pb-[4px] pb-0 duration-150 text-black"
              onClick={props.onClick}
            >
              CLICK
            </p>
          </div>
        </div>
      )}
    </Observer>
  );
};
