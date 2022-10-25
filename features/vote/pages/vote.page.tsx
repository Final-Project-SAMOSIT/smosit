import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import { MainLayout } from "../../../core/components/layout/main_layout";
import { voteContext } from "../context/vote.context";
import { ModalContext } from "../../../core/context/modal.context";
import { Dropdown } from "../../../core/components/input/dropdown_input";
import { UnionConcilSection } from "../../about/components/union_concil_section.component";
import { Button } from "../../../core/components/input/button.component";
import { AuthContext } from "../../../core/context/auth.context";
import _ from "lodash";
import classNames from "classnames";
import { useClickOutside } from "../../../core/libs/click_detector";
import { UnionYearFormModal } from "../../about/components/union_year_form_modal.component";
import { UserFormModal } from "../../about/components/user_form_modal.component";
import { Position } from "../../about/types/user";
import { UnionYearVotingFormSection } from "../components/union_year_voting_form_modal.component";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Vote } from "../types/vote.types";

ChartJS.register(ArcElement, Tooltip, Legend);

export const VotePage = () => {
  //---------------------
  //   I18n
  //---------------------
  const { t, i18n } = useTranslation(["about", "vote"]);

  //---------------------
  //   STATE
  //---------------------
  const [isFloatButtonOpen, setIsFloatButtonOpen] = useState(false);

  //---------------------
  //   REF
  //---------------------
  const floatButtonRef = useRef<HTMLDivElement>(null);
  useClickOutside(floatButtonRef, () => {
    setIsFloatButtonOpen(false);
  });

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(voteContext);
  const modal = useContext(ModalContext);
  const authContext = useContext(AuthContext);

  //---------------------
  //   HANDLED
  //---------------------
  function getStudentList() {
    return [...context.studentList, ...context.addedUser];
  }

  function getVoteData() {
    return [
      context.voteDetail.accept,
      context.voteDetail.reject,
      context.voteDetail.noVote,
    ];
  }

  //---------------------
  //   EFFECTS
  //---------------------
  useEffect(() => {
    context.modal = modal;
    context.t = t;

    async function initPage() {
      context.preparationYear();
      context.preparationPositionOptions();
      await context.preparationUnacceptedYear();
      await context.votePreparation();
      context.preparationStudentUnion();
      if (authContext.isPermission(["Publisher"])) {
        context.voteCountPreparation();
      }
      if (authContext.isPermission(["Users"])) {
        context.userVotePreparation();
      }
    }
    initPage();
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <MainLayout>
          <div className="flex flex-col pb-[24px] mt-[32px] laptop:mt-[132px] mb-[72px] laptop:mb-[210px] items-center relative">
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
            <p className="heading2 border-b border-black w-max px-[16px] mb-[24px]">
              Voting management
            </p>
            {context.unAcceptedYearOption.length === 0 &&
              authContext.isPermission(["Publisher"]) && (
                <Fragment>
                  {_.findIndex(
                    context.creatableYearOptions,
                    (option) =>
                      option.name === new Date().getFullYear().toString()
                  ) === -1 ? (
                    <p className="caption1">
                      Student union is created for this year
                    </p>
                  ) : (
                    <UnionYearVotingFormSection />
                  )}
                </Fragment>
              )}

            {context.voteStatus !== "open" &&
              authContext.isPermission(["Users"]) && (
                <div className="flex items-center h-[320px]">
                  <p className="caption1">There's no concil to vote</p>
                </div>
              )}
            {!context.isEditMode && authContext.isPermission(["Publisher"]) && (
              <Fragment>
                <div className="absolute right-0 hidden laptop:flex space-x-[8px]">
                  {context.voteStatus === "prepare" &&
                    context.unAcceptedYearOption.length !== 0 && (
                      <Fragment>
                        <Button
                          onClick={() => context.deleteCurrentYear()}
                          title={"delete"}
                          widthCss="w-[137px]"
                          heightCss="h-[52px]"
                        />

                        <Button
                          onClick={() => (context.isEditMode = true)}
                          title={t("about_page_student_union_manage_button")}
                          widthCss="w-[137px]"
                          heightCss="h-[52px]"
                        />
                      </Fragment>
                    )}
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
            {(context.voteStatus === "open" ||
              (authContext.isPermission(["Publisher"]) &&
                context.voteStatus === "close")) && (
              <div className="w-[137px] self-center mb-[32px] laptop:mb-[72px]">
                <div className="rounded-[10px] border border-black h-[52px] w-[137px] flex items-center justify-center">
                  <p className="button">{context.year}</p>
                </div>
              </div>
            )}
            {context.voteStatus !== "prepare" &&
              authContext.isPermission(["Publisher"]) && (
                <div className="mb-[32px] grid tablet:grid-cols-2 grid-cols-1 gap-y-[16px] gap-x-[64px]">
                  <div className="w-11/12 mx-auto laptop:w-full">
                    <Pie
                      data={{
                        labels:
                          context.voteStatus === "close"
                            ? ["Accept", "Reject", "No Vote"]
                            : ["All Vote"],
                        datasets: [
                          {
                            data:
                              context.voteStatus === "close"
                                ? getVoteData()
                                : [context.voteDetail.voteCount],
                            backgroundColor:
                              context.voteStatus === "close"
                                ? [
                                    "rgba(41, 91, 141, 1)",
                                    "rgba(255, 0, 0, 1)",
                                    "rgba(193, 193, 193, 1)",
                                  ]
                                : ["rgba(193, 193, 193, 1)"],
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          legend: {
                            position: "bottom",
                            labels: {
                              pointStyle: "circle",
                              usePointStyle: true,
                              padding: 24,
                            },
                          },
                        },
                      }}
                      width={450}
                      height={450}
                    />
                  </div>
                  <div className="w-full h-full justify-center tablet:space-y-[24px] space-y-[16px] laptop:space-y-[32px] flex flex-col">
                    <p className="tablet:topic subheading1">
                      <span className="font-bold">Result:</span>{" "}
                      {context.voteDetail.voteCount || "0"} vote
                    </p>
                    <div>
                      <p className="tablet:heading5 subheading2">
                        <span className="font-bold">Accept:</span>{" "}
                        {context.voteDetail.accept || "-"} Vote
                      </p>
                      <p className="tablet:heading5 subheading2">
                        <span className="font-bold">Reject:</span>{" "}
                        {context.voteDetail.reject || "-"} Vote
                      </p>
                      <p className="tablet:heading5 subheading2">
                        <span className="font-bold">No vote:</span>{" "}
                        {context.voteDetail.noVote || "-"} Vote
                      </p>
                    </div>
                    <p className="caption2">
                      *If you consent in result of voting, please add all
                      information in Student Union.
                    </p>
                    <Button
                      onClick={() => context.onAcceptUnion()}
                      title="add to student union"
                      widthCss="laptop:w-[381px] tablet:w-[240px] w-[196px] tablet:mx-0 mx-auto"
                      heightCss="tablet:h-[52px] h-[40px]"
                      disabled={context.voteStatus !== "close"}
                    />
                  </div>
                </div>
              )}

            {((context.voteStatus === "open" &&
              authContext.isPermission(["Users"])) ||
              (authContext.isPermission(["Publisher"]) &&
                context.unAcceptedYearOption.length !== 0)) && (
              <UnionConcilSection
                addedUser={context.addedUser}
                studentList={context.studentList}
                isLoading={context.isStudentLoading}
                editMode={context.isEditMode}
                onEditUser={() => {
                  context.editingUser = {
                    unionId: getStudentList()[0]?.union_id || "",
                    userId: getStudentList()[0]?.std_id || "",
                    unionYear: context.year,
                  };
                  context.isEditModalOpen = true;
                }}
                onOpenEditModal={() => {
                  context.isEditModalOpen = true;
                }}
              />
            )}
            {authContext.isPermission(["Users"]) &&
              context.voteStatus === "open" &&
              (context.isVotable ? (
                <div className="space-y-[64px] flex flex-col items-center">
                  <p className="subtitle">
                    * เนื่องจากมีผู้สมัครเพียงพรรคเดียว
                    การลงคะแนนเสียงจะสามารถเลือกได้เพียง รับรอง ไม่รับรอง
                    หรือไม่ประสงค์ลงคะแนน
                  </p>
                  <div className="space-y-[24px]">
                    {_.map<Vote>(
                      ["ACCEPT", "REJECT", "NO_VOTE"],
                      (vote: Vote) => (
                        <Button
                          onClick={() =>
                            modal.openModal(
                              "Confirm vote",
                              `Do you want to confirm your vote as a(an) "${_.replace(
                                vote,
                                "_",
                                ""
                              )}"`,
                              () => context.onVote(vote)
                            )
                          }
                          title={_.replace(vote, "_", " ")}
                          widthCss="tablet:w-[381px] w-[240px]"
                          heightCss="h-[52px]"
                        />
                      )
                    )}
                  </div>
                </div>
              ) : (
                <Button
                  title="You have voted"
                  onClick={() => null}
                  widthCss="w-[160px]"
                  heightCss="h-[52px]"
                  disabled
                ></Button>
              ))}
            {context.isEditMode && (
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
            )}
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};
