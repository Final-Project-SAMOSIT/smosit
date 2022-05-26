import React, { Fragment, useContext, useState } from "react";
import { Observer } from "mobx-react-lite";
import { Petition } from "../types/petetion_type";
import _ from "lodash";
import dayjs from "dayjs";
import classNames from "classnames";
import { Button } from "../../../core/components/input/button.component";
import { petitionManageContext } from "../context/petition_manage.context";

interface PetitionManageTableProps {
  data: Array<Petition>;
}

export const PetitionManageTable = (props: PetitionManageTableProps) => {
  const [focusOn, setFocusOn] = useState(-1);

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(petitionManageContext);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="grid grid-cols-10 gap-x-[16px] w-full">
          <div className="col-span-1 pb-[32px]">
            <p className="heading6">Date</p>
          </div>
          <div className="col-span-2 pb-[32px]">
            <p className="heading6">Topic</p>
          </div>
          <div className="col-span-2 pb-[32px]">
            <p className="heading6">Detail</p>
          </div>
          <div className="col-span-1 pb-[32px]">
            <p className="heading6">User ID</p>
          </div>
          <div className="col-span-2 pb-[32px] grid grid-cols-3">
            <p className="col-span-2 heading6">Status</p>
            <p className="heading6">Type</p>
          </div>
          <div className="col-span-2"></div>
          <div className="col-span-full h-[1px] bg-gray-40" />

          {_.map(props.data, (petition, index) => (
            <Fragment key={`petition_${petition.pet_id}`}>
              <div
                className={classNames("col-span-1 pt-[16px] pb-[8px] ", {
                  "h-[64px]": focusOn !== index,
                  "h-auto": focusOn === index,
                })}
              >
                <p className="body">
                  {dayjs(petition.pet_date, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
                    "D/M/YYYY"
                  )}
                </p>
              </div>
              <div className="col-span-2 pt-[16px] pb-[8px]">
                <p className="body">{petition.pet_topic}</p>
              </div>
              <div className="col-span-2 pt-[16px] pb-[8px] group">
                <p
                  className={classNames(
                    "body cursor-pointer transition-all duration-150",
                    {
                      "line-clamp-2 hover:text-gray-50 group-hover:pb-[8px]": index !== focusOn,
                    }
                  )}
                  onClick={() => {
                    setFocusOn(index === focusOn ? -1 : index);
                  }}
                >
                  {petition.pet_details}
                </p>
              </div>
              <div className="col-span-1 pt-[16px] pb-[8px]">
                <p className="body">{petition.user_id}</p>
              </div>
              <div className="grid grid-cols-3 col-span-2 pt-[12px]">
                <div className="border border-black rounded-[5px] h-[32px] px-[16px] flex items-center justify-center w-max col-span-2">
                  <p className="body">{petition.status.status_name}</p>
                </div>
                <p className="body">{petition.pet_types.pet_type_name}</p>
              </div>
              <div className="col-span-2 flex justify-end pr-[8px] pt-[8px] pb-[8px] space-x-[8px]">
                {petition.status.status_name === "Sent" && (
                  <Fragment>
                    <Button
                      onClick={() =>
                        context.onStatusChange("Reject", petition.pet_id)
                      }
                      title="Reject"
                      width={96}
                      height={40}
                    />
                    <Button
                      onClick={() =>
                        context.onStatusChange("Approve", petition.pet_id)
                      }
                      title="Approve"
                      width={96}
                      height={40}
                    />
                  </Fragment>
                )}
                {(petition.status.status_name === "Reject" ||
                  petition.status.status_name === "Done") && (
                  <Fragment>
                    <Button
                      onClick={() => context.onDelete(petition.pet_id)}
                      title="Delete"
                      width={96}
                      height={40}
                    />
                  </Fragment>
                )}
                {petition.status.status_name === "Approve" && (
                  <Fragment>
                    <Button
                      onClick={() =>
                        context.onStatusChange("In Progress", petition.pet_id)
                      }
                      title="In Progress"
                      width={144}
                      height={40}
                    />
                  </Fragment>
                )}
                {petition.status.status_name === "In Progress" && (
                  <Fragment>
                    <Button
                      onClick={() =>
                        context.onStatusChange("Done", petition.pet_id)
                      }
                      title="Done"
                      width={96}
                      height={40}
                    />
                  </Fragment>
                )}
              </div>
              <div className="col-span-full h-[1px] bg-gray-40" />
            </Fragment>
          ))}
        </div>
      )}
    </Observer>
  );
};
