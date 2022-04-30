import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function SelectTrl({ trl, onChange }) {
  const isEdited = useSelector(state => state.isEdited);
  const dispatch = useDispatch();
  const trls = useSelector((state) => state.trl);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if(!isEdited) {
      setDisabled(true);
    }
  }, [isEdited])
  return (
    <>
      <label
        htmlFor="select"
        className="block mb-2 text-sm font-medium text-gray-900 white:text-gray-400"
      >
        Select an option
      </label>
      <div className="flex flex-row justify-center mb-2 items-center">
        <select
          id="trl"
          className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-blue-500 white:focus:border-blue-500 ${
            disabled ? "cursor-not-allowed" : "mr-6"
          }`}
          disabled={disabled}
          onChange={(e) => {
            const trl = trls.find((val) => val.id === e.target.value);
            onChange(trl);
          }}
          value={trl.id}
        >
          {trls.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {disabled && (
          <svg
            className={"h-4 w-4 text-gray-900 ml-2"}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => {
              dispatch({ type: SET_IS_EDITED, payload: true})
              setDisabled(false)}}
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
    </>
  );
}
