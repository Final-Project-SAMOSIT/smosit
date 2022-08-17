import React, { useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import _ from "lodash";
import classNames from "classnames";

interface PaginateProps {
  onChangePage: (page: number) => void;
  page: number;
  totalPage: number;
}

export const Paginate = (props: PaginateProps) => {
  //---------------------
  //   STATE
  //---------------------
  const [pagesIndex] = useState(_.range(0, props.totalPage));

  //---------------------
  //   HANDLED
  //---------------------
  function getRenderPageIndex() {
    if (props.totalPage < 4) {
      return _.slice(pagesIndex, 0, 4);
    }

    if (props.page < 2) {
      return _.slice(pagesIndex, 0, 4);
    }

    if (props.page >= props.totalPage - 1) {
      return _.slice(pagesIndex, props.totalPage - 4, props.totalPage);
    }

    return _.slice(pagesIndex, props.page - 2, props.page + 2);
  }

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="flex space-x-[16px] laptop:space-x-[24px] items-center">
          <div
            className={classNames(
              "flex justify-center items-center w-[40px] h-[40px] rounded-full",
              {
                "text-gray-30": props.page === 1,
                "cursor-pointer": props.page !== 1,
              }
            )}
            onClick={() =>
              props.page !== 1 && props.onChangePage(props.page - 1)
            }
          >
            <i className="fas fa-angle-left" />
          </div>
          {_.map(getRenderPageIndex(), (index) => (
            <div
              className={classNames(
                "cursor-pointer select-none button w-[40px] h-[40px] flex items-center justify-center rounded-full",
                {
                  "bg-black text-white": index + 1 === props.page,
                  "bg-white text-black": index + 1 !== props.page,
                }
              )}
              onClick={() => props.onChangePage(index + 1)}
            >
              {index + 1}
            </div>
          ))}
          <div
            className={classNames(
              "flex items-center justify-center w-[40px] h-[40px] rounded-full",
              {
                "text-gray-30": props.page === props.totalPage,
                "cursor-pointer": props.page !== props.totalPage,
              }
            )}
            onClick={() =>
              props.page !== props.totalPage &&
              props.onChangePage(props.page + 1)
            }
          >
            <i className="fas fa-angle-right" />
          </div>
        </div>
      )}
    </Observer>
  );
};
