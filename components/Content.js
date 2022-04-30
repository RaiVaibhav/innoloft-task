import Image from "next/image";
import { convertImage, toBase64 } from "../utils/utils";
import { Profile } from "./Profile";
import { Tabs } from "./Tabs";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Attribute } from "./Attributes";
import { useDispatch, useSelector } from "react-redux";
import { SET_IS_EDITED, UPDATE_PRODUCT } from "../redux/actions/productActions";

export const NoSSRDescriptionEditor = dynamic(
  () => import("./DescriptionEditor"),
  {
    ssr: false,
  }
);
export const NoSSRAddress = dynamic(() => import("./Address"), {
  ssr: false,
});
export function Content({ product: productProp, hasUserSection }) {
  const dispatch = useDispatch();
  const isEdited = useSelector((state) => state.isEdited);
  const [product, setProduct] = useState(productProp);
  const [currentTab, setCurrentTab] = useState("description");
  const onProductAttrChange = (key, val) => {
    dispatch({ type: SET_IS_EDITED, payload: true})
    if (key) {
      setProduct(Object.assign({}, product, { [key]: val }));
    }
  };
  const saveProduct = async () => {
    let data = product;
    try {
      data = await fetch("http://example.com/api/v1/registration", {
        method: "PUT",
        body: JSON.stringify(product),
      });
    } catch {}
    setProduct(data);
    dispatch({
      type: SET_IS_EDITED,
      payload: false,
    });
    dispatch({
      type: UPDATE_PRODUCT,
      payload: data,
    });
  };
  return (
    <main id="content" className="flex-1 p-6 lg:px-8">
      <div className="max-w-7xl mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2-double h-full grid-rows-min-content-3 lg:grid-row-2-fit gap-4">
          <div className="lg:row-span-full bg-white flex-col flex">
            <div className="flex flex-col flex-1">
              <div className="text-2xl font-semibold mb-12 text-gray-800 flex justify-between">
                {product.name} - {product.type.name}
                <button
                  onClick={() => saveProduct()}
                  type="button"
                  className={`py-2.5 px-5 mr-2 mb-2 text-sm flex gap-1 items-center font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 white::focus:ring-gray-700 white::bg-gray-800 white::text-gray-400 white::border-gray-600 white::hover:text-white white::hover:bg-gray-700 ${
                    !isEdited && "hidden"
                  }`}
                >
                  <svg
                    className="h-3.5 w-3.5 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />{" "}
                    <polyline points="17 21 17 13 7 13 7 21" />{" "}
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                  Save
                </button>
              </div>
              <Image
                placeholder="blur"
                height="200"
                width="700"
                src={product.picture}
                className="w-fit"
                alt="Kill me"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  convertImage(700, 100)
                )}`}
              />
            </div>
            <div className="flex flex-1 flex-col">
              <Tabs
                onTabChange={(tab) => setCurrentTab(tab)}
                currentTab={currentTab}
              />
              <NoSSRDescriptionEditor
                description={product.description}
                hide={currentTab === "attribute"}
                onProductAttrChange={onProductAttrChange}
              />
              <Attribute
                businessModels={product.businessModels}
                categories={product.categories}
                hide={currentTab === "description"}
                trl={product.trl}
                onProductAttrChange={onProductAttrChange}
              />
            </div>
          </div>

          {hasUserSection && <div className="flex flex-col grid-1 lg:grid-1-lg">
            <Profile user={product.user} companyName={product.company.name} />
          </div>}
          <div className="flex flex-col lg:grid-3-lg bg-white shadow-lg rounded-2xl text-gray-800 h-fit">
            <NoSSRAddress address={product.company.address} />
          </div>
        </div>
      </div>
    </main>
  );
}
