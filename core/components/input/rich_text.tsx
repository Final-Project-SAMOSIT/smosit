import classNames from "classnames";
import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
// import Editor from "react-draft-wysiwyg";

interface RichTextProps {
  disabled?: boolean;
  value: EditorState | string;
  placeholder?: string;
  isSingleLine?: boolean;
  heightCss?: string;
  border?: boolean;
  onChange: (editorState: EditorState) => void;
  error?: string;
}

export default function RichText(props: RichTextProps) {
  const [Editor, setEditor] = useState<any>(null);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  useEffect(() => {
    const loadDynamic = async () => {
      const mod = await import("react-draft-wysiwyg");
      setEditor(() => mod.Editor);
    };
    loadDynamic();

    return () => {
      setEditor(null);
    };
  }, []);

  function getEditorState() {
    return props.value;
  }

  return (
    <div className="min-h-[160px]">
      {Editor && (
        <Editor
          placeholder={props.placeholder}
          editorState={getEditorState()}
          onEditorStateChange={props.onChange}
          wrapperClassName="caption1 relative"
          stripPastedStyles
          editorClassName={classNames(
            `${
              props.heightCss || "h-[40px]"
            } focus-within:border-primary-40 leading-0 cursor-text rounded-[4px] ${
              props.border && "border border-gray-40"
            } align-middle overflow-y-auto`,
            { "bg-white": !props.disabled },
            { "bg-gray-10": props.disabled }
          )}
          toolbarClassName={classNames(
            "flex space-x-[32px] border border-black bg-white rounded-[4px] pt-[9px] pb-[4px] px-[12px] mb-[7px] absolute top-[-52px] left-0 z-30",
            {
              block: isToolbarOpen,
            },
            {
              hidden: !isToolbarOpen,
            }
          )}
          toolbar={{
            options: ["inline"],
            inline: {
              inDropdown: false,
              className: "flex space-x-[32px]",
              options: ["bold", "italic", "underline", "strikethrough"],
              bold: {
                icon: "/images/B.svg",
                className:
                  "h-[24px] w-[24px] flex justify-center items-center cursor-pointer hover:bg-gray-30 rounded-[4px]",
              },
              italic: {
                icon: "/images/I.svg",
                className:
                  "h-[24px] w-[24px] flex justify-center items-center cursor-pointer hover:bg-gray-30 rounded-[4px]",
              },
              strikethrough: {
                icon: "/images/T.svg",
                className:
                  "h-[24px] w-[24px] flex justify-center items-center cursor-pointer hover:bg-gray-30 rounded-[4px]",
              },
              underline: {
                icon: "/images/U.svg",
                className:
                  "h-[24px] w-[24px] flex justify-center items-center cursor-pointer hover:bg-gray-30 rounded-[4px]",
              },
            },
          }}
          onFocus={() => {
            if (!props.disabled) {
              setIsToolbarOpen(true);
            }
          }}
          onBlur={() => {
            setIsToolbarOpen(false);
          }}
        />
      )}
      {props.error && (
        <p className="caption2 text-error min-h-[21px] mt-[8px]">
          {props.error}
        </p>
      )}
    </div>
  );
}
