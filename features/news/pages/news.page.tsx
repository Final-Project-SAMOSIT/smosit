import React, { useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { newsContext } from "../contexts/news.context";
import { MainLayout } from "../../../core/components/layout/main_layout";
import _ from "lodash";
import { PreviewCard } from "../../../core/components/card/preview_card.component";
import { useRouter } from "next/router";
import { Paginate } from "../../../core/components/table/paginate.component";
import { ModalContext } from "../../../core/context/modal.context";

export const NewsPage = () => {
  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(newsContext);
  const modalContext = useContext(ModalContext);

  //---------------------
  //   ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    context.modal = modalContext;
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
            <p className="heading3 pb-[11px] border-b pr-[32px] border-black w-max mb-[32px] laptop:mb-[64px]">
              News
            </p>
            <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-x-[32px] gap-y-[64px] laptop:gap-y-[112px] mb-[72px] laptop:mb-[96px]">
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
