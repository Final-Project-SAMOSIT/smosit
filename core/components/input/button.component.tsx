import React from "react";

interface ButtonProps {
  title: string;
  isLoading?: boolean;
  width?: number;
  height?: number;
  onClick: (event: any) => void;
  disabled?: boolean;
}

export const Button = (props: ButtonProps) => {
  //---------------------
  //   RENDER
  //---------------------
  return (
    <button
      onClick={(e) => props.onClick(e)}
      disabled={props.disabled}
      className="button flex items-center justify-center rounded-[10px] border border-black h-full min-h-[52px] focus:outline-none text-black bg-white hover:bg-black transition-all duration-150 hover:text-white"
      style={{
        width: props.width ? `${props.width}px` : "100%",
        height: props.height ? `${props.height}px` : "auto",
      }}
    >
      {props.title}
    </button>
  );
};
