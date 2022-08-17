import React, { useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { newsContext } from "../contexts/news.context";
import { MainLayout } from "../../../core/components/layout/main_layout";
import _ from "lodash";
import { PreviewCard } from "../../../core/components/card/preview_card.component";
import { useRouter } from "next/router";
import { Paginate } from "../../../core/components/table/paginate.component";

export const NewsPage = () => {
  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(newsContext);

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
          <div className="tablet:mt-[64px] mt-[32px] laptop:mt-[112px] flex flex-col tablet:mb-[64px] mb-[32px] laptop:mb-[96px]">
            <p className="heading3 pb-[11px] border-b pr-[32px] border-black w-max mb-[32px] laptop:mb-[64px]">
              News
            </p>
            <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-x-[32px] gap-y-[64px] laptop:gap-y-[112px] mb-[72px] laptop:mb-[96px]">
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
            <div className="flex justify-end w-full">
              <Paginate
                onChangePage={(page) => (context.currentPage = page)}
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
