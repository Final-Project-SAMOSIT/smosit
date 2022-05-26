import classNames from "classnames";
import React from "react";

interface ButtonProps {
  title: string;
  isLoading?: boolean;
  widthCss?: string;
  heightCss?: string;
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
        "button flex items-center justify-center h-full focus:outline-none transition-all duration-150",
        {
          [`${custom}`]: custom,
          "hover:text-white rounded-[10px] border border-black text-black bg-white hover:bg-black":
            !custom,
          "min-h-[52px] h-auto": !props.heightCss,
          [`${props.heightCss}`]: props.heightCss,
          "w-full": !props.widthCss,
          [`${props.widthCss}`]: props.widthCss,
        }
      )}
    >
      {props.title}
    </button>
  );
};
