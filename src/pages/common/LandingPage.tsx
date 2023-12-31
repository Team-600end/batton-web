import landing from "@images/landingPage/landing.png";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  // 로그인 되어있으면, 메인. 안되어있으면, 로그인 창으로 가게 해야됨.
  // const handleLandingNavigate = () => {};

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
      <img src={landing} className="absolute mt-[5vh] z-0 scale-150 select-none pointer-events-none" />
      <button
        onClick={() => navigate("/login")}
        className="z-10 mt-[40vh] bg-primary-3 hover:bg-primary-2 rounded-lg text-white flex py-[2vh] px-[2vw] items-center shadow-md font-suitM text-lg"
      >
        시작하기
      </button>
    </div>
  );
}
