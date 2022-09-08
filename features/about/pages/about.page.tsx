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
                Directory of student union
              </p>
              {!context.isEditMode && (
                <Fragment>
                  <div className="absolute right-0 hidden laptop:block">
                    <Button
                      onClick={() => (context.isEditMode = true)}
                      title="manage"
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
                          {
                            icon: "fas fa-plus",
                            action: () => (context.isEditModalOpen = true),
                          },
                        ],
                        (item, index) => (
                          <div
                            className={classNames(
                              "absolute w-[48px] top-0 h-[48px] rounded-full bg-gray-20 flex justify-center items-center z-10 duration-150 transform"
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
                            setIsFloatButtonOpen(true);
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
                <div className="flex justify-center w-full col-span-full">
                  <Loading text="text-4xl" />
                </div>
              ) : (
                <Fragment>
                  <div />
                  <StudentUnionCard
                    image={
                      getStudentList()[0]?.student_union_info.std_img || ""
                    }
                    name={_.join(
                      [
                        _.get(
                          getStudentList()[0],
                          `student_union_info.std_fname_${i18n.language}`
                        ),
                        _.get(
                          getStudentList()[0],
                          `student_union_info.std_lname_${i18n.language}`
                        ),
                      ],
                      " "
                    )}
                    position={
                      getStudentList()[0]?.std_position.position_name || ""
                    }
                    isEditable={context.isEditMode}
                    onDelete={() => {
                      context.onDelete(getStudentList()[0]?.union_id || "");
                    }}
                    onEdit={() => {
                      context.editingUser = {
                        unionId: getStudentList()[0]?.union_id || "",
                        userId: getStudentList()[0]?.std_id || "",
                        unionYear: context.year,
                      };
                      context.isEditModalOpen = true;
                    }}
                  />
                  <div />
                  {_.map(_.slice(getStudentList(), 1), (user) => (
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
                      isEditable={context.isEditMode}
                      onDelete={() => {
                        context.onDelete(user.union_id || "");
                      }}
                      onEdit={() => {
                        context.editingUser = {
                          unionId: user.union_id || "",
                          userId: user.std_id || "",
                          unionYear: context.year,
                        };
                        context.isEditModalOpen = true;
                      }}
                    />
                  ))}
                  {context.isEditMode && (
                    <div className="flex justify-center w-full h-max">
                      <div
                        className="w-[96px] tablet:w-[200px] aspect-square rounded-full border border-dashed border-gray-50 flex justify-center items-center group cursor-pointer"
                        onClick={() => {
                          context.isEditModalOpen = true;
                        }}
                      >
                        <i className="fas fa-plus text-[72px] text-gray-40 group-hover:text-gray-50 duration-150" />
                      </div>
                    </div>
                  )}
                </Fragment>
              )}
            </div>

            {context.isEditMode ? (
              <div className="flex justify-center space-x-[24px]">
                <Button
                  onClick={() => {
                    context.addedUser = [];
                    context.isEditMode = false;
                  }}
                  title="cancel"
                  widthCss="w-[137px]"
                  heightCss="h-[40px] laptop:h-[52px]"
                />
                <Button
                  onClick={() => {
                    context.onSaveUnion(() => {
                      context.addedUser = [];
                      context.isEditMode = false;
                      context.preparationStudentUnion();
                    });
                  }}
                  title="save"
                  widthCss="w-[137px]"
                  heightCss="h-[40px] laptop:h-[52px]"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="flex justify-between w-full">
                  <div className="flex flex-col mb-[48px] laptop:mb-[64px] w-full">
                    <p className="heading3">Work Experiences</p>
                    <div className="border-b border-black w-[110px]" />
                  </div>
                  {authContext.isPermission(["Publisher"]) && (
                    <Button
                      title="add post"
                      onClick={() => {
                        router.push("/about/create");
                      }}
                      widthCss={"w-[137px]"}
                      heightCss={"laptop:h-[52px] h-[40px]"}
                    />
                  )}
                </div>
                <div className="grid grid-cols-1 laptop:max-w-none max-w-[480px] laptop:grid-cols-3 gap-x-[32px] gap-y-[64px] mb-[32px] laptop:mb-[96px]">
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

interface StudentUnionCardProps {
  image: string;
  name: string;
  position: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isEditable?: boolean;
}

const StudentUnionCard = (props: StudentUnionCardProps) => {
  const { i18n } = useTranslation("about");

  const modalContext = useContext(ModalContext);

  return (
    <Observer>
      {() => (
        <div className="flex flex-col items-center">
          <div className="mb-[8px] laptop:mb-[20px] relative">
            {props.isEditable && (
              <div
                className="absolute flex items-center justify-center w-full h-full duration-150 bg-white bg-opacity-0 opacity-0 cursor-pointer hover:bg-opacity-60 hover:opacity-100"
                onClick={props.onEdit}
              >
                <i className="fas fa-edit text-[72px] text-white" />
              </div>
            )}
            {props.isEditable && (
              <div className="absolute tablet:top-0 top-[-4px] tablet:right-0 right-[-4px]">
                <i
                  className="cursor-pointer fas fa-trash-alt text-red-500 tablet:text-[16px] text-[14px]"
                  onClick={() => {
                    modalContext.openModal(
                      "Delete student",
                      "Are you sure you want to delete studen?",
                      props.onDelete
                    );
                  }}
                />
              </div>
            )}
            {props.image ? (
              <img
                src={props.image}
                className="w-[96px] tablet:w-[200px] rounded-full aspect-square mb-[8px] laptop:mb-[20px]"
                alt=""
              />
            ) : (
              <div className="bg-gray-20 w-[96px] tablet:w-[200px] rounded-full aspect-square flex justify-center items-center p-[8px]">
                <i className="fas fa-user text-[207px]" />
              </div>
            )}
          </div>
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
