import { useState } from "react";

export function Tabs({ currentTab, onTabChange }) {
  return (
    <div className="py-6">
      <div className="sm:hidden">
        <select
          onChange={(event) => onTabChange(event.target.value)}
          value={currentTab}
          id="tabs"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 white:bg-gray-700 white:border-gray-600 white:placeholder-gray-400 white:text-white white:focus:ring-blue-500 white:focus:border-blue-500"
        >
          <option value="description">Description</option>
          <option value="attribute">Attribute</option>
        </select>
      </div>
      <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow sm:flex white:divide-gray-700 white:text-gray-400">
        <li className="w-full">
          <div
            onClick={() => onTabChange("description")}
            className={`inline-block p-4 w-full text-gray-900 rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none white:bg-gray-700 white:text-white ${
              currentTab === "description" ? "bg-gray-100" : "bg-white"
            }`}
            aria-current="page"
          >
            Description
          </div>
        </li>
        <li className="w-full">
          <div
            onClick={() => onTabChange("attribute")}
            className={`inline-block p-4 w-full bg-white hover:text-gray-700 rounded-r-lg hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none white:hover:text-white white:bg-gray-800 white:hover:bg-gray-700 ${
              currentTab === "attribute" ? "bg-gray-100" : "bg-white"
            }`}
          >
            Attribute
          </div>
        </li>
      </ul>
    </div>
  );
}
