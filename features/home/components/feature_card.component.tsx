import React, { useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { useTranslation } from "next-i18next";

interface FeatureCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

export const FeatureCard = (props: FeatureCardProps) => {
  //---------------------
  //   i18n
  //---------------------
  const { t } = useTranslation("home");

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="laptop:px-[31px] px-[16px] py-[32px] laptop:py-[42px] bg-[#f3f3f3] rounded-[10px] flex flex-col justify-between space-y-[24px] laptop:space-y-[57px] w-full h-full">
          <div className="space-y-[16px]">
            <p className="text-center topic">{props.title}</p>
            <p className="text-center body">{props.description}</p>
          </div>
          <div className="w-full flex justify-center">
            <p
              className="transform translate-y-0 border-b border-black cursor-pointer button hover:translate-y-[-4px] hover:pb-[4px] pb-0 duration-150 text-black"
              onClick={props.onClick}
            >
              {t("home_page_voting_feature_card_button")}
            </p>
          </div>
        </div>
      )}
    </Observer>
  );
};
