import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { AuthContext } from "../../../core/context/auth.context";
import Loading from "../../../core/components/utility/loading";
import { UserFormModal } from "../components/user_form_modal.component";
import { Position, positionMap } from "../types/user";
import classNames from "classnames";
import { useClickOutside } from "../../../core/libs/click_detector";
import { UnionYearFormModal } from "../components/union_year_form_modal.component";
import { UnionConcilSection } from "../components/union_concil_section.component";

export const AboutPage = () => {
  //---------------------
  //   i18n
  //---------------------
  const { i18n, t } = useTranslation("about");

  //---------------------
  //   ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //   STATE
  //---------------------
  const [isFloatButtonOpen, setIsFloatButtonOpen] = useState(false);

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(aboutContext);
  const modalContext = useContext(ModalContext);
  const authContext = useContext(AuthContext);

  //---------------------
  //   REF
  //---------------------
  const floatButtonRef = useRef<HTMLDivElement>(null);
  useClickOutside(floatButtonRef, () => {
    setIsFloatButtonOpen(false);
  });

  //---------------------
  //   HANDLED
  //---------------------
  function getStudentList() {
    return [...context.studentList, ...context.addedUser];
  }

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    context.modal = modalContext;
    context.t = t;
    context.preparationYear();
    context.preparationStudentUnion();
    context.preparationExperience();
    context.preparationPositionOptions();
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <MainLayout>
          <div className="flex flex-col mt-[32px] laptop:mt-[132px] mb-[72px] laptop:mb-[210px]">
            {context.isCreateYearModalOpen && <UnionYearFormModal />}
            {context.isEditModalOpen && (
              <UserFormModal
                positionOptions={context.positionOptions}
                onClose={() => {
                  context.isEditModalOpen = false;
                  context.editingUser = {
                    unionId: "",
                    userId: "",
                    unionYear: 0,
                  };
                }}
                onSave={(value) => {
                  context.addedUser = [
                    ...context.addedUser,
                    {
                      ...value,
                      std_position: {
                        position_id: value.position_id,
                        position_name: value.position_name as Position,
                      },
                      student_union_info: {
                        std_fname_en: value.std_fname_en,
                        std_fname_th: value.std_fname_th,
                        std_lname_en: value.std_lname_en,
                        std_lname_th: value.std_lname_th,
                        std_id: value.std_id,
                        std_img: value.std_img,
                      },
                      union_year: 0,
                      position_id: value.position_id,
                      std_id: value.std_id,
                    },
                  ];
                }}
                onRefetch={() => context.preparationStudentUnion()}
                userInfo={context.editingUser}
              />
            )}
            <div className="space-y-[21px] flex flex-col relative items-center mb-[32px] laptop:mb-[56px] w-full">
              <p className="heading2 border-b border-black w-max px-[16px]">
                {t("about_page_student_union_title")}
              </p>
              {!context.isEditMode && authContext.isPermission(["Publisher"]) && (
                <Fragment>
                  <div className="absolute right-0 hidden laptop:flex space-x-[8px]">
                    <Button
                      onClick={() => (context.isEditMode = true)}
                      title={t("about_page_student_union_manage_button")}
                      widthCss="w-[137px]"
                      heightCss="h-[52px]"
                    />
                  </div>
                  <div className="fixed bottom-[8px] right-[8px] z-20 block laptop:hidden">
                    <div
                      className="relative w-[48px] h-[48px]"
                      ref={floatButtonRef}
                    >
                      {_.map(
                        [
                          {
                            icon: "fas fa-edit",
                            action: () => (context.isEditMode = true),
                          },
                        ],
                        (item, index) => (
                          <div
                            className={classNames(
                              "absolute w-[48px] top-0 h-[48px] rounded-full bg-gray-30 flex justify-center items-center z-10 duration-150 transform"
                            )}
                            style={{
                              top: -(isFloatButtonOpen ? 52 * (index + 1) : 0),
                            }}
                            onClick={item.action}
                          >
                            <i
                              className={`${item.icon} text-[16px] text-white`}
                            />
                          </div>
                        )
                      )}

                      <div
                        className="absolute rounded-full bg-gray-40 w-[48px] h-[48px] flex justify-center items-center z-20"
                        onClick={() =>
                          setTimeout(() => {
                            setIsFloatButtonOpen(!isFloatButtonOpen);
                          }, 150)
                        }
                      >
                        <i className="fas fa-ellipsis text-white text-[28px]" />
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>

            <div className="w-[137px] self-center mb-[32px] laptop:mb-[72px]">
              <Dropdown
                onChange={(e) => {
                  context.year = Number(e);
                  context.preparationStudentUnion();
                  context.preparationExperience(true);
                }}
                options={context.yearOptions}
                value={context.year.toString()}
              />
            </div>

            <UnionConcilSection
              addedUser={context.addedUser}
              studentList={context.studentList}
              isLoading={context.isStudentLoading}
              editMode={context.isEditMode}
              onEditUser={() => {
                context.isEditModalOpen = true;
              }}
              onOpenEditModal={() => {
                context.isEditModalOpen = true;
              }}
            />

            {context.isEditMode ? (
              <div className="flex justify-center space-x-[24px]">
                <Button
                  onClick={() => {
                    context.addedUser = [];
                    context.isEditMode = false;
                  }}
                  title={t("about_page_cancel_button")}
                  widthCss="w-[137px]"
                  heightCss="h-[40px] laptop:h-[52px]"
                />
                <Button
                  onClick={() => {
                    context.onSaveUnion(() => {
                      context.addedUser = [];
                      context.isEditMode = false;
                      context.preparationStudentUnion();
                      context.preparationYear();
                    });
                  }}
                  title={t("about_page_save_button")}
                  widthCss="w-[137px]"
                  heightCss="h-[40px] laptop:h-[52px]"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex justify-between w-full">
                  <div className="flex flex-col mb-[48px] laptop:mb-[64px] w-full">
                    <p className="heading3">
                      {t("about_page_experience_title")}
                    </p>
                    <div className="border-b border-black w-[110px]" />
                  </div>
                  {authContext.isPermission(["Publisher"]) && (
                    <Button
                      title={t("about_page_experience_create_button")}
                      onClick={() => {
                        router.push("/about/create");
                      }}
                      widthCss={"w-[137px]"}
                      heightCss={"laptop:h-[52px] h-[40px]"}
                    />
                  )}
                </div>
                {_.size(context.experienceList) !== 0 ? (
                  <div className="grid w-full grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-x-[32px] gap-y-[64px] mb-[32px] laptop:mb-[96px]">
                    {_.map(context.experienceList, (experience) => (
                      <PreviewCard
                        description={experience.news_details}
                        onClick={() =>
                          router.push(`/about/${experience.news_id}`)
                        }
                        src={
                          experience.news_img ||
                          "https://i.pinimg.com/564x/ca/75/fd/ca75fdad84c47b3f53b09514007596b5.jpg"
                        }
                        topic={experience.news_title}
                        timeStamp={experience.news_created_at}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="caption1">
                    {t("about_page_experience_no_experience")}
                  </p>
                )}
                {context.isFetchingExperience ? (
                  <Loading text="text-4xl" />
                ) : (
                  !context.isOutofContent && (
                    <Button
                      onClick={() => context.preparationExperience()}
                      title="load more"
                      widthCss="w-[137px]"
                    />
                  )
                )}
              </div>
            )}
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};
