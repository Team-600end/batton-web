import React, { useEffect, useRef } from "react";
import Navbar from "@components/nav/Navbar";
import right_arrow from "@assets/images/nav/right.svg";
import { useParams } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

export default function WriteIssueReport() {
  const { projectKey, issueId } = useParams();
  const editorRef = useRef<Editor>(null);

  useEffect(() => {}, []);

  return (
    <>
      <Navbar />
      <div className="w-[90vw] m-auto mt-[10vh] flex flex-col">
        <div className="flex flex-row my-7">
          <p className="text-2xl font-bold text-gray-900 dark:text-white mr-7">
            [600&-12] 사용자 프로필 기능 수정 here
          </p>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-suitM mr-2 px-2.5 py-0.5 rounded border border-yellow-300">
            CHANGED
          </span>
        </div>
        {/* <p className="text-sm font-medium text-gray-900 dark:text-white flex justify-start">
          작업내용
        </p> */}
        <form className="flex justify-center mt-2">
          <div className="mb-4 border border-gray-300 rounded-lg bg-white p-[0.2vw] h-full w-[70vw] font-suitM mt-[4vh]">
            <div>
              <Editor
                previewStyle="vertical"
                height="500px"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                hideModeSwitch={true}
                language="ko-KR"
                ref={editorRef}
                plugins={[colorSyntax]}
                toolbarItems={[
                  // 툴바 옵션 설정
                  ["heading", "bold", "italic", "strike"],
                  ["hr", "quote"],
                  ["ul", "ol", "task", "indent", "outdent"],
                  ["table", "image", "link"],
                  ["code", "codeblock"],
                ]}
              />
            </div>
          </div>
        </form>
        {/* <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">
          Remember, contributions to this topic should follow our{" "}
          <a
            href="#"
            className="text-blue-600 dark:text-blue-500 hover:underline"
          >
            Community Guidelines
          </a>
          .
        </p> */}
      </div>
    </>
  );
}
