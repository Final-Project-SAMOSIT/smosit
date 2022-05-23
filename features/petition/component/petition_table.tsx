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
        ? petition.status.status_name === "Completed"
        : petition.status_id !== "Completed"
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
          <div className="flex flex-col w-[360px] justify-center space-y-[16px]">
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
            <div className="w-[360px] h-[2px] bg-gray-20">
              <div
                className={classNames(
                  "w-1/2 h-full bg-gray-50 transition-all duration-200",
                  {
                    "ml-[180px]": filterType === "Completed",
                  }
                )}
              />
            </div>
          </div>

          {getShowPetition().length === 0 ? (
            <div>no Data</div>
          ) : (
            <div className="grid w-full grid-cols-10">
              <div className="col-span-2 pb-[38px] col-start-2">
                <p className="heading6">date</p>
              </div>
              <div className="col-span-2 pb-[38px]">
                <p className="heading6">topic</p>
              </div>
              <div className="col-span-2 pb-[38px]">
                <p className="heading6">type</p>
              </div>
              <div className="col-span-2 pb-[38px]">
                <p className="heading6">status</p>
              </div>
              <div className="col-span-1 pb-[38px]" />
              <div className="border-b border-gray-40 col-span-full" />

              {_.map(getShowPetition(), (petition) => (
                <Fragment>
                  <div className="col-span-2 col-start-2 min-h-[50px] flex items-center">
                    <p className="body">
                      {dayjs(
                        petition.pet_date,
                        "YYYY-MM-DDTHH:mm:ss.SSSZ"
                      ).format("D/M/YYYY")}
                    </p>
                  </div>
                  <div className="col-span-2 min-h-[50px] flex items-center">
                    <p className="body">{petition.pet_topic}</p>
                  </div>
                  <div className="col-span-2 min-h-[50px] flex items-center">
                    <p className="body">{petition.pet_types.pet_type_name}</p>
                  </div>
                  <div className="col-span-2 min-h-[50px] flex items-center">
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

                  <div
                    className={classNames(
                      "col-span-full overflow-y-hidden transition-all flex items-center justify-center duration-300 relative",
                      {
                        "h-0 pb-0": showingPetition !== petition.pet_id,
                        "h-[256px] pb-[48px]":
                          showingPetition === petition.pet_id,
                      }
                    )}
                  >
                    <div className="flex justify-center space-x-[25px] items-center relative">
                      <div className="w-[76px] h-[76px] rounded-full bg-gray-30 flex items-end justify-center">
                        <p className="transition translate-y-[28px] absolute body w-max ">
                          Sent Form
                        </p>
                        {Number(petition.status_id) >= 1 && (
                          <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                            <i className="text-5xl text-white fas fa-check"></i>
                          </div>
                        )}
                      </div>
                      <div className="w-[160px] h-[6px] bg-gray-30" />
                      <div className="w-[76px] h-[76px] rounded-full bg-gray-30 flex items-end justify-center relative">
                        <p className="transition translate-y-[28px] absolute body w-max ">
                          Approve / Reject
                        </p>
                        {Number(petition.status_id) >= 2 && (
                          <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                            <i className="text-5xl text-white fas fa-check"></i>
                          </div>
                        )}
                      </div>
                      <div className="w-[160px] h-[6px] bg-gray-30" />
                      <div className="w-[76px] h-[76px] rounded-full bg-gray-30 flex items-end justify-center relative">
                        <p className="transition translate-y-[28px] absolute body w-max ">
                          In Progress
                        </p>
                        {Number(petition.status_id) >= 3 && (
                          <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                            <i className="text-5xl text-white fas fa-check"></i>
                          </div>
                        )}
                      </div>
                      <div className="w-[160px] h-[6px] bg-gray-30" />
                      <div className="w-[76px] h-[76px] rounded-full bg-gray-30 flex items-end justify-center relative">
                        <p className="transition translate-y-[28px] absolute body w-max ">
                          Done
                        </p>
                        {Number(petition.status_id) >= 4 && (
                          <div className="flex items-center justify-center w-full h-full bg-black rounded-full">
                            <i className="text-5xl text-white fas fa-check"></i>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="absolute bottom-[48px] left-[72px] caption1">
                      Detail: {petition.status.status_description}
                    </p>
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
