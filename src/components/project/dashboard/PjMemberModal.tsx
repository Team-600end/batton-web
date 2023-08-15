import React, { useState, useCallback, useEffect } from "react";

export default function PjMemberModal() {
  return (
    <>
      <div
        id="dropdownDots"
        className="absolute w-[90px] -mt-[10px] ml-[90px] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul className="py-2 text-sm font-suitM text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              권한 변경
            </a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              맴버 삭제
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
