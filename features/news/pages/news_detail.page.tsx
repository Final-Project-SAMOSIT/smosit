import React, { useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { MainLayout } from "../../../core/components/layout/main_layout";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import "dayjs/locale/th";
import _ from "lodash";
import { PreviewCard } from "../../../core/components/card/preview_card.component";

export const NewsDetailPage = () => {
  //---------------------
  //   i18n
  //---------------------]
  const { i18n } = useTranslation("news");

  //---------------------
  //   CONTEXT
  //---------------------

  //---------------------
  //   ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {}, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <MainLayout>
          <div className="flex flex-col tablet:mt-[64px] mt-[32px] laptop:mt-[112px] tablet:mb-[64px] mb-[32px] laptop:mb-[96px]">
            <p className="title mb-[32px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam
            </p>
            <div className="w-1/2 border-b border-black mb-[21px]" />
            <p className="button mb-[32px]">
              posted on:{" "}
              {i18n.language === "en" &&
                dayjs("2022-07-29T13:18:24.073Z")
                  .locale(i18n.language)
                  .format("DD MMMM YYYY, h:mm a")}
              {i18n.language === "th" &&
                dayjs("2022-07-29T13:18:24.073Z")
                  .locale(i18n.language)
                  .add(i18n.language === "th" ? 543 : 0, "year")
                  .format("DD MMMM YYYY, H:mm น.")}
            </p>
            <img
              src="https://i.pinimg.com/564x/a9/00/49/a900494ac06bfb931efb6885c995c9ff.jpg"
              className="w-full aspect-[3/1] object-contain bg-black mb-[18px]"
              alt=""
            />
            <p className="text-center caption2 mb-[32px] tablet:mb-[48px]">
              caption for image
            </p>
            <p className="text-body mb-[64px] tablet:mb-[96px]">
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu senectus commodo pretium mi lobortis sed molestie. Pharetra accumsan, id auctor lacus. Cras enim pellentesque\nnon sapien accumsan, etiam. Eget nisi, viverra eu eget blandit nibh. Fermentum pellentesque nisl, orci tortor et risus. Cras dictumst sed adipiscing ut dictumst consequat nec.\nVulputate tristique malesuada bibendum sed suspendisse. Pharetra fermentum ultricies magna rhoncus nunc, bibendum purus, sed. Rutrum at in ipsum quis enim congue \npellentesque. Pellentesque viverra id aenean sed nisl, cursus cras quis enim.\nUltricies tortor leo massa in pharetra nisl. Et leo, in porttitor etiam pellentesque pharetra id massa. Sagittis a libero, auctor amet dui gravida venenatis in. Cursus ut elementum \nnon vel, pretium nam. Facilisis nec pretium lectus tortor nunc posuere. Lorem sit commodo sit tortor dolor eu mauris odio. Gravida sit vulputate ultricies et sem purus laoreet \ntincidunt arcu. Pellentesque nunc consectetur tempus nibh odio ut ante cras aliquet. Ornare purus laoreet sed sed lacus, urna porta. Euismod sit non phasellus amet. Ultricies \npellentesque nulla sed consectetur viverra dolor justo. Odio malesuada sollicitudin egestas odio sagittis dictum.\nPellentesque nunc consectetur tempus nibh odio ut ante cras aliquet. Ornare purus laoreet sed sed lacus, urna porta. Euismod sit non phasellus amet. Ultricies \npellentesque nulla sed consectetur viverra dolor justo. Odio malesuada sollicitudin egestas odio sagittis dictum."
              }
            </p>
            <div className="space-y-[11px] flex flex-col mb-[64px]">
              <p className="heading3">Suggestion</p>
              <div className="w-[110px] border-b border-black" />
            </div>
            <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-x-[32px] gap-y-[64px] laptop:gap-y-[112px] mb-[72px] laptop:mb-[196px]">
              {_.map(["", "", "", "", ""], () => (
                <PreviewCard
                  topic="test"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit. Volutpat scelerisque senectus tempor consequat. 
                  A et enim nullam consectetur enim turpis. Lorem ipsum dolor sit amet"
                  src="https://i.pinimg.com/564x/ca/75/fd/ca75fdad84c47b3f53b09514007596b5.jpg"
                  timeStamp="2022-07-29T13:18:24.073Z"
                  onClick={() => router.push(`/news/${"::ID"}`)}
                />
              ))}
            </div>
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};
