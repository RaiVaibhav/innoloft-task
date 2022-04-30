import { Input } from "./Input";
import { SelectTrl } from "./Select";

export function Attribute({
  hide,
  businessModels,
  categories,
  trl,
  onProductAttrChange,
}) {
  return (
    <div
      className={`shadow-lg rounded-3xl h-full p-2 md:p-4 lg:p-8 ${
        hide && "hidden"
      }`}
    >
      <div className="flex flex-col gap-2 mb-4">
        <div className="text-lg font-semibold flex justify-between">
          Buisness Models
          <button
            onClick={() =>
              onProductAttrChange(
                "businessModels",
                businessModels.concat({ id: Date.now(), name: "" })
              )
            }
            type="button"
            className="py-2.5 px-5 mr-2 ml-2 mb-2 text-sm flex gap-1 items-center font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 white::focus:ring-gray-700 white::bg-gray-800 white::text-gray-400 white::border-gray-600 white::hover:text-white white::hover:bg-gray-700"
          >
            <svg
              className="h-4 w-4 text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add
          </button>
        </div>
        {businessModels.map((value) => (
          <Input
            obj={value}
            key={value.id}
            onChange={(val) => {
              const filteredData = businessModels.map((i) =>
                i.id === value.id ? { id: value.id, name: val } : i
              );
              onProductAttrChange("businessModels", filteredData.concat());
            }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <div className="text-lg font-semibold flex justify-between">
          Categories
          <button
            onClick={() =>
              onProductAttrChange(
                "categories",
                categories.concat({ id: Date.now(), name: "" })
              )
            }
            type="button"
            className="py-2.5 px-5 mr-2 ml-2 mb-2 text-sm flex gap-1 items-center font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 white::focus:ring-gray-700 white::bg-gray-800 white::text-gray-400 white::border-gray-600 white::hover:text-white white::hover:bg-gray-700"
          >
            <svg
              className="h-4 w-4 text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add
          </button>
        </div>
        {categories.map((value) => (
          <Input
            obj={value}
            key={value.id}
            onChange={(val) => {
              // Todo: maintain state and change index val specifically
              const filteredData = categories.map((i) =>
                i.id === value.id ? { id: value.id, name: val } : i
              );
              onProductAttrChange(
                "categories",
                filteredData.concat({ id: value.id, name: val })
              );
            }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold flex justify-between">TRL</div>
        <SelectTrl
          trl={trl}
          onChange={(trl) => {
            onProductAttrChange("trl", trl);
          }}
        />
      </div>
    </div>
  );
}
