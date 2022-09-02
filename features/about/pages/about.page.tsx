import React, { Fragment, useContext, useEffect } from "react";
import { observer, Observer } from "mobx-react-lite";
import { useTranslation } from "next-i18next";
import { MainLayout } from "../../../core/components/layout/main_layout";
import { Button } from "../../../core/components/input/button.component";
import { Dropdown } from "../../../core/components/input/dropdown_input";
import _ from "lodash";
import { PreviewCard } from "../../../core/components/card/preview_card.component";
import { useRouter } from "next/router";
import { aboutContext } from "../contexts/about.context";
import { ModalContext } from "../../../core/context/modal.context";

export const AboutPage = () => {
  //---------------------
  //   i18n
  //---------------------
  const { i18n } = useTranslation("about");

  //---------------------
  //   ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(aboutContext);
  const modalContext = useContext(ModalContext);

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    context.modal = modalContext;
    context.preparationYear();
    context.preparationStudentUnion();
    context.preparationExperience();
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <MainLayout>
          <div className="flex flex-col mt-[32px] laptop:mt-[132px] mb-[72px] laptop:mb-[210px]">
            <div className="flex w-full mb-[72px] laptop:mb-[112px]">
              <div className="hidden w-1/2 laptop:block">
                <img src="/images/about_us.svg" className="mx-auto" alt="" />
              </div>

              <div className="laptop:w-1/2 w-full pt-[42px] flex flex-col justify-between laptop:space-y-0 space-y-[32px]">
                <p className="border border-black rounded-full pt-[6px] pb-[5px] px-[17px] w-max button select-none">
                  about
                </p>
                <p className="heading1">{"What is SAMO SIT"}</p>
                <p className="body">
                  {
                    "SAMO SIT is a web application used by students of SIT faculty at KMUTT to manage collaboration between students and the student union. Many features in our web application were developed with the goal of assisting students or the student union in getting connected fast and resolving problems that may arise."
                  }
                </p>
                <div className="flex justify-end w-full">
                  <Button
                    onClick={() => null}
                    title={"read more"}
                    heightCss="laptop:h-[52px] h-[36px]"
                    widthCss="laptop:w-[137px] w-[96px]"
                  ></Button>
                </div>
              </div>
            </div>

            <div className="space-y-[21px] w-max flex flex-col items-center mb-[32px] laptop:mb-[56px] self-center">
              <p className="heading2">Directory of student union </p>
              <div className="w-3/4 border-b border-black" />
            </div>

            <div className="w-[137px] self-center mb-[32px] laptop:mb-[72px]">
              <Dropdown
                onChange={(e) => {
                  context.year = Number(e);
                  context.preparationStudentUnion();
                  context.preparationExperience();
                }}
                options={_.map(context.yearList, (year) => ({
                  name: `YEAR ${year}`,
                  value: year,
                }))}
                value={context.year.toString()}
              />
            </div>

            <div className="grid grid-cols-3 gap-y-[24px] laptop:gap-y-[32px] gap-x-[16px] mb-[72px] laptop:mb-[112px]">
              {context.isStudentLoading ? (
                <div>Loading</div>
              ) : (
                <Fragment>
                  <div />
                  <StudentUnionCard
                    image={
                      context.studentList[0]?.student_union_info.std_img || ""
                    }
                    name={_.join(
                      [
                        _.get(
                          context.studentList[0],
                          `student_union_info.std_fname_${i18n.language}`
                        ),
                        _.get(
                          context.studentList[0],
                          `student_union_info.std_lname_${i18n.language}`
                        ),
                      ],
                      " "
                    )}
                    position={
                      context.studentList[0]?.std_position.position_name || ""
                    }
                  />
                  <div />
                  {_.map(_.slice(context.studentList, 1), (user) => (
                    <StudentUnionCard
                      image={user.student_union_info.std_img}
                      name={_.join(
                        [
                          _.get(
                            user,
                            `student_union_info.std_fname_${i18n.language}`
                          ),
                          _.get(
                            user,
                            `student_union_info.std_lname_${i18n.language}`
                          ),
                        ],
                        " "
                      )}
                      position={user.std_position.position_name}
                    />
                  ))}
                </Fragment>
              )}
            </div>

            <div className="flex flex-col items-center">
              <div className="flex flex-col mb-[48px] laptop:mb-[64px] w-full">
                <p className="heading3">Work Experiences</p>
                <div className="border-b border-black w-[110px]" />
              </div>
              <div className="grid grid-cols-1 laptop:max-w-none max-w-[480px]  laptop:grid-cols-3 gap-x-[32px] gap-y-[64px] mb-[32px] laptop:mb-[96px]">
                {_.map(context.experienceList, (experience) => (
                  <PreviewCard
                    description={experience.news_details}
                    onClick={() => router.push(`/about/${experience.news_id}`)}
                    src={
                      experience.news_img ||
                      "https://i.pinimg.com/564x/ca/75/fd/ca75fdad84c47b3f53b09514007596b5.jpg"
                    }
                    topic={experience.news_title}
                    timeStamp={experience.news_created_at}
                  />
                ))}
              </div>
              <Button
                onClick={() => null}
                title="load more"
                widthCss="w-[137px]"
              />
            </div>
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};

interface StudentUnionCardProps {
  image: string;
  name: string;
  position: string;
}

const positionMap = {
  President: { th: "ประธาน", en: "President" },
  VicePresident: { th: "รองประธาน", en: "Vice President" },
  Secretary: { th: "เลขา", en: "Secretary" },
  Board: { th: "กรรมการ", en: "Board" },
};

const StudentUnionCard = (props: StudentUnionCardProps) => {
  const { i18n } = useTranslation("about");

  return (
    <Observer>
      {() => (
        <div className="flex flex-col items-center">
          {props.image ? (
            <img
              src={props.image}
              className="w-[200px] aspect-square rounded-full mb-[8px] laptop:mb-[20px]"
              alt=""
            />
          ) : (
            <div className="bg-gray-20 w-[200px] h-[200px] p-[8px] rounded-full overflow-hidden">
              <i className="fas fa-user text-[207px]" />
            </div>
          )}
          <p className="text-center heading5 mb-[4px] laptop:mb-[11px]">
            {props.name}
          </p>
          <p className="text-center caption1">
            {_.get(
              positionMap,
              `${_.replace(props.position, / /g, "")}.${i18n.language}`
            )}
          </p>
        </div>
      )}
    </Observer>
  );
};
