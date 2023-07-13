import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import avatar_img from "../assets/images/common/avatar.png";
import vertical_dots_img from "../assets/images/common/dots-vertical-outline.png";

export default function PjMemberList() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <>
      <div className="w-[220px] h-[400px] p-[10px] mx-[100px] my-[100px] shadow-[2px_6px_10px_-2px_rgba(0,0,0,0.3)] border-[0.3px] bg-white rounded-lg shadow mx-2 dark:bg-gray-800 dark:hover:bg-gray-700">
        <p className="p-2 mb-6 font-suitSB">프로젝트 멤버</p>

        {/* map 반복문 사용 */}
        <div className="flex flex-row h-[38px] my-2 items-center justify-center text-green-700 bg-white border border-green-500 font-suitM rounded-lg hover:bg-gray-50 text-sm px-5 py-2.5 dark:bg-green-600">
          <img className="w-[24px] h-[24px] rounded-full" src={avatar_img} alt="avatar" />
          <div className="w-full px-[10px] text-sm text-gray-500 font-suitM dark:text-white dark:text-gray-400">Jese Leos</div>
          {/* <img className="w-[16px] h-[16px] rounded-full" src={vertical_dots_img} alt="vertical_dots" /> */}

          <button
            id="dropdownMenuIconButton"
            data-dropdown-toggle="dropdownDots"
            // className="inline-flex items-center p-2 text-sm font-suitM text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            type="button"
            onClick={toggleDropdown}
          >
            <img className="w-[16px] h-[16px] rounded-full" src={vertical_dots_img} alt="vertical_dots" />
          </button>
        </div>

        <div className="flex flex-row h-[38px] my-2 items-center justify-center text-green-700 bg-white border border-green-500 font-suitM rounded-lg hover:bg-gray-50 text-sm px-5 py-2.5 dark:bg-green-600">
          <img className="w-[24px] h-[24px] rounded-full" src={avatar_img} alt="avatar" />
          <div className="w-full px-[10px] text-sm text-gray-500 font-suitM dark:text-white dark:text-gray-400">Jese Leos</div>
          <img className="w-[16px] h-[16px] rounded-full" src={vertical_dots_img} alt="vertical_dots" />
        </div>

        <div className="flex flex-row h-[38px] my-2 items-center justify-center text-green-700 bg-white border border-green-500 font-suitM rounded-lg hover:bg-gray-50 text-sm px-5 py-2.5 dark:bg-green-600">
          <img className="w-[24px] h-[24px] rounded-full" src={avatar_img} alt="avatar" />
          <div className="w-full px-[10px] text-sm text-gray-500 font-suitM dark:text-white dark:text-gray-400">Jese Leos</div>
          <img className="w-[16px] h-[16px] rounded-full" src={vertical_dots_img} alt="vertical_dots" />
        </div>
        {/* map 반복문 사용 */}

        <button
          type="button"
          className="w-full h-[38px] text-[#285F43] mt-[5px] bg-white border border-[#285F43] hover:bg-[#285F43] hover:text-[#FFFFFF] font-suitM rounded-full text-sm"
        >
          + 새 맴버 초대하기
        </button>
        {isDropdownOpen && (
          <div id="dropdownDots" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <ul className="py-2 text-sm font-suitM text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  맴버 정보 보기
                </a>
              </li>
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  맴버 삭제
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

// import React, { useState } from "react";
// import styled from "styled-components";
// import avatar_img from "../assets/images/common/avatar.png";
// import vertical_dots_img from "../assets/images/common/dots-vertical-outline.png";

// interface DropdownMenuItem {
//   label: string;
//   url: string;
// }

// interface DropdownMenuProps {
//   id: string;
//   menuItems: DropdownMenuItem[];
// }

// const DropdownMenu: React.FC<DropdownMenuProps> = ({ id, menuItems }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <button
//         className="inline-flex items-center p-2 text-sm font-suitM text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//         type="button"
//         onClick={toggleDropdown}
//       >
//         <img className="w-[16px] h-[16px] rounded-full" src={vertical_dots_img} alt="vertical_dots" />
//       </button>
//       {isOpen && (
//         <div id={id} className="absolute z-10 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
//           <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
//             {menuItems.map((item, index) => (
//               <li key={index}>
//                 <a href={item.url} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
//                   {item.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//           <div className="py-2">
//             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
//               Separated link
//             </a>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// const DbMember: React.FC = () => {
//   const dropdownMenuItems: DropdownMenuItem[] = [
//     { label: "Dashboard", url: "#" },
//     { label: "Settings", url: "#" },
//     { label: "Earnings", url: "#" },
//   ];

//   return (
//     <>
//       <div className="w-[220px] h-[400px] p-[10px] mx-[100px] my-[100px] shadow-[2px_6px_10px_-2px_rgba(0,0,0,0.3)] border-[0.3px] bg-white rounded-lg shadow mx-2 dark:bg-gray-800 dark:hover:bg-gray-700">
//         <p className="p-2 mb-6 font-suitSB">프로젝트 멤버</p>

//         {/* map 반복문 사용 */}
//         <div className="flex flex-row h-[38px] my-2 items-center justify-center text-green-700 bg-white border border-green-500 font-suitM rounded-lg hover:bg-gray-50 text-sm px-5 py-2.5 dark:bg-green-600">
//           <img className="w-[24px] h-[24px] rounded-full" src={avatar_img} alt="avatar" />
//           <div className="w-full px-[10px] text-sm text-gray-500 font-suitM dark:text-white dark:text-gray-400">Jese Leos</div>
//           <img className="w-[16px] h-[16px] rounded-full" src={vertical_dots_img} alt="vertical_dots" />

//           <DropdownMenu id="dropdownMenuIconButton" menuItems={dropdownMenuItems} />
//         </div>

//         <div className="flex flex-row h-[38px] my-2 items-center justify-center text-green-700 bg-white border border-green-500 font-suitM rounded-lg hover:bg-gray-50 text-sm px-5 py-2.5 dark:bg-green-600">
//           <img className="w-[24px] h-[24px] rounded-full" src={avatar_img} alt="avatar" />
//           <div className="w-full px-[10px] text-sm text-gray-500 font-suitM dark:text-white dark:text-gray-400">Jese Leos</div>
//           <img className="w-[16px] h-[16px] rounded-full" src={vertical_dots_img} alt="vertical_dots" />
//         </div>

//         <div className="flex flex-row h-[38px] my-2 items-center justify-center text-green-700 bg-white border border-green-500 font-suitM rounded-lg hover:bg-gray-50 text-sm px-5 py-2.5 dark:bg-green-600">
//           <img className="w-[24px] h-[24px] rounded-full" src={avatar_img} alt="avatar" />
//           <div className="w-full px-[10px] text-sm text-gray-500 font-suitM dark:text-white dark:text-gray-400">Jese Leos</div>
//           <img className="w-[16px] h-[16px] rounded-full" src={vertical_dots_img} alt="vertical_dots" />
//         </div>
//         {/* map 반복문 사용 */}

//         <button
//           type="button"
//           className="w-full h-[38px] text-[#285F43] mt-[5px] bg-white border border-[#285F43] hover:bg-[#285F43] hover:text-[#FFFFFF] font-suitM rounded-full text-sm"
//         >
//           + 새 맴버 초대하기
//         </button>
//       </div>
//     </>
//   );
// };

// export default DbMember;
