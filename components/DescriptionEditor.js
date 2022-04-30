import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { convertFromHTML, EditorState, ContentState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import { SET_IS_EDITED } from "../redux/actions/productActions";

export const NoSSREditor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);
export default function DescriptionEditor({
  description,
  hide,
  onProductAttrChange,
}) {
  const dispatch = useDispatch();
  const isEdited = useSelector((state) => state.isEdited);
  const [disabled, setDisabled] = useState(true);
  const blocksFromHTML = convertFromHTML(description);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(state)
  );
  const onStateChange = (val) => {
    setEditorState(val);
    onProductAttrChange("description", stateToHTML(val.getCurrentContent()));
  };

  useEffect(() => {
    if (!isEdited) {
      setDisabled(true);
    }
  }, [isEdited]);

  return (
    <div
      className={
        hide ? "hidden" : "shadow-lg rounded-3xl h-full p-2 md:p-4 lg:p-8"
      }
    >
      {disabled && (
        <button
          onClick={() => {
            dispatch({ type: SET_IS_EDITED, payload: true})
            setDisabled(!disabled);
          }}
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm flex gap-1 items-center font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 white::focus:ring-gray-700 white::bg-gray-800 white::text-gray-400 white::border-gray-600 white::hover:text-white white::hover:bg-gray-700"
        >
          <svg
            className="h-3.5 w-3.5 text-gray-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit
        </button>
      )}

      <NoSSREditor
        readOnly={disabled}
        editorState={editorState}
        onEditorStateChange={onStateChange}
        placeholder="Write something!"
        toolbarClassName={disabled ? "opacity-50 bg-gray-300 cursor-not-allowed" : ""}
        wrapperClassName={disabled ? "opacity-50 bg-gray-300 rounded-2xl cursor-not-allowed" : ""}
      />
    </div>
  );
}
