import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_IS_EDITED } from "../redux/actions/productActions";

// Todo: use debouce
export function Input({ obj, onChange }) {
  const isEdited = useSelector(state => state.isEdited);
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if(!isEdited) {
      setDisabled(true);
    }
  }, [isEdited])
  return (
    <div className="flex flex-row items-center justify-center mb-2">
      <input
        type="text"
        disabled={disabled}
        id={obj.id}
        className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:border-gray-600 white:placeholder-gray-400 white:text-gray-400 white:focus:ring-blue-500 white:focus:border-blue-500 ${
          disabled ? "cursor-not-allowed" : "mr-6"
        }`}
        value={obj.name}
        onChange={(e) => onChange(e.target.value)}
      />

      {disabled && (
        <svg
          className={"h-4 w-4 text-gray-900 ml-2"}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={() => {
            dispatch({ type: SET_IS_EDITED, payload: true})
            setDisabled(false)
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      )}
    </div>
  );
}
