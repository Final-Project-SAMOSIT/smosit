import React, { useContext, useEffect, useRef, useState } from "react";
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
import { rawStringToHtml } from "../../../core/libs/rich_text_utills";
import Loading from "../../../core/components/utility/loading";
import { AuthContext } from "../../../core/context/auth.context";
import { useClickOutside } from "../../../core/libs/click_detector";

export const NewsDetailPage = () => {
  //---------------------
  //   i18n
  //---------------------]
  const { i18n, t } = useTranslation("news");

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(newsDetailContext);
  const modalContext = useContext(ModalContext);
  const authContext = useContext(AuthContext);

  //---------------------
  //   ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //   STATE
  //---------------------
  const [isOpen, setIsOpen] = useState(false);

  //---------------------
  //   REF
  //---------------------
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    context.modal = modalContext;
    context.t = t;
    context.newsPreparation(router.query.id?.toString() || "");
  }, [router.query.id]);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <MainLayout>
          {context.isLoading ? (
            <div className="w-full flex justify-center">
              <Loading text="text-4xl" />
            </div>
          ) : (
            <div className="flex flex-col tablet:mt-[64px] mt-[32px] laptop:mt-[112px] tablet:mb-[64px] mb-[32px] laptop:mb-[96px]">
              <div className="flex justify-between tablet:mb-[16px] mb-[8px] laptop:mb-[32px]">
                <p className="title ">{context.news?.news_title}</p>
                {authContext.isPermission(["Publisher"]) && (
                  <div className="relative">
                    <i
                      className="fas fa-ellipsis-h mr-[4px] p-[2px] cursor-pointer"
                      onClick={() => {
                        setTimeout(() => {
                          setIsOpen(true);
                        }, 150);
                      }}
                    />
                    {isOpen && (
                      <div
                        className="absolute w-[160px] border border-black shadow-sm right-0 flex flex-col"
                        ref={ref}
                      >
                        {_.map(
                          [
                            {
                              name: t("news_detail_edit_button"),
                              action: () =>
                                router.push(`${router.asPath}/edit`),
                            },
                            {
                              name: t("news_detail_delete_button"),
                              action: () =>
                                modalContext.openModal(
                                  "Delete",
                                  "Are you sure you want to delete?",
                                  () => {
                                    context.onDelete(
                                      router.query.id?.toString() || ""
                                    );
                                  }
                                ),
                            },
                          ],
                          (option) => (
                            <div
                              className="px-[16px] pt-[7px] pb-[11px] bg-white hover:bg-gray-10 cursor-pointer"
                              onClick={option.action}
                            >
                              <p className="text-body select-none">
                                {option.name}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="w-1/2 border-b border-black mb-[21px]" />
              <p className="button mb-[32px]">
                {t("news_detail_page_post_at")}:{" "}
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

              <div className="space-y-[11px] flex flex-col mb-[64px]">
                <p className="heading3">{t("news_detail_suggestion")}</p>
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
