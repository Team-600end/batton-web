import React, { useEffect, useState, FC } from "react";
import ReactApexChart from "react-apexcharts";
import { instanceAuth } from "@src/types/AxiosInterface";
import { ProjectNav } from "@typess/project";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";

interface DonutSectionProps {
  projectId: number;
}

interface DonutData {
  toDoCnt: number;
  progressCnt: number;
  reviewCnt: number;
  completeCnt: number;
}

interface DonutConfig {
  series: number[];
  options: any;
}

export default function DonutSection(props: DonutSectionProps) {
  const [toDoCnt, setToDoCnt] = useState(0);
  const [progressCnt, setProgressCnt] = useState(0);
  const [reviewCnt, setReviewCnt] = useState(0);
  const [completeCnt, setCompleteCnt] = useState(0);

  const donutData: DonutData = {
    toDoCnt: toDoCnt,
    progressCnt: progressCnt,
    reviewCnt: reviewCnt,
    completeCnt: completeCnt
  };

  const getDonutRequest = async () => {
    instanceAuth
      .get(`/issues/chart/${props.projectId}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          setToDoCnt(response.data.result.toDoCnt);
          setProgressCnt(response.data.result.progressCnt);
          setReviewCnt(response.data.result.reviewCnt);
          setCompleteCnt(response.data.result.completeCnt);
        }
        else if (response.data.code == 700) {
          console.log("프로젝트 아이디 값을 확인해주세요.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getDonutRequest()
  });

  //데이터가 없을 때 회색 도넛 차트
  const emptyDonut: DonutConfig = {
    series: [1],
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      legend: {
        position: "bottom",
      },
      labels: ["데이터가 없습니다"],
      colors: ["#f0f0f0"],
    },
  };

  const donutConfig: DonutConfig = {
    series: [donutData.toDoCnt, donutData.progressCnt, donutData.reviewCnt, donutData.completeCnt],
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      legend: {
        position: "bottom",
      },
      labels: ["대기", "진행", "검토", "완료"],
      // colors: ["#FEE690", "#CBCDFF", "#E78BBC", "#5AAE8A"],
      colors: ["#E9F6F0", "#99D8BF", "#41A05F", "#285F43"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div className="relative w-[40vw] h-[320px] bg-white rounded-xl shadow-md">
      <div className="pt-[20px] ml-[20px] text-black text-base font-suitB">업무 리포트</div>
      <div
        className="flex flex-row"
        style={{
          width: "100%", // 컨테이너의 가로 크기
          height: "85%", // 컨테이너의 세로 크기
          overflowX: "auto", // 가로 스크롤 표시
          overflowY: "auto", // 세로 스크롤 표시
        }}
      >
        <div>
          {donutData.toDoCnt === 0 && donutData.progressCnt === 0 && donutData.reviewCnt === 0 && donutData.completeCnt === 0 ? (
            <ReactApexChart series={emptyDonut.series} options={emptyDonut.options} type="pie" width={320} />
          ) : (
            <ReactApexChart series={donutConfig.series} options={donutConfig.options} type="pie" width={320} />
          )}
        </div>
        <div className="flex flex-col pt-[20px]">
          <div className="flex flex-row">
            <div className="text-neutral-400 text-sm font-suitB text-[#AAAAAA]">총 이슈</div>
            <div className="ml-[10px] text-black text-sm font-suitB">{toDoCnt + progressCnt + reviewCnt + completeCnt}</div>
          </div>
          <div className="w-60 h-px border border-neutral-700"></div>
          <div className="flex flex-row my-[6px]">
            <div className="w-13 h-6 px-2.5 py-0.5 bg-[#E9F6F0] rounded-2xl justify-start items-center inline-flex">
              <div className="text-center text-xs font-suitM text-[#282811]">대기</div>
            </div>
            <div className="ml-[170px] text-right text-black text-md font-suitM">{toDoCnt}</div>
          </div>
          <div className="flex flex-row my-[6px]">
            <div className="w-13 h-6 px-2.5 py-0.5 bg-[#99D8BF] rounded-2xl justify-start items-center inline-flex">
              <div className="text-center text-[#253365] text-xs font-suitM">진행</div>
            </div>
            <div className="ml-[170px] text-right text-black text-md font-suitM">{progressCnt}</div>
          </div>
          <div className="flex flex-row my-[6px]">
            <div className="w-13 h-6 px-2.5 py-0.5 bg-[#41A05F] rounded-2xl justify-start items-center inline-flex">
              <div className="text-center text-[#ffffff] text-xs font-suitM">검토</div>
            </div>
            <div className="ml-[170px] text-right text-black text-md font-suitM">{reviewCnt}</div>
          </div>
          <div className="flex flex-row my-[6px]">
            <div className="w-13 h-6 px-2.5 py-0.5 bg-[#285F43] rounded-2xl justify-start items-center inline-flex">
              <div className="text-center text-xs font-suitM text-[#ffffff]">완료</div>
            </div>
            <div className="ml-[170px] text-right text-black text-md font-suitM">{completeCnt}</div>
          </div>
          <div className="w-60 h-px border border-neutral-700"></div>
        </div>
      </div>
    </div>
  );
}
