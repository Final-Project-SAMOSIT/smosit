import React, { useEffect, useRef } from "react";
import { Observer } from "mobx-react-lite";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { useTranslation } from "next-i18next";
import classNames from "classnames";

interface NewsCardProps {
  src: string;
  timeStamp?: string;
  topic: string;
  description: string;
  onClick: () => void;
}

export const NewsCard = (props: NewsCardProps) => {
  //---------------------
  //   i18n
  //---------------------
  const { i18n } = useTranslation("");

  //---------------------
  //   REF
  //---------------------
  const desciptionRef = useRef<HTMLDivElement>(null);

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    console.log(
      desciptionRef.current?.clientHeight,
      desciptionRef.current?.offsetHeight,
      desciptionRef.current?.scrollHeight
    );
  }, [desciptionRef.current]);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="flex flex-col">
          <img
            src={props.src}
            className="w-full aspect-[16/9] object-cover rounded-[10px] mb-[32px] cursor-pointer"
            onClick={props.onClick}
            alt=""
          />
          {props.timeStamp && (
            <p className="caption1 mb-[8px]">
              {dayjs(props.timeStamp)
                .locale(i18n.language)
                .format("DD MMMM YYYY")}
            </p>
          )}
          <p
            className="topic2 mb-[16px] cursor-pointer"
            onClick={props.onClick}
          >
            {props.topic}
          </p>
          <div className="relative" ref={desciptionRef}>
            <p className="text-body max-h-[73px] overflow-hidden">
              {props.description}
            </p>
            <div
              className={classNames("absolute bottom-0 right-0 flex pb-[1px]", {
                hidden: (desciptionRef.current?.clientHeight || 0) <= 72,
              })}
            >
              <div className="bg-gradient-to-l from-white to-transparent h-[24px] w-[196px]"></div>
              <p
                className="bg-white pl-[5px] text-primary-30 underline cursor-pointer"
                onClick={props.onClick}
              >
                read more
              </p>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};
