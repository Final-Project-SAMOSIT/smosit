import React, { useContext } from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import _ from "lodash";
import { ModalContext } from "../../../core/context/modal.context";
import { positionMap } from "../types/user";

interface StudentUnionCardProps {
  image: string;
  name: string;
  position: string;
  onEdit?: () => void;
  onDelete?: () => void;
  isEditable?: boolean;
}

export const StudentUnionCard = (props: StudentUnionCardProps) => {
  const { i18n, t } = useTranslation("about");

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
                      t(
                        "about_page_student_union_delete_student_confirm_modal_title"
                      ),
                      t(
                        "about_page_student_union_delete_student_confirm_modal_message"
                      ),
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
