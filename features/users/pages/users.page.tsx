import React, { useContext, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import { UsersContext } from "../context/users.context";
import { MainLayout } from "../../../core/components/layout/main_layout";
import _ from "lodash";
import { Dropdown } from "../../../core/components/input/dropdown_input";
import Loading from "../../../core/components/utility/loading";

export const UserPage = () => {
  //---------------------
  //   I18n
  //---------------------
  const { t, i18n } = useTranslation();

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(UsersContext);

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    context.userPreparation();
    context.rolePreparation();
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <MainLayout lite>
          <div className="space-y-[11px] mb-[64px] mt-[137px]">
            <p className="topic">การจัดการสิทธิ์ในการเข้าถึง</p>
            <div className="border-b border-black w-[284px]" />
          </div>

          <div className="flex flex-col w-max">
            <div className="flex pb-[32px] border-b border-gray-40">
              <p className="heading6 w-[240px]">ไอดีผู้ใช้งาน</p>
              <p className="heading6 w-[320px]">ชื่อผู้ใช้งาน</p>
              <p className="heading6 w-[160px]">สิทธิ์</p>
            </div>
            {context.isLoading ? (
              <div className="flex justify-center my-[16px]">
                <Loading text="text-7xl" />
              </div>
            ) : (
              _.map(context.userList, (user) => (
                <div className="flex border-b border-gray-40 h-[50px] items-center">
                  <p className="body w-[240px]">{user.user_id}</p>
                  <p className="body w-[320px]">
                    {i18n.language === "th" ? user.name_th : user.name_en}
                  </p>
                  <div className="w-[119px]">
                    <Dropdown
                      onChange={(e) =>
                        context.onChangeUserRole(user.user_id, e.toString())
                      }
                      options={context.RoleOptionList}
                      height={35}
                      value={user.role_id}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};
