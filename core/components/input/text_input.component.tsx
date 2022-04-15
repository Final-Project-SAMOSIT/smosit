import React from "react";
import { Observer } from "mobx-react-lite";

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
}

export const TextInput = (props: TextInputProps) => {
  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div
          className={`space-y-[11px]`}
          style={{ width: props.width ? `${props.width}px` : "100%" }}
        >
          {props.title && <p className="heading5">{props.title}</p>}
          <input
            type={props.type}
            className={`rounded-[10px] border border-black w-full min-h-[58px] px-[20px] focus:outline-none`}
            style={{ height: `${props.height}px` }}
          />
        </div>
      )}
    </Observer>
  );
};
