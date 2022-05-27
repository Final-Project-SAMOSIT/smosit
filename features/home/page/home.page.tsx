import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { MainLayout } from "../../../core/components/layout/main_layout";
import { Button } from "../../../core/components/input/button.component";
import { FeatureCard } from "../components/feature_card.component";
import _ from "lodash";
import { useRouter } from "next/router";
import { AuthContext } from "../../../core/context/auth.context";

export const HomePage = () => {
  //---------------------
  //   CONTEXT
  //---------------------
  const authContext = useContext(AuthContext);

  //---------------------
  //   CONST
  //---------------------
  const features = [
    {
      topic: "Voting",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel eleifend arcu, purus malesuada nibh morbi senectus.Tellus risus neque, felis nisl vulputate scelerisque urna congue. Egestas ac facilisi enim euarcu mollis est arcu quis. Faucibus sit interdum risus, sed at feugiat integer.",
      featureRoute: "",
    },
    {
      topic: "Request Petition",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel eleifend arcu, purus malesuada nibh morbi senectus.Tellus risus neque, felis nisl vulputate scelerisque urna congue. Egestas ac facilisi enim euarcu mollis est arcu quis. Faucibus sit interdum risus, sed at feugiat integer.",
      featureRoute: authContext.isPermission(["Publisher"])
        ? "/manage/petition"
        : "/petition",
    },
    {
      topic: "Project Form",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel eleifend arcu, purus malesuada nibh morbi senectus.Tellus risus neque, felis nisl vulputate scelerisque urna congue. Egestas ac facilisi enim euarcu mollis est arcu quis. Faucibus sit interdum risus, sed at feugiat integer.",
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
                  ABOUT
                </p>
                <p className="heading1">What is SAMO SIT</p>
                <p className="body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  tortor quam nunc, sit ullamcorper consequat risus. Lorem est
                  varius aliquet gravida habitasse aliquet amet a. Nisi porta id
                  sit maecenas. Eros morbi blandit accumsan adipiscing diam
                  cursus sed.
                </p>
                <div className="flex justify-end w-full">
                  <Button
                    onClick={() => null}
                    title="READ MORE"
                    heightCss="laptop:h-[52px] h-[36px]"
                    widthCss="laptop:w-[137px] w-[96px]"
                  ></Button>
                </div>
              </div>
            </div>

            <div className="flex laptop:flex-row flex-col space-x-0 laptop:space-x-[41px] space-y-[36px] laptop:space-y-0 h-max tablet:w-[320px] tablet:mx-auto laptop:w-full w-full ">
              {_.map(features, (feature) => (
                <div className="h-full" key={`${feature.topic}`}>
                  <FeatureCard
                    title={feature.topic}
                    description={feature.description}
                    onClick={() => router.push(feature.featureRoute)}
                  ></FeatureCard>
                </div>
              ))}
            </div>
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};
