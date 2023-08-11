/**
 * 제목, 설명, 버튼이 있는 공통 모달
 * @param title : 모달 제목
 * @param description : 모달 설명
 * @param btnTitle : 버튼 이름
 * @returns
 */

export interface CommonModalInterface {
  title: string;
  description: string;
  btnTitle: string;
  closeModal: () => void;
}

export default function CommonModal({ title, description, btnTitle, closeModal }) {
  return (
    <>
      <div className="fixed flex justify-center items-center z-50 p-20 overflow-x-hidden overflow-y-hidden md:inset-0 w-full h-full max-h-full">
        <div className="flex max-w-full max-h-full">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700">
            {/* title */}
            <div className="flex items-start justify-between px-10 pt-10 rounded-t dark:border-gray-600">
              <h3 className="text-[24px] font-suitB text-gray-900">{title}</h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>

            {/* description */}
            <div className="px-14">
              <p className="text-[16px] font-suitSB leading-relaxed text-gray-900 mt-6">{description}</p>
            </div>

            {/* btnTitle */}
            <div className="flex items-right justify-end px-10 py-7 space-x-2 rounded-b ">
              <button
                type="button"
                onClick={closeModal}
                className="text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:outline-none focus:ring-primary-5 font-suitM rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {btnTitle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
