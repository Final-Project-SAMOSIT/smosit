import React, { Fragment, useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { Petition } from "../types/petetion_type";
import classNames from "classnames";
import _ from "lodash";
import dayjs from "dayjs";
import { petitionManageContext } from "../context/petition_manage.context";
import { Button } from "../../../core/components/input/button.component";
import { AuthContext } from "../../../core/context/auth.context";

interface PetitionTableProps {
  data: Array<Petition>;
  showUserId?: boolean;
}

export const PetitionTable = (props: PetitionTableProps) => {
  //---------------------
  //   STATE
  //---------------------
  const [showingPetition, setshowingPetition] = useState("");

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(petitionManageContext);
  const authContext = useContext(AuthContext);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="flex flex-col items-center w-full space-y-[70px]">
          {props.data.length === 0 ? (
            <div>no Data</div>
          ) : (
            <div className="grid w-full grid-cols-6 laptop:grid-cols-10 gap-x-[16px]">
              <div className="col-span-2 laptop:pb-[38px] pb-[24px] col-start-2 laptop:block hidden">
                <p className="heading6">date</p>
              </div>
              <div className="laptop:col-span-2 col-span-3 laptop:pb-[38px] pb-[24px]">
                <p className="heading6">topic</p>
              </div>
              <div className="col-span-2 laptop:pb-[38px] pb-[24px]">
                <p className="heading6">type</p>
              </div>
              <div className="col-span-2 laptop:pb-[38px] pb-[24px] laptop:block hidden">
                <p className="heading6">status</p>
              </div>
              <div className="col-span-1 laptop:pb-[38px] pb-[24px]" />
              <div className="border-b border-gray-40 col-span-full" />

              {_.map(props.data, (petition) => (
                <Fragment>
                  <div className="col-span-2 col-start-2 min-h-[50px] laptop:flex items-center hidden">
                    <p className="body">
                      {dayjs(
                        petition.pet_date,
                        "YYYY-MM-DDTHH:mm:ss.SSSZ"
                      ).format("D/M/YYYY")}
                    </p>
                  </div>
                  <div className="laptop:col-span-2 col-span-3 min-h-[50px] flex items-center">
                    <p className="body line-clamp-2">{petition.pet_topic}</p>
                  </div>
                  <div className="col-span-2 min-h-[50px] flex items-center">
                    <p className="body">{petition.pet_types.pet_type_name}</p>
                  </div>
                  <div className="col-span-2 min-h-[50px] items-center laptop:flex hidden">
                    <p className="body">{petition.status.status_name}</p>
                  </div>
                  <div className="col-span-1 min-h-[50px] flex items-center">
                    <i
                      className={classNames(
                        "fa-solid fa-angle-right p-[4px] cursor-pointer transition-all duration-150",
                        {
                          "rotate-90": showingPetition === petition.pet_id,
                        }
                      )}
                      onClick={() =>
                        setshowingPetition(
                          showingPetition === petition.pet_id
                            ? ""
                            : petition.pet_id
                        )
                      }
                    />
                  </div>

                  {/* expand detail */}
                  <div
                    className={classNames(
                      "col-span-full overflow-y-auto transition-all flex flex-col items-center justify-center duration-300 relative",
                      {
                        "h-0 py-0": showingPetition !== petition.pet_id,
                        "h-full py-[16px]": showingPetition === petition.pet_id,
                      }
                    )}
                  >
                    <div className="flex justify-center space-x-[8px] laptop:space-x-[25px] items-center relative">
                      <div className="laptop:w-[76px] laptop:h-[76px] h-[32px] w-[32px] rounded-full bg-gray-30 flex items-end justify-center">
                        <p className="bottom-[-28px] absolute body w-max ">
                          <span className="laptop:text-[16px] text-[12px]">
                            Sent Form
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
                          className={classNames(
                            "absolute body w-max flex flex-col",
                            {
                              "bottom-[-28px]":
                                Number(petition.status_id) !== 1,
                              "bottom-[-46px] laptop:bottom-[-52px]":
                                Number(petition.status_id) === 1,
                            }
                          )}
                        >
                          {Number(petition.status_id) >= 1 &&
                            Number(petition.status_id) !== 5 && (
                              <span className="laptop:text-[16px] text-[12px]">
                                Approve
                              </span>
                            )}
                          {Number(petition.status_id) === 5 && (
                            <span className="laptop:text-[16px] text-[12px]">
                              Reject
                            </span>
                          )}
                          {Number(petition.status_id) === 1 && (
                            <span className="laptop:text-[16px] text-[12px]">
                              / Reject
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
                            In Progress
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
                            Done
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
                                <p className="caption1">Topic:</p>
                              </td>
                              <td>
                                <p className="caption1 pl-[8px]">
                                  {petition.pet_topic}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="flex items-start">
                                <p className="caption1">Type:</p>
                              </td>
                              <td>
                                <p className="caption1 pl-[8px]">
                                  {petition.pet_types.pet_type_name}
                                </p>
                              </td>
                            </tr>
                            {props.showUserId && (
                              <tr>
                                <td className="flex items-start">
                                  <p className="caption1">User ID:</p>
                                </td>
                                <td>
                                  <p className="caption1 pl-[8px]">
                                    {petition.user_id}
                                  </p>
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td className="flex items-start">
                                <p className="caption1">Detail:</p>
                              </td>
                              <td>
                                <p className="caption1 pl-[8px]">
                                  {petition.pet_details}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="flex items-start">
                                <p className="caption1">Date:</p>
                              </td>
                              <td>
                                <p className="caption1 pl-[8px]">
                                  {dayjs(
                                    petition.pet_date,
                                    "YYYY-MM-DDTHH:mm:ss.SSSZ"
                                  ).format("D/M/YYYY")}
                                </p>
                              </td>
                            </tr>
                            <tr>
                              <td className="flex items-start">
                                <p className="caption1">Status:</p>
                              </td>
                              <td>
                                <p className="caption1 pl-[8px]">
                                  {petition.status.status_description}
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
                                    context.onStatusChange(
                                      "Reject",
                                      petition.pet_id
                                    )
                                  }
                                  title="Reject"
                                  widthCss="w-[72px] laptop:w-[96px]"
                                  heightCss="h-[32px] laptop:h-[40px]"
                                />
                                <Button
                                  onClick={() =>
                                    context.onStatusChange(
                                      "Approve",
                                      petition.pet_id
                                    )
                                  }
                                  title="Approve"
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
                                    context.onDelete(petition.pet_id)
                                  }
                                  title="Delete"
                                  widthCss="w-[72px] laptop:w-[96px]"
                                  heightCss="h-[32px] laptop:h-[40px]"
                                />
                              </Fragment>
                            )}
                            {petition.status.status_name === "Approve" && (
                              <Fragment>
                                <Button
                                  onClick={() =>
                                    context.onStatusChange(
                                      "In Progress",
                                      petition.pet_id
                                    )
                                  }
                                  title="In Progress"
                                  widthCss="laptop:w-[144px] w-[96px]"
                                  heightCss="h-[32px] laptop:h-[40px]"
                                />
                              </Fragment>
                            )}
                            {petition.status.status_name === "In Progress" && (
                              <Fragment>
                                <Button
                                  onClick={() =>
                                    context.onStatusChange(
                                      "Done",
                                      petition.pet_id
                                    )
                                  }
                                  title="Done"
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

                  <div className="border-b border-gray-40 col-span-full" />
                </Fragment>
              ))}
            </div>
          )}
        </div>
      )}
    </Observer>
  );
};
