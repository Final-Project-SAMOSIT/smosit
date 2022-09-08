import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { MainLayout } from "../../../core/components/layout/main_layout";
import { Button } from "../../../core/components/input/button.component";
import { FeatureCard } from "../components/feature_card.component";
import _ from "lodash";
import { useRouter } from "next/router";
import { AuthContext } from "../../../core/context/auth.context";
import { useTranslation } from "next-i18next";
import { PreviewCard } from "../../../core/components/card/preview_card.component";
import { homeContext } from "../contexts/home.context";
import { ModalContext } from "../../../core/context/modal.context";

export const HomePage = () => {
  //---------------------
  //   i18n
  //---------------------
  const { t } = useTranslation("home");

  //---------------------
  //   CONTEXT
  //---------------------
  const authContext = useContext(AuthContext);
  const context = useContext(homeContext);
  const modalContext = useContext(ModalContext);

  //---------------------
  //   CONST
  //---------------------
  const features = [
    {
      topic: t("home_page_voting_feature_card_title"),
      description: t("home_page_voting_feature_card_detail"),
      featureRoute: "/vote",
    },
    {
      topic: t("home_page_petition_feature_card_title"),
      description: t("home_page_petition_feature_card_detail"),
      featureRoute: authContext.isPermission(["Publisher"])
        ? "/manage/petition"
        : "/petition",
    },
    {
      topic: t("home_page_project_form_feature_card_title"),
      description: t("home_page_project_form_feature_card_detail"),
      featureRoute: "/project",
    },
  ];

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
          <div className="flex flex-col pt-[32px] laptop:pt-[132px] pb-[72px] laptop:pb-[210px] space-y-[32px] laptop:space-y-[138px]">
            <div className="flex w-full">
              <div className="hidden w-1/2 laptop:block">
                <img src="/images/about_us.svg" className="mx-auto" alt="" />
              </div>

              <div className="laptop:w-1/2 w-full pt-[42px] flex flex-col justify-between laptop:space-y-0 space-y-[32px]">
                <p className="border border-black rounded-full pt-[6px] pb-[5px] px-[17px] w-max button select-none">
                  {t("home_page_about_tag")}
                </p>
                <p className="heading1">{t("home_page_about_title")}</p>
                <p className="body">{t("home_page_about_detail")}</p>
                <div className="flex justify-end w-full">
                  <Button
                    onClick={() => router.push("/about")}
                    title={t("home_page_about_read_more_button")}
                    heightCss="laptop:h-[52px] h-[36px]"
                    widthCss="laptop:w-[137px] w-[96px]"
                  ></Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-3 tablet:mx-auto w-full gap-x-[8px] gap-y-[16px] laptop:gap-[32px]">
              {_.map(features, (feature) => (
                <div className="w-full h-full" key={`${feature.topic}`}>
                  <FeatureCard
                    title={feature.topic}
                    description={feature.description}
                    onClick={() => router.push(feature.featureRoute)}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-[64px] mb-[112px]">
              <div className="flex items-end justify-between">
                <p className="heading3 pb-[11px] border-b pr-[32px] border-black">
                  News
                </p>
                <div
                  className="flex space-x-[4px] items-center group cursor-pointer"
                  onClick={() => router.push("/news")}
                >
                  <p className="text-body">see all</p>
                  <i className="fas fa-chevron-right text-[10px] pt-[3px] w-0 overflow-hidden group-hover:w-[6.25px] transition-all duration-150"></i>
                </div>
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
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};
