import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { MainLayout } from "../../../core/components/layout/main_layout";
import { Button } from "../../../core/components/input/button.component";
import { FeatureCard } from "../components/feature_card.component";
import _ from "lodash";
import { useRouter } from "next/router";
import { AuthContext } from "../../../core/context/auth.context";
import { useTranslation } from "next-i18next";

export const HomePage = () => {
  //---------------------
  //   i18n
  //---------------------
  const { t } = useTranslation("home");

  //---------------------
  //   CONTEXT
  //---------------------
  const authContext = useContext(AuthContext);

  //---------------------
  //   CONST
  //---------------------
  const features = [
    {
      topic: t("home_page_voting_feature_card_title"),
      description: t("home_page_voting_feature_card_detail"),
      featureRoute: "",
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
      featureRoute: "",
    },
  ];

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
          <div className="flex flex-col pt-[32px] laptop:pt-[132px] pb-[72px] laptop:pb-[210px] space-y-[0px] laptop:space-y-[138px]">
            <div className="flex w-full">
              <div className="hidden w-1/2 laptop:block">
                <img src="/images/about_us.svg" className="mx-auto" alt="" />
              </div>

              <div className="laptop:w-1/2 w-full pb-[53px] pt-[42px] flex flex-col justify-between laptop:space-y-0 space-y-[32px]">
                <p className="border border-black rounded-full pt-[6px] pb-[5px] px-[17px] w-max button select-none">
                  {t("home_page_about_tag")}
                </p>
                <p className="heading1">{t("home_page_about_title")}</p>
                <p className="body">{t("home_page_about_detail")}</p>
                <div className="flex justify-end w-full">
                  <Button
                    onClick={() => null}
                    title={t("home_page_about_read_more_button")}
                    heightCss="laptop:h-[52px] h-[36px]"
                    widthCss="laptop:w-[137px] w-[96px]"
                  ></Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 laptop:grid-cols-3 tablet:w-[320px] tablet:mx-auto laptop:w-full w-full gap-[32px]">
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
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};
