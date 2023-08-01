import React from "react";

function CreatePjMember(props) {
  return (
    <>
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-7">
          <div className="flex-shrink-0">
            <img
              className="w-8 h-8 rounded-full"
              src={profile_img}
              alt="Neil image"
            />
          </div>
          <div className="flex flex-1 flex-row min-w-0">
            <p className="text-[14px] font-medium text-gray-600 truncate dark:text-white">
              임혜균
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400 ml-[20px]">
              email@flowbite.com
            </p>
          </div>
          <div className="inline-flex text-[14px] font-medium text-gray-900 dark:text-white ">
            프로젝트 팀원
          </div>
          <button>
            <img src={x_icon} className="w-[0.8vw]" />
          </button>
        </div>
      </li>
    </>
  );
}

export default CreatePjMember;
