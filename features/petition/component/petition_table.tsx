import React, { Fragment, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { Petition } from "../types/petetion_type";
import classNames from "classnames";
import _ from "lodash";
import dayjs from "dayjs";

interface PetitionTableProps {
  data: Array<Petition>;
}

export const PetitionTable = (props: PetitionTableProps) => {
  //---------------------
  //   STATE
  //---------------------
  const [filterType, setFilterType] = useState("Pending");
  const [showingPetition, setshowingPetition] = useState("");

  //---------------------
  //   HANDLED
  //---------------------
  function getShowPetition() {
    return _.filter(props.data, (petition) =>
      filterType === "Completed"
        ? petition.status.status_name === "Done"
        : petition.status.status_name !== "Done"
    );
  }

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="flex flex-col items-center w-full space-y-[70px]">
          <p className="title pb-[15px] border-b border-black px-[12px]">
            Status
          </p>
          <div className="flex flex-col laptop:w-[360px] w-[300px] justify-center space-y-[16px]">
            <div className="flex w-full">
              <div
                className="flex justify-center w-1/2 cursor-pointer select-none"
                onClick={() => setFilterType("Pending")}
              >
                <p className="heading6">pending</p>
              </div>
              <div
                className="flex justify-center w-1/2 cursor-pointer select-none"
                onClick={() => setFilterType("Completed")}
              >
                <p className="heading6">completed</p>
              </div>
            </div>
            <div className="laptop:w-[360px] w-[300px] h-[2px] bg-gray-20">
              <div
                className={classNames(
                  "w-1/2 h-full bg-gray-50 transition-all duration-200",
                  {
                    "ml-[150px] laptop:ml-[180px]": filterType === "Completed",
                  }
                )}
              />
            </div>
          </div>

          {getShowPetition().length === 0 ? (
            <div>no Data</div>
          ) : (
            <div className="grid w-full grid-cols-6 laptop:grid-cols-10">
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

              {_.map(getShowPetition(), (petition) => (
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
                    <p className="body">{petition.pet_topic}</p>
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
                      "col-span-full overflow-y-hidden transition-all flex flex-col items-center justify-center duration-300 relative",
                      {
                        "h-0 pb-0": showingPetition !== petition.pet_id,
                        "h-[256px]": showingPetition === petition.pet_id,
                      }
                    )}
                  >
                    <div className="flex justify-center space-x-[8px] laptop:space-x-[25px] items-center relative">
                      <div className="laptop:w-[76px] laptop:h-[76px] h-[24px] w-[24px] rounded-full bg-gray-30 flex items-end justify-center">
                        <p className="bottom-[-28px] absolute body w-max ">
                          <span className="laptop:text-[14px] text-[12px]">
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
                          "laptop:w-[160px] w-[24px] laptop:h-[6px] h-[3px] bg-gray-30",
                          {
                            "bg-black": Number(petition.status_id) >= 2,
                          }
                        )}
                      />
                      <div className="laptop:w-[76px] laptop:h-[76px] h-[24px] w-[24px] rounded-full bg-gray-30 flex items-end justify-center relative">
                        <p className="bottom-[-28px] absolute body w-max flex flex-col">
                          {Number(petition.status_id) > 1 &&
                            Number(petition.status_id) !== 5 && (
                              <span className="laptop:text-[14px] text-[12px]">
                                Approve
                              </span>
                            )}
                          {Number(petition.status_id) === 5 && (
                            <span className="laptop:text-[14px] text-[12px]">
                              Reject
                            </span>
                          )}
                          {Number(petition.status_id) === 1 && (
                            <span className="laptop:text-[14px] text-[12px]">
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
                          "laptop:w-[160px] w-[24px] laptop:h-[6px] h-[3px] bg-gray-30",
                          {
                            "bg-black":
                              Number(petition.status_id) >= 3 &&
                              Number(petition.status_id) !== 5,
                          }
                        )}
                      />
                      <div className="laptop:w-[76px] laptop:h-[76px] h-[24px] w-[24px] rounded-full bg-gray-30 flex items-end justify-center relative">
                        <p className="bottom-[-28px] absolute body w-max ">
                          <span className="laptop:text-[14px] text-[12px]">
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
                          "laptop:w-[160px] w-[24px] laptop:h-[6px] h-[3px] bg-gray-30",
                          {
                            "bg-black":
                              Number(petition.status_id) >= 4 &&
                              Number(petition.status_id) !== 5,
                          }
                        )}
                      />
                      <div className="laptop:w-[76px] laptop:h-[76px] h-[24px] w-[24px] rounded-full bg-gray-30 flex items-end justify-center relative">
                        <p className="bottom-[-28px] absolute body w-max ">
                          <span className="laptop:text-[14px] text-[12px]">
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
                            <tr className="laptop:hidden">
                              <td className="flex items-start">
                                <p className="caption1">Topic:</p>
                              </td>
                              <td>
                                <p className="caption1 pl-[8px]">
                                  {petition.pet_topic}
                                </p>
                              </td>
                            </tr>
                            <tr className="laptop:hidden">
                              <td className="flex items-start">
                                <p className="caption1">Type:</p>
                              </td>
                              <td>
                                <p className="caption1 pl-[8px]">
                                  {petition.pet_types.pet_type_name}
                                </p>
                              </td>
                            </tr>
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
                            <tr className="laptop:hidden">
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
