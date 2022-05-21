import React, { Fragment, useEffect, useRef, useState } from "react";
import { Observer } from "mobx-react-lite";
import _ from "lodash";
import { useClickOutside } from "../../libs/click_detector";
import classNames from "classnames";

interface DropdownInputProps {
  onChange: (e: string | string[]) => void;
  value: string | string[];
  options: { name: string; value: any; disabled?: boolean }[];
  placeholder?: string;
  topic?: string;
  error?: string;
}

export const Dropdown = (props: DropdownInputProps) => {
  const { options, placeholder, topic, error } = props;

  //---------------------
  //   REF
  //---------------------
  const ref = useRef(null);

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  //---------------------
  //   STATE
  //---------------------
  const [isOpen, setIsOpen] = useState(false);

  //---------------------
  //   HANDLED
  //---------------------
  function findValue(value: any) {
    const name = _.find(options, (option) => option.value === value)?.name;
    return name || placeholder || value.toString();
  }

  function onChange(option: { name: string; value: any; disabled?: boolean }) {
    props.onChange(option.value);
    setIsOpen(false);
  }

  function getOption() {
    let newOptions = options;

    if (placeholder) {
      newOptions = [
        { name: placeholder, value: "", disabled: true },
        ...newOptions,
      ];
    }

    return newOptions;
  }

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {}, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <Fragment>
          <div className="relative w-full" ref={ref}>
            {topic && <p className="heading6 mb-[12px]">{topic}</p>}

            <div
              className={classNames(
                "h-[40px] border bg-white flex items-center justify-between pr-[18px] pl-[20px]",
                {
                  "rounded-t-[10px]": isOpen,
                  "rounded-[10px]": !isOpen,
                  "border-error": error,
                  "border-black": !error,
                }
              )}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <p className="select-none body">{findValue(props.value)}</p>
              <i
                className={classNames(
                  "transform fa-solid fa-caret-down duration-150",
                  {
                    "rotate-180": isOpen,
                  }
                )}
              />
            </div>

            {isOpen && (
              <div
                className={classNames(
                  "absolute z-10 flex flex-col w-full border-b shadow-[2px_4px_4px_rgba(0,0,0,0.25)] border-x body min-h-[20px]",
                  {
                    "border-error": error,
                    "border-black": !error,
                  }
                )}
              >
                {_.map(getOption(), (option) => (
                  <div
                    className="h-[40px] w-full bg-white hover:bg-gray-10 flex items-center px-[20px] select-none hover:font-bold"
                    onClick={() => {
                      onChange(option);
                    }}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="caption2 text-error mt-[8px] min-h-[21px]">{error}</p>
        </Fragment>
      )}
    </Observer>
  );
};
