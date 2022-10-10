import React, { Fragment, useContext } from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import Loading from "../../../core/components/utility/loading";
import _ from "lodash";
import { User } from "../types/user";
import { aboutContext } from "../contexts/about.context";
import { StudentUnionCard } from "./student_union_card.component";

interface UnionConcilSectionProps {
  isLoading?: boolean;
  studentList: Array<User>;
  addedUser: Array<User>;
  editMode?: boolean;
  onEditUser: () => void;
  onOpenEditModal: () => void;
}

export const UnionConcilSection = (props: UnionConcilSectionProps) => {
  //---------------------
  //   I18n
  //---------------------
  const { t, i18n } = useTranslation("about");

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(aboutContext);

  //---------------------
  //   HANDLED
  //---------------------
  function getStudentList() {
    return [...props.studentList, ...props.addedUser];
  }

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="grid grid-cols-3 gap-y-[24px] laptop:gap-y-[32px] gap-x-[16px] mb-[72px] laptop:mb-[112px]">
          {props.isLoading ? (
            <div className="flex justify-center w-full col-span-full">
              <Loading text="text-4xl" />
            </div>
          ) : (
            _.size(props.studentList) + _.size(props.addedUser) !== 0 && (
              <Fragment>
                <div />
                <StudentUnionCard
                  image={getStudentList()[0]?.student_union_info.std_img || ""}
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
                  isEditable={props.editMode}
                  onDelete={() => {
                    context.onDelete(getStudentList()[0]?.union_id || "");
                  }}
                  onEdit={props.onEditUser}
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
                    isEditable={props.editMode}
                    onDelete={() => {
                      context.onDelete(user.union_id || "");
                    }}
                    onEdit={props.onEditUser}
                  />
                ))}
                {props.editMode && (
                  <div className="flex justify-center w-full h-max">
                    <div
                      className="w-[96px] tablet:w-[200px] aspect-square rounded-full border border-dashed border-gray-50 flex justify-center items-center group cursor-pointer"
                      onClick={props.onOpenEditModal}
                    >
                      <i className="fas fa-plus text-[72px] text-gray-40 group-hover:text-gray-50 duration-150" />
                    </div>
                  </div>
                )}
              </Fragment>
            )
          )}

          {props.editMode &&
            _.size(props.studentList) + _.size(props.addedUser) === 0 && (
              <div className="flex justify-center w-full h-max col-span-full">
                <div
                  className="w-[96px] tablet:w-[200px] aspect-square rounded-full border border-dashed border-gray-50 flex justify-center items-center group cursor-pointer"
                  onClick={props.onOpenEditModal}
                >
                  <i className="fas fa-plus text-[72px] text-gray-40 group-hover:text-gray-50 duration-150" />
                </div>
              </div>
            )}

          {!props.editMode &&
            _.size(props.studentList) + _.size(props.addedUser) === 0 && (
              <p className="col-span-full caption1 text-center">
                {t("about_page_student_union_no_student")}
              </p>
            )}
        </div>
      )}
    </Observer>
  );
};
