import React, { Fragment, useEffect, useRef, useState } from "react";
import { Observer } from "mobx-react-lite";
import { useClickOutside } from "../../libs/click_detector";
import _ from "lodash";
import dayjs from "dayjs";
import classNames from "classnames";

interface CalendarProps {
  value: Date;
  onChange: (date: Date) => void;
}

export const Calendar = (props: CalendarProps) => {
  //---------------------
  //   TYPE
  //---------------------
  type Mode = "date" | "month" | "year";

  //---------------------
  //   STATE
  //---------------------
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [selectingMode, setSelectingMode] = useState<Mode>("date");
  const [lastMonthDaysList, setLastMonthDaysList] = useState<Array<number>>([]);
  const [nextMonthDaysList, setNextMonthDaysList] = useState<Array<number>>([]);
  const [currentMonthDaysList, setCurrentMonthDaysList] = useState<
    Array<number>
  >([]);

  useEffect(() => {
    const month = dayjs(props.value).month();
    const year = dayjs(props.value).year();

    const firstDayDate = dayjs(`${year}-${month + 1}-01`).day();
    const monthDays = dayjs(`${year}-${month + 1}-01`).daysInMonth();

    const lastMonthDays = dayjs()
      .month((month + 12 - 1) % 12)
      .daysInMonth();

    setLastMonthDaysList(
      _.range(lastMonthDays - firstDayDate + 1, lastMonthDays + 1)
    );
    setCurrentMonthDaysList(_.range(1, monthDays + 1));
    setNextMonthDaysList(_.range(1, 42 - firstDayDate - monthDays + 1));
  }, [props.value]);

  //---------------------
  //   REFERENCE
  //---------------------
  const calendarRef = useRef<HTMLDivElement>(null);
  useClickOutside(calendarRef, () => {
    if (isCalendarOpen) {
      if (selectingMode !== "month") {
        setSelectingMode("date");
        setIsCalendarOpen(false);
      }
    }
  });

  //---------------------
  //   HANDLED
  //---------------------
  function handleModeChange() {
    switch (selectingMode) {
      case "date":
        setSelectingMode("month");
        break;
      case "month":
        setSelectingMode("year");
        break;
      case "year":
        break;
    }
  }

  function onChange(date: Date) {
    props.onChange(date);
  }

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="relative z-20">
          <i
            className="fas fa-calendar-alt text-gray-50 text-[25px] cursor-pointer"
            onClick={() =>
              setTimeout(() => {
                setIsCalendarOpen(true);
              }, 100)
            }
          />
          {isCalendarOpen && (
            <div
              className="absolute top-full border bg-white border-gray-20 rounded-[10px] flex flex-col divide-y divide-gray-20 shadow-lg w-[264px]"
              ref={calendarRef}
            >
              <div className="p-[8px] grid grid-cols-7 gap-x-[4px]">
                <div
                  className="caption1 cursor-pointer select-none col-span-5 pl-[4px] h-[32px] overflow-hidden"
                  onClick={handleModeChange}
                >
                  {_.map<Mode>(["date", "month", "year"], (mode: Mode) => (
                    <p
                      className={classNames(
                        "font-bold hover:bg-gray-30 p-[4px] rounded-[4px] transform duration-300",
                        {
                          "translate-y-[-0px]": selectingMode === "date",
                          "translate-y-[-32px]": selectingMode === "month",
                          "translate-y-[-64px] text-gray-50":
                            selectingMode === "year",
                        }
                      )}
                    >
                      {dayjs(props.value).format(
                        mode === "date" ? "MMMM YYYY" : "YYYY"
                      )}
                    </p>
                  ))}
                </div>

                {selectingMode === "date" && (
                  <Fragment>
                    <div
                      className="h-[24px] w-[24px] self-center hover:bg-gray-30 flex items-center justify-center rounded-full pt-[2px] cursor-pointer"
                      onClick={() => {
                        onChange(
                          dayjs(props.value)
                            .add(1, selectingMode === "date" ? "month" : "year")
                            .toDate()
                        );
                      }}
                    >
                      <i className="fas fa-caret-up" />
                    </div>

                    <div
                      className="h-[24px] w-[24px] self-center hover:bg-gray-30 flex items-center justify-center rounded-full pb-[2px] cursor-pointer"
                      onClick={() => {
                        onChange(
                          dayjs(props.value)
                            .subtract(
                              1,
                              selectingMode === "date" ? "month" : "year"
                            )
                            .toDate()
                        );
                      }}
                    >
                      <i className="fas fa-caret-down" />
                    </div>
                  </Fragment>
                )}
              </div>
              {selectingMode === "date" && (
                <div className="p-[8px] grid grid-cols-7 gap-[4px]">
                  {_.map(["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], (text) => (
                    <div className="w-[32px] h-[32px] rounded-full pl-[8px] caption2 select-none">
                      <span className="font-bold">{text}</span>
                    </div>
                  ))}
                  {_.map(lastMonthDaysList, (day) => (
                    <div
                      className="w-[32px] h-[32px] text-gray-50 rounded-full justify-center caption2 select-none cursor-pointer hover:bg-gray-30 flex items-center"
                      onClick={() => {
                        onChange(
                          dayjs(props.value)
                            .set("date", day)
                            .subtract(1, "month")
                            .toDate()
                        );
                        setIsCalendarOpen(false);
                      }}
                    >
                      <p>{day}</p>
                    </div>
                  ))}

                  {_.map(currentMonthDaysList, (day) => (
                    <div
                      className={classNames(
                        "w-[32px] h-[32px] rounded-full justify-center caption2 select-none cursor-pointer flex items-center",
                        {
                          "bg-black text-white":
                            dayjs(props.value).date() === day,
                          "hover:bg-gray-30": dayjs(props.value).date() !== day,
                        }
                      )}
                      onClick={() => {
                        onChange(dayjs(props.value).set("date", day).toDate());
                        setIsCalendarOpen(false);
                      }}
                    >
                      <p>{day}</p>
                    </div>
                  ))}

                  {_.map(nextMonthDaysList, (day) => (
                    <div
                      className="w-[32px] h-[32px] text-gray-50 rounded-full justify-center caption2 select-none cursor-pointer hover:bg-gray-30 flex items-center"
                      onClick={() => {
                        onChange(
                          dayjs(props.value)
                            .set("date", day)
                            .add(1, "month")
                            .toDate()
                        );
                        setIsCalendarOpen(false);
                      }}
                    >
                      <p>{day}</p>
                    </div>
                  ))}
                </div>
              )}
              {(selectingMode === "month" || selectingMode === "year") && (
                <div className="grid grid-cols-4 p-[8px] gap-x-[8px]">
                  {_.map<string | number>(
                    selectingMode === "month"
                      ? [
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ]
                      : [
                          2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
                          2031, 2032, 2033,
                        ],
                    (value: string | number) => (
                      <div className="caption2 flex justify-center items-center w-full h-[82.66px]">
                        <p
                          className="font-bold hover:bg-gray-30 py-[8px] px-[16px] rounded-[5px] cursor-pointer select-none"
                          onClick={() => {
                            if (selectingMode === "month") {
                              onChange(
                                dayjs(props.value)
                                  .set(
                                    "month",
                                    Number(dayjs(value, "MMM").format("M")) - 1
                                  )
                                  .toDate()
                              );
                              setTimeout(() => {
                                setSelectingMode("date");
                              }, 5);
                            } else {
                              onChange(
                                dayjs(props.value)
                                  .set("year", Number(value))
                                  .toDate()
                              );
                              setSelectingMode("month");
                            }
                          }}
                        >
                          {value}
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Observer>
  );
};
