import React, { useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { Controller } from "react-hook-form";

function RTE({ control, label, defaultValue = "" }) {
  const [editorState, setEditorState] = useState(() =>
    defaultValue
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(defaultValue))
        )
      : EditorState.createEmpty()
  );

  const handleChange = (newState) => {
    setEditorState(newState);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-white">{label}</label>
      )}

      <Controller
        name={"content"}
        control={control}
        render={({ field: { onChange } }) => (
          <div className="border p-2 ">
            <div className="editor-container border p-2 min-h-[300px] max-h-[500px] overflow-y-auto bg-[#ffc7ff]">
              <Editor
                editorState={editorState}
                handleKeyCommand={handleKeyCommand}
                onChange={(newState) => {
                  handleChange(newState);
                  onChange(convertToRaw(newState.getCurrentContent()));
                }}
              />
            </div>

            <div className="toolbar mt-2 flex flex-wrap gap-2 space-x-2">
              <button
                type="button"
                className="px-2 py-1 bg-[#a364ff] hover:bg-[#6c35de] text-white cursor-pointer"
                onClick={() =>
                  setEditorState(
                    RichUtils.toggleInlineStyle(editorState, "BOLD")
                  )
                }
              >
                Bold
              </button>
              <button
                type="button"
                className="px-2 py-1 bg-[#a364ff] hover:bg-[#6c35de] text-white cursor-pointer"
                onClick={() =>
                  setEditorState(
                    RichUtils.toggleInlineStyle(editorState, "ITALIC")
                  )
                }
              >
                Italic
              </button>
              <button
                type="button"
                className="px-2 py-1 bg-[#a364ff] hover:bg-[#6c35de] text-white cursor-pointer"
                onClick={() =>
                  setEditorState(
                    RichUtils.toggleBlockType(
                      editorState,
                      "unordered-list-item"
                    )
                  )
                }
              >
                Bullet List
              </button>
              <button
                type="button"
                className="px-2 py-1 bg-[#a364ff] hover:bg-[#6c35de] text-white cursor-pointer"
                onClick={() =>
                  setEditorState(
                    RichUtils.toggleBlockType(editorState, "ordered-list-item")
                  )
                }
              >
                Numbered List
              </button>
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default RTE;
