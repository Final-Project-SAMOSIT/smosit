import React, { Fragment, useEffect, useRef, useState } from "react";
import { Observer } from "mobx-react-lite";
import { useClickOutside } from "../../libs/click_detector";
import _ from "lodash";
import dayjs from "dayjs";
import classNames from "classnames";
import { i18n } from "next-i18next";

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

  function getMonthNum(month: string) {
    switch (month) {
      case "Jan":
        return 1;
      case "Feb":
        return 2;
      case "Mar":
        return 3;
      case "Apr":
        return 4;
      case "May":
        return 5;
      case "Jun":
        return 6;
      case "Jul":
        return 7;
      case "Aug":
        return 8;
      case "Sep":
        return 9;
      case "Oct":
        return 10;
      case "Nov":
        return 11;
      case "Dec":
        return 12;

      default:
        return 1;
    }
  }

  function getMonthText(text: string) {
    switch (text) {
      case "Jan":
        return i18n?.language === "th" ? "ม.ค." : text;
      case "Feb":
        return i18n?.language === "th" ? "ก.พ." : text;
      case "Mar":
        return i18n?.language === "th" ? "มี.ค." : text;
      case "Apr":
        return i18n?.language === "th" ? "เม.ย." : text;
      case "May":
        return i18n?.language === "th" ? "พ.ค." : text;
      case "Jun":
        return i18n?.language === "th" ? "มิ.ย." : text;
      case "Jul":
        return i18n?.language === "th" ? "ก.ค." : text;
      case "Aug":
        return i18n?.language === "th" ? "ส.ค." : text;
      case "Sep":
        return i18n?.language === "th" ? "ก.ย." : text;
      case "Oct":
        return i18n?.language === "th" ? "ต.ค." : text;
      case "Nov":
        return i18n?.language === "th" ? "พ.ย." : text;
      case "Dec":
        return i18n?.language === "th" ? "ธ.ค." : text;
    }
  }

  function getDayText(text: string) {
    switch (text) {
      case "Mo":
        return i18n?.language === "th" ? "จ." : text;
      case "Tu":
        return i18n?.language === "th" ? "อ." : text;
      case "We":
        return i18n?.language === "th" ? "พ." : text;
      case "Th":
        return i18n?.language === "th" ? "พฤ." : text;
      case "Fr":
        return i18n?.language === "th" ? "ศ." : text;
      case "Sa":
        return i18n?.language === "th" ? "ส." : text;
      case "Su":
        return i18n?.language === "th" ? "อา." : text;
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
        <div className="relative">
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
              className="z-20 absolute top-full border right-0 bg-white border-gray-20 rounded-[10px] flex flex-col divide-y divide-gray-20 shadow-lg w-[264px]"
              ref={calendarRef}
            >
              <div className="p-[8px] grid grid-cols-7 gap-x-[4px]">
                <div
                  className="caption1 cursor-pointer select-none col-span-5 pl-[4px] h-[26px] laptop:h-[32px] overflow-hidden"
                  onClick={handleModeChange}
                >
                  {_.map<Mode>(["date", "month", "year"], (mode: Mode) => (
                    <p
                      className={classNames(
                        "font-bold hover:bg-gray-30 p-[4px] rounded-[4px] transform duration-300",
                        {
                          "translate-y-[-0px]": selectingMode === "date",
                          "laptop:translate-y-[-32px] translate-y-[-26px]":
                            selectingMode === "month",
                          "laptop:translate-y-[-64px] translate-y-[-52px] text-gray-50":
                            selectingMode === "year",
                        }
                      )}
                    >
                      {dayjs(props.value)
                        .locale("th")
                        .add(i18n?.language === "th" ? 543 : 0, "year")
                        .format(mode === "date" ? "MMMM YYYY" : "YYYY")}
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
                      <span className="font-bold">{getDayText(text)}</span>
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
                      : _.range(
                          new Date().getFullYear() - 6,
                          new Date().getFullYear() + 6
                        ),
                    (value: string | number) => (
                      <div className="caption2 flex justify-center items-center w-full h-[82.66px]">
                        <p
                          className={classNames(
                            "font-bold hover:bg-gray-30 py-[8px] px-[16px] rounded-[5px] cursor-pointer select-none",
                            {
                              "bg-gray-30":
                                getMonthNum(value.toString()) ===
                                  dayjs(props.value).month() + 1 ||
                                value === dayjs(props.value).year(),
                            }
                          )}
                          onClick={() => {
                            if (selectingMode === "month") {
                              onChange(
                                dayjs(props.value)
                                  .set(
                                    "month",
                                    getMonthNum(value.toString()) - 1
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
                          {selectingMode === "month"
                            ? getMonthText(value.toString())
                            : Number(value) +
                              (i18n?.language === "th" ? 543 : 0)}
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
