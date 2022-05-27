import React, { useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { AuthContext } from "../../../core/context/auth.context";
import { useRouter } from "next/router";
import { MainLayout } from "../../../core/components/layout/main_layout";
import classNames from "classnames";
import { PetitionManageTable } from "../component/petition_manage_table";
import { petitionManageContext } from "../context/petition_manage.context";
import _ from "lodash";
import { Petition } from "../types/petetion_type";
import { PetitionTable } from "../component/petition_table";
import { ModalContext } from "../../../core/context/modal.context";

export const PetitionManage = () => {
  //---------------------
  //   STATE
  //---------------------
  const [filterType, setFilterType] = useState<"All" | "Reject" | "Done">(
    "All"
  );

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(petitionManageContext);
  const authContext = useContext(AuthContext);
  const modal = useContext(ModalContext);

  //---------------------
  //   ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    context.modal = modal;
    if (!authContext.isPermission(["Publisher"])) {
      router.push("/403");
    } else {
      context.preparation();
    }
  }, []);

  //---------------------
  //   HANDLED
  //---------------------
  function getShowPetition(): Array<Petition> {
    if (filterType === "All") {
      return context.petitionList;
    } else if (filterType === "Done") {
      return _.filter(
        context.petitionList,
        (petition) => petition.status.status_name === "Done"
      );
    } else if (filterType === "Reject") {
      return _.filter(
        context.petitionList,
        (petition) => petition.status.status_name === "Reject"
      );
    }

    return [];
  }

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <MainLayout>
          <div className="pb-[64px]">
            <div className="mt-[96px]">
              <div className="flex flex-col w-max">
                <div className="flex">
                  <div
                    className="laptop:w-[180px] w-[80px] flex justify-center py-[15px] cursor-pointer"
                    onClick={() => {
                      setFilterType("All");
                    }}
                  >
                    <p className="heading6">All</p>
                  </div>
                  <div
                    className="laptop:w-[180px] w-[80px] flex justify-center py-[15px] cursor-pointer"
                    onClick={() => {
                      setFilterType("Reject");
                    }}
                  >
                    <p className="heading6">Reject</p>
                  </div>
                  <div
                    className="laptop:w-[180px] w-[80px] flex justify-center py-[15px] cursor-pointer"
                    onClick={() => {
                      setFilterType("Done");
                    }}
                  >
                    <p className="heading6">Done</p>
                  </div>
                </div>

                <div className="w-full h-[2px] bg-gray-20">
                  <div
                    className={classNames(
                      "laptop:w-[180px] w-[80px] h-[2px] bg-gray-50 duration-150 transition-all",
                      {
                        "ml-[80px] laptop:ml-[180px]": filterType === "Reject",
                        "ml-[160px] laptop:ml-[360px]": filterType === "Done",
                      }
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="mt-[64px]">
              {_.size(getShowPetition()) > 0 ? (
                // <PetitionManageTable data={getShowPetition()} />
                <PetitionTable data={getShowPetition()} showUserId />
              ) : (
                <div className="flex justify-center">
                  <p className="body">No data</p>
                </div>
              )}
            </div>
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};
