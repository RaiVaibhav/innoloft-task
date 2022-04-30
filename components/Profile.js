import Image from "next/image";
import { convertImage, toBase64 } from "../utils/utils";

export function Profile({ user, companyName }) {
  return (
    <>
      <div className="max-w-sm bg-white flex-col items-center hidden lg:flex shadow-lg rounded-2xl h-fit text-gray-800">
        <Image
          placeholder="blur"
          height="200"
          width="200"
          src={user.profilePicture}
          className="mb-3 w-24 h-24 rounded-full shadow-lg"
          alt="User profile"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            convertImage(200, 200)
          )}`}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 white:text-white pt-8">
          {user.firstName} {user.lastName}
        </h5>
        <span className="text-sm text-gray-500 white:text-gray-400">
          {companyName}
        </span>
      </div>
      <div className="max-w-sm bg-white flex flex-row items-center pb-5 lg:hidden text-gray-800">
        <Image
          placeholder="blur"
          height="50"
          width="50"
          src={user.profilePicture}
          className="mb-3 rounded-full shadow-lg"
          alt="User profile"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            convertImage(50, 50)
          )}`}
        />
        <div className="flex flex-col ml-5">
          <h5 className="mb-1 text-xl font-medium text-gray-900 white:text-white">
            {user.firstName} {user.lastName}
          </h5>
          <span className="text-sm text-gray-500 white:text-gray-400">
            {companyName}
          </span>
        </div>
      </div>
    </>
  );
}
