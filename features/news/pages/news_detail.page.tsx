import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { MainLayout } from "../../../core/components/layout/main_layout";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import "dayjs/locale/th";
import _ from "lodash";
import { PreviewCard } from "../../../core/components/card/preview_card.component";
import { newsDetailContext } from "../contexts/news_detail.context";
import { ModalContext } from "../../../core/context/modal.context";
import draftToHtml from "draftjs-to-html";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { rawStringToHtml } from "../../../core/libs/rich_text_utills";

export const NewsDetailPage = () => {
  //---------------------
  //   i18n
  //---------------------]
  const { i18n } = useTranslation("news");

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(newsDetailContext);
  const modalContext = useContext(ModalContext);

  //---------------------
  //   ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //   HANDLED
  //---------------------
  function getHTML() {
    if (context.news?.news_details) {
      const object = JSON?.parse(context.news?.news_details || "");

      return draftToHtml(convertToRaw(convertFromRaw(object)));
    } else {
      return "";
    }
  }

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    context.modal = modalContext;
    context.newsPreparation(router.query.id?.toString() || "");
    context.newsSuggestionPreparation();
  }, [router.query.id]);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <MainLayout>
          {context.isLoading ? (
            <div>Loading</div>
          ) : (
            <div className="flex flex-col tablet:mt-[64px] mt-[32px] laptop:mt-[112px] tablet:mb-[64px] mb-[32px] laptop:mb-[96px]">
              <p className="title mb-[32px]">{context.news?.news_title}</p>
              <div className="w-1/2 border-b border-black mb-[21px]" />
              <p className="button mb-[32px]">
                posted on:{" "}
                {i18n.language === "en" &&
                  dayjs(context.news?.news_created_at)
                    .locale(i18n.language)
                    .format("DD MMMM YYYY, h:mm a")}
                {i18n.language === "th" &&
                  dayjs(context.news?.news_created_at)
                    .locale(i18n.language)
                    .add(i18n.language === "th" ? 543 : 0, "year")
                    .format("DD MMMM YYYY, H:mm น.")}
              </p>
              <img
                src={
                  context.news?.news_img ||
                  "https://i.pinimg.com/564x/a9/00/49/a900494ac06bfb931efb6885c995c9ff.jpg"
                }
                className="w-full aspect-[3/1] object-contain bg-black mb-[18px]"
                alt=""
              />
              <p className="text-center caption2 mb-[32px] tablet:mb-[48px]">
                {context.news?.news_caption_img}
              </p>
              <div
                className="text-body mb-[64px] tablet:mb-[96px]"
                dangerouslySetInnerHTML={{
                  __html: rawStringToHtml(context.news?.news_details || ""),
                }}
              />

              {/* <p className="text-body mb-[64px] tablet:mb-[96px]">
                {context.news?.news_details}
              </p> */}
              <div className="space-y-[11px] flex flex-col mb-[64px]">
                <p className="heading3">Suggestion</p>
                <div className="w-[110px] border-b border-black" />
              </div>
              <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-x-[32px] gap-y-[64px] laptop:gap-y-[112px] mb-[72px] laptop:mb-[196px]">
                {_.map(context.newsList, (news) => (
                  <PreviewCard
                    topic={news.news_title}
                    description={news.news_details}
                    src={
                      news.news_img ||
                      "https://i.pinimg.com/564x/ca/75/fd/ca75fdad84c47b3f53b09514007596b5.jpg"
                    }
                    timeStamp={news.news_created_at}
                    onClick={() => router.push(`/news/${news.news_id}`)}
                  />
                ))}
              </div>
            </div>
          )}
        </MainLayout>
      )}
    </Observer>
  );
};
