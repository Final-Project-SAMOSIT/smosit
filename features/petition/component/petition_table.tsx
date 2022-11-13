import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Observer } from "mobx-react-lite";
import { Petition } from "../types/petetion_type";
import classNames from "classnames";
import _ from "lodash";
import dayjs from "dayjs";
import { petitionManageContext } from "../context/petition_manage.context";
import { Button } from "../../../core/components/input/button.component";
import { AuthContext } from "../../../core/context/auth.context";
import { ModalContext } from "../../../core/context/modal.context";
import { useTranslation } from "next-i18next";

interface PetitionTableProps {
  data: Array<Petition>;
  showUserId?: boolean;
}

export const PetitionTable = (props: PetitionTableProps) => {
  //---------------------
  //   i18n
  //---------------------
  const { t } = useTranslation("petition");

  //---------------------
  //   STATE
  //---------------------
  const [showingPetition, setshowingPetition] = useState("");

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="flex flex-col items-center w-full space-y-[70px]">
          {props.data.length === 0 ? (
            <div>{t("petition_table_empty")}</div>
          ) : (
            <div className="grid w-full grid-cols-6 laptop:grid-cols-10 gap-x-[16px]">
              <div className="col-span-2 laptop:pb-[38px] pb-[24px] col-start-2 laptop:block hidden">
                <p className="heading6">
                  {t("petition_table_date_column_header")}
                </p>
              </div>
              <div className="laptop:col-span-2 col-span-3 laptop:pb-[38px] pb-[24px]">
                <p className="heading6">
                  {t("petition_table_topic_column_header")}
                </p>
              </div>
              <div className="col-span-2 laptop:pb-[38px] pb-[24px]">
                <p className="heading6">
                  {t("petition_table_type_column_header")}
                </p>
              </div>
              <div className="col-span-2 laptop:pb-[38px] pb-[24px] laptop:block hidden">
                <p className="heading6">
                  {t("petition_table_status_column_header")}
                </p>
              </div>
              <div className="col-span-1 laptop:pb-[38px] pb-[24px]" />
              <div className="border-b border-gray-40 col-span-full" />

              {_.map(props.data, (petition) => (
                <PetitionRow
                  petition={petition}
                  isShow={showingPetition === petition.petition_id}
                  onShow={() => {
                    if (showingPetition === petition.petition_id) {
                      setshowingPetition("");
                    } else {
                      setshowingPetition(petition.petition_id);
                    }
                  }}
                  showUserId={props.showUserId}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </Observer>
  );
};

interface PetitionRowProps {
  petition: Petition;
  isShow: boolean;
  onShow: () => void;
  showUserId?: boolean;
}

const PetitionRow = (props: PetitionRowProps) => {
  //---------------------
  //   PROPS
  //---------------------
  const { petition, isShow, onShow, showUserId } = props;

  //---------------------
  //   i18n
  //---------------------
  const { t } = useTranslation("petition");

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(petitionManageContext);
  const authContext = useContext(AuthContext);
  const modalContext = useContext(ModalContext);

  //---------------------
  //   REF
  //---------------------
  const detailRef = useRef<HTMLDivElement>(null);

  //---------------------
  //   HANDLED
  //---------------------
  function getSimpleText(text: string) {
    return _.toLower(_.replace(text, " ", ""));
  }

  //---------------------
  //   RENDER
  //---------------------
  return (
    <div
      className="col-span-full grid grid-cols-6 laptop:grid-cols-10 gap-x-[16px] duration-300 transform border-b border-gray-40 overflow-y-hidden"
      style={{
        height: (isShow ? (detailRef.current?.clientHeight || 0) + 48 : 0) + 51,
        paddingBottom: isShow ? 24 : 0,
      }}
    >
      <div className="col-span-2 col-start-2 min-h-[50px] laptop:flex items-center hidden">
        <p className="body">
          {dayjs(petition.petition_date, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
            "D/M/YYYY"
          )}
        </p>
      </div>
      <div className="laptop:col-span-2 col-span-3 min-h-[50px] flex items-center">
        <p className="body line-clamp-2">{petition.petition_topic}</p>
      </div>
      <div className="col-span-2 min-h-[50px] flex items-center">
        <p className="body">
          {t(
            `petition_type_${getSimpleText(
              petition.petition_types.petition_type_name
            )}`
          )}
        </p>
      </div>
      <div className="col-span-2 min-h-[50px] items-center laptop:flex hidden">
        <p className="body">
          {t(`petition_status_${getSimpleText(petition.status.status_name)}`)}
        </p>
      </div>
      <div className="col-span-1 min-h-[50px] flex items-center">
        <i
          className={classNames(
            "fa-solid fa-angle-right p-[4px] cursor-pointer transition-all duration-150",
            {
              "rotate-90": isShow,
            }
          )}
          onClick={() => {
            onShow();
            console.log(detailRef.current?.clientHeight);
          }}
        />
      </div>

      {/* expand detail */}
      <div
        className={classNames(
          "col-span-full flex flex-col items-center justify-center relative duration-300 transition-all",
          {
            "pt-[24px]": isShow,
          }
        )}
        ref={detailRef}
      >
        <div className="flex justify-center space-x-[8px] laptop:space-x-[25px] items-center relative">
          <div className="laptop:w-[76px] laptop:h-[76px] h-[32px] w-[32px] rounded-full bg-gray-30 flex items-end justify-center">
            <p className="bottom-[-28px] absolute body w-max ">
              <span className="laptop:text-[16px] text-[12px]">
                {t("petition_status_sent")}
              </span>
            </p>
            {Number(petition.status_id) >= 1 && (
              <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                <i className="text-white laptop:text-5xl text-md fas fa-check"></i>
              </div>
            )}
          </div>
          <div
            className={classNames(
              "laptop:w-[160px] w-[36px] laptop:h-[6px] h-[3px] bg-gray-30",
              {
                "bg-black": Number(petition.status_id) >= 2,
              }
            )}
          />
          <div className="laptop:w-[76px] laptop:h-[76px] h-[32px] w-[32px] rounded-full bg-gray-30 flex items-end justify-center relative">
            <p
              className={classNames("absolute body w-max flex flex-col", {
                "bottom-[-28px]": Number(petition.status_id) !== 1,
                "bottom-[-46px] laptop:bottom-[-52px]":
                  Number(petition.status_id) === 1,
              })}
            >
              {Number(petition.status_id) >= 1 &&
                Number(petition.status_id) !== 5 && (
                  <span className="laptop:text-[16px] text-[12px]">
                    {t("petition_status_approve")}
                  </span>
                )}
              {Number(petition.status_id) === 5 && (
                <span className="laptop:text-[16px] text-[12px]">
                  {t("petition_status_reject")}
                </span>
              )}
              {Number(petition.status_id) === 1 && (
                <span className="laptop:text-[16px] text-[12px]">
                  / {t("petition_status_reject")}
                </span>
              )}
            </p>
            {Number(petition.status_id) >= 2 && (
              <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                <i className="text-white laptop:text-5xl text-md fas fa-check"></i>
              </div>
            )}
          </div>
          <div
            className={classNames(
              "laptop:w-[160px] w-[36px] laptop:h-[6px] h-[3px] bg-gray-30",
              {
                "bg-black":
                  Number(petition.status_id) >= 3 &&
                  Number(petition.status_id) !== 5,
              }
            )}
          />
          <div className="laptop:w-[76px] laptop:h-[76px] h-[32px] w-[32px] rounded-full bg-gray-30 flex items-end justify-center relative">
            <p className="bottom-[-28px] absolute body w-max ">
              <span className="laptop:text-[16px] text-[12px]">
                {t("petition_status_inprogress")}
              </span>
            </p>
            {Number(petition.status_id) >= 3 &&
              Number(petition.status_id) !== 5 && (
                <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                  <i className="text-white laptop:text-5xl text-md fas fa-check"></i>
                </div>
              )}
          </div>
          <div
            className={classNames(
              "laptop:w-[160px] w-[36px] laptop:h-[6px] h-[3px] bg-gray-30",
              {
                "bg-black":
                  Number(petition.status_id) >= 4 &&
                  Number(petition.status_id) !== 5,
              }
            )}
          />
          <div className="laptop:w-[76px] laptop:h-[76px] h-[32px] w-[32px] rounded-full bg-gray-30 flex items-end justify-center relative">
            <p className="bottom-[-28px] absolute body w-max ">
              <span className="laptop:text-[16px] text-[12px]">
                {t("petition_status_done")}
              </span>
            </p>
            {Number(petition.status_id) >= 4 &&
              Number(petition.status_id) !== 5 && (
                <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                  <i className="text-white laptop:text-5xl text-md fas fa-check"></i>
                </div>
              )}
          </div>
        </div>
        <div className="grid w-full grid-cols-10">
          <div className="mt-[48px] col-span-9 col-start-2 space-y-[8px]">
            <table className="">
              <tbody>
                <tr>
                  <td className="flex items-start">
                    <p className="caption1">
                      {t("petition_table_detail_title_topic")}:
                    </p>
                  </td>
                  <td>
                    <p className="caption1 pl-[8px]">
                      {petition.petition_topic}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="flex items-start">
                    <p className="caption1">
                      {t("petition_table_detail_title_type")}:
                    </p>
                  </td>
                  <td>
                    <p className="caption1 pl-[8px]">
                      {t(
                        `petition_type_${getSimpleText(
                          petition.petition_types.petition_type_name
                        )}`
                      )}
                    </p>
                  </td>
                </tr>
                {showUserId && (
                  <tr>
                    <td className="flex items-start">
                      <p className="caption1">
                        {t("petition_table_detail_title_userid")}:
                      </p>
                    </td>
                    <td>
                      <p className="caption1 pl-[8px]">{petition.user_id}</p>
                    </td>
                  </tr>
                )}
                <tr>
                  <td className="flex items-start">
                    <p className="caption1">
                      {t("petition_table_detail_title_detail")}:
                    </p>
                  </td>
                  <td>
                    <p className="caption1 pl-[8px]">
                      {petition.petition_details}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <img
                      src={petition.petition_img}
                      className="aspect-[4/3] laptop:w-3/5 w-full max-h-[480px] object-contain"
                      onClick={() => null}
                      alt=""
                    />
                  </td>
                </tr>
                <tr>
                  <td className="flex items-start">
                    <p className="caption1">
                      {t("petition_table_detail_title_date")}:
                    </p>
                  </td>
                  <td>
                    <p className="caption1 pl-[8px]">
                      {dayjs(
                        petition.petition_date,
                        "YYYY-MM-DDTHH:mm:ss.SSSZ"
                      ).format("D/M/YYYY")}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className="flex items-start">
                    <p className="caption1">
                      {t("petition_table_detail_title_status")}:
                    </p>
                  </td>
                  <td>
                    <p className="caption1 pl-[8px]">
                      {t(
                        `petition_status_${getSimpleText(
                          petition.status.status_name
                        )}`
                      )}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {authContext.isPermission(["Publisher"]) && (
              <div className="flex space-x-[8px]">
                {petition.status.status_name === "Sent" && (
                  <Fragment>
                    <Button
                      onClick={() =>
                        modalContext.openModal(
                          t("petition_modal_edit_peition_title"),
                          t("petition_modal_edit_peition_message"),
                          () => {
                            context.onStatusChange(
                              "Reject",
                              petition.petition_id
                            );
                          }
                        )
                      }
                      title={t("petition_status_reject")}
                      widthCss="w-[72px] laptop:w-[96px]"
                      heightCss="h-[32px] laptop:h-[40px]"
                    />
                    <Button
                      onClick={() =>
                        modalContext.openModal(
                          t("petition_modal_edit_peition_title"),
                          t("petition_modal_edit_peition_message"),
                          () => {
                            context.onStatusChange(
                              "Approve",
                              petition.petition_id
                            );
                          }
                        )
                      }
                      title={t("petition_status_approve")}
                      widthCss="w-[72px] laptop:w-[96px]"
                      heightCss="h-[32px] laptop:h-[40px]"
                    />
                  </Fragment>
                )}
                {(petition.status.status_name === "Reject" ||
                  petition.status.status_name === "Done") && (
                  <Fragment>
                    <Button
                      onClick={() =>
                        modalContext.openModal(
                          t("petition_modal_delete_peition_title"),
                          t("petition_modal_delete_peition_message"),
                          () => {
                            context.onDelete(petition.petition_id);
                          }
                        )
                      }
                      title={t("petition_status_delete")}
                      widthCss="w-[72px] laptop:w-[96px]"
                      heightCss="h-[32px] laptop:h-[40px]"
                    />
                  </Fragment>
                )}
                {petition.status.status_name === "Approve" && (
                  <Fragment>
                    <Button
                      onClick={() =>
                        modalContext.openModal(
                          t("petition_modal_edit_peition_title"),
                          t("petition_modal_edit_peition_message"),
                          () => {
                            context.onStatusChange(
                              "In Progress",
                              petition.petition_id
                            );
                          }
                        )
                      }
                      title={t("petition_status_inprogress")}
                      widthCss="laptop:w-[144px] w-[96px]"
                      heightCss="h-[32px] laptop:h-[40px]"
                    />
                  </Fragment>
                )}
                {petition.status.status_name === "In Progress" && (
                  <Fragment>
                    <Button
                      onClick={() =>
                        modalContext.openModal(
                          t("petition_modal_edit_peition_title"),
                          t("petition_modal_edit_peition_message"),
                          () => {
                            context.onStatusChange(
                              "Done",
                              petition.petition_id
                            );
                          }
                        )
                      }
                      title={t("petition_status_done")}
                      widthCss="w-[72px] laptop:w-[96px]"
                      heightCss="h-[32px] laptop:h-[40px]"
                    />
                  </Fragment>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
