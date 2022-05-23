import React, { Fragment, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import classNames from "classnames";

interface TextAreaInputProps {
  placeholder?: string;
  value?: string;
  title?: string;
  error?: string;

  disabled?: boolean;

  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyPress?: (e: any) => void;

  height?: number;
  width?: number;

  limitText?: number;
  showLimit?: boolean;
}

export const TextArea = (props: TextAreaInputProps) => {
  const {
    placeholder,
    value,
    onKeyPress,
    disabled,
    title,
    limitText,
    showLimit,
    error,
  } = props;
  //---------------------
  //   HANDLED
  //---------------------
  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (limitText && e.target.value.length > limitText) {
      return;
    }
    props.onChange(e);
  }

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <Fragment>
          <div className="space-y-[12px] relative">
            {title && <p className="heading6">{title}</p>}

            <textarea
              className={classNames(
                "border rounded-[10px] p-[16px] focus:outline-none",
                {
                  "border-error": error,
                  "border-black": !error,
                }
              )}
              onChange={onChange}
              onKeyPress={onKeyPress}
              value={value}
              placeholder={placeholder}
              style={{
                width: props.width ? `${props.width}px` : "100%",
                height: `${props.height || 40}px`,
              }}
              disabled={disabled}
            />
            {showLimit && limitText && (
              <div className="absolute bottom-[9px] right-[9px]">
                <p className="body text-gray-50">
                  {value?.length}/{limitText}
                </p>
              </div>
            )}
          </div>
          <p className="caption2 text-error mt-[8px] min-h-[21px]">{error}</p>
        </Fragment>
      )}
    </Observer>
  );
};
