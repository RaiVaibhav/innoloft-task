import Image from "next/image";
import killMe from "../public/killme.png";

export const ProfileCard = (props) => {
  return (
    <div className="my-4 mx-4">
      <div className="relative py-10 bg-white shadow-lg rounded-3xl p-10">
        <div className="max-w-md mx-auto">
          <Image
            placeholder="blur"
            height="300"
            width="300"
            src={props.imageSrc || killMe}
            className="w-full relative flex"
            alt="Kill me"
          />

          <div className="text-purple pt-6 text-center leading-6 font-bold sm:text-lg sm:leading-7 xl:text-xl">
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
