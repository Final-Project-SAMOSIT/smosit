import React, { useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { newsContext } from "../contexts/news.context";
import { MainLayout } from "../../../core/components/layout/main_layout";
import _ from "lodash";
import { PreviewCard } from "../../../core/components/card/preview_card.component";
import { useRouter } from "next/router";
import { Paginate } from "../../../core/components/table/paginate.component";
import { ModalContext } from "../../../core/context/modal.context";
import { Button } from "../../../core/components/input/button.component";
import { AuthContext } from "../../../core/context/auth.context";
import Loading from "../../../core/components/utility/loading";
import { useTranslation } from "next-i18next";

export const NewsPage = () => {
  //---------------------
  //   i18n
  //---------------------
  const { t } = useTranslation("news");

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(newsContext);
  const modalContext = useContext(ModalContext);
  const authContext = useContext(AuthContext);

  //---------------------
  //   ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    context.modal = modalContext;
    context.t = t;

    context.newsPreparation();
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <MainLayout>
          <div className="tablet:mt-[64px] mt-[32px] laptop:mt-[112px] flex flex-col tablet:mb-[64px] mb-[32px] laptop:mb-[96px]">
            <div className="justify-between flex">
              <p className="heading3 pb-[11px] border-b pr-[32px] border-black w-max mb-[32px] laptop:mb-[64px]">
                {t("news_page_news_title")}
              </p>
              {authContext.isPermission(["Publisher"]) && (
                <Button
                  onClick={() => router.push("/news/create")}
                  title={t("news_page_add_news_button")}
                  widthCss="w-[137px]"
                  heightCss="laptop:h-[52px] h-[40px]"
                />
              )}
            </div>
            <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-x-[32px] gap-y-[64px] laptop:gap-y-[112px] mb-[72px] laptop:mb-[96px]">
              {context.isLoading ? (
                <div className="col-span-full flex justify-center">
                  <Loading text="text-4xl" />
                </div>
              ) : (
                _.map(context.newsList, (news) => (
                  <PreviewCard
                    topic={news.news_title}
                    description={news.news_details}
                    src={
                      news.news_img ||
                      "https://i.pinimg.com/564x/ca/75/fd/ca75fdad84c47b3f53b09514007596b5.jpg"
                    }
                    timeStamp={news.news_created_at}
                    view={news.views}
                    onClick={() => router.push(`/news/${news.news_id}`)}
                  />
                ))
              )}
            </div>
            <div className="flex justify-end w-full">
              <Paginate
                onChangePage={(page) => {
                  context.currentPage = page;
                  context.newsPreparation();
                }}
                page={context.currentPage}
                totalPage={context.totalPage}
              />
            </div>
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};
