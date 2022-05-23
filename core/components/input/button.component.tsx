import classNames from "classnames";
import React from "react";

interface ButtonProps {
  title: string;
  isLoading?: boolean;
  width?: number;
  height?: number;
  onClick: (event: any) => void;
  disabled?: boolean;
  custom?: string;
}

export const Button = (props: ButtonProps) => {
  const { custom } = props;

  //---------------------
  //   RENDER
  //---------------------
  return (
    <button
      onClick={(e) => props.onClick(e)}
      disabled={props.disabled}
      className={classNames(
        `button flex items-center justify-center h-full min-h-[52px] focus:outline-none transition-all duration-150`,
        {
          "hover:text-white rounded-[10px] border border-black text-black bg-white hover:bg-black":
            !props.custom,
          [custom || ""]: props.custom,
        }
      )}
      style={{
        width: props.width ? `${props.width}px` : "100%",
        height: props.height ? `${props.height}px` : "auto",
      }}
    >
      {props.title}
    </button>
  );
};
