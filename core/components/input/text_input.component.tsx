import React from "react";
import { Observer } from "mobx-react-lite";
import classNames from "classnames";

interface TextInputProps {
  placeholder?: string;
  value?: string;
  error?: string;
  type?: string;
  title?: string;

  disabled?: boolean;

  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: any) => void;

  height?: number;
  width?: number;

  limitText?: number;
  showLimit?: boolean;
}

export const TextInput = (props: TextInputProps) => {
  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div
          className={`space-y-[11px] relative`}
          style={{ width: props.width ? `${props.width}px` : "100%" }}
        >
          {props.showLimit && props.limitText && (
            <div className="absolute top-[8px] right-[9px]">
              <p className="body text-gray-50">
                {props.value?.length}/{props.limitText}
              </p>
            </div>
          )}
          {props.title && <p className="heading5">{props.title}</p>}
          <div className="space-y-[8px]">
            <input
              type={props.type}
              className={classNames(
                `rounded-[10px] border w-full px-[20px] focus:outline-none`,
                {
                  "min-h-[58px]": !props.height,
                  "border-error": props.error,
                  "border-black": !props.error,
                }
              )}
              style={{ height: `${props.height}px` }}
              value={props.value}
              onChange={props.onChange}
              onKeyPress={props.onKeyPress}
            />
            <p className="caption2 text-error min-h-[21px] mt-[8px]">
              {props.error}
            </p>
          </div>
        </div>
      )}
    </Observer>
  );
};
