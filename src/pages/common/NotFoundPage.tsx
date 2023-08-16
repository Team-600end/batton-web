import not_found_img from "@assets/images/notFoundPage/NotFound.svg";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
      <img src={not_found_img} className="absolute mt-[35vh] ml-[11vw] z-0 scale-150 select-none pointer-events-none" />
      <button onClick={() => navigate("/")} className="z-10 mt-[40vh] rounded-sm bg-primary-3 text-white flex py-[2vh] px-[2vw] items-center shadow-md font-suitM text-lg">
        랜딩페이지로 돌아가기
      </button>
    </div>
  );
}
