import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";

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

function DonutSection(props: { userName: string }) {
  const [donut1Data, setDonut1Data] = useState<DonutData>({
    toDoCnt: 2,
    progressCnt: 4,
    reviewCnt: 1,
    completeCnt: 5
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

  const donut1Config: DonutConfig = {
    series: [
      donut1Data.toDoCnt,
      donut1Data.progressCnt,
      donut1Data.reviewCnt,
      donut1Data.completeCnt
    ],
    options: {
      chart: {
        width: 300,
        type: "pie",
      },
      legend: {
        position: "bottom",
      },
      labels: ["대기", "진행", "검토", "완료"],
      colors: ["#FFF2AE", "#A6C4FF", "#FFA2A2", "#9BD5AD"],
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
    <div className="w-[690px] h-[320px] mt-[120px] ml-[50px] relative bg-white rounded-xl shadow-md">
      <div className="pt-[20px] ml-[20px] text-black text-base font-suitB">업무 리포트</div>
      <div className="flex flex-row">
        <div className="ml-[10px]">
          {donut1Data.toDoCnt === 0 &&
            donut1Data.progressCnt === 0 &&
            donut1Data.reviewCnt === 0 &&
            donut1Data.completeCnt === 0 ? (
            <ReactApexChart
              series={emptyDonut.series}
              options={emptyDonut.options}
              type="pie"
              width={320}
            />
          ) : (
            <ReactApexChart
              series={donut1Config.series}
              options={donut1Config.options}
              type="pie"
              width={320}
            />
          )}
        </div>
        <div className="flex flex-col ml-[50px] mt-[30px]">
          <div className="flex flex-row">
            <div className="text-neutral-400 text-sm font-suitB text-[#AAAAAA]">총 이슈:</div>
            <div className="ml-[10px] text-black text-sm font-suitB">30</div>
          </div>
          <div className="w-60 h-px border border-neutral-700"></div>
          <div className="flex flex-row my-[6px]">
            <div className="w-13 h-6 px-2.5 py-0.5 bg-[#FFF2AE] rounded-2xl justify-start items-center inline-flex">
                <div className="text-center text-xs font-suitM text-[#282811]">대기</div>
            </div>
            <div className="ml-[170px] text-right text-black text-md font-suitM">6</div>   
          </div>
          <div className="flex flex-row my-[6px]">
            <div className="w-13 h-6 px-2.5 py-0.5 bg-[#A6C4FF] rounded-2xl justify-start items-center inline-flex">
                <div className="text-center text-[#253365] text-xs font-suitM">진행</div>
            </div>
            <div className="ml-[170px] text-right text-black text-md font-suitM">6</div>   
          </div>
          <div className="flex flex-row my-[6px]">
            <div className="w-13 h-6 px-2.5 py-0.5 bg-[#FFA2A2] rounded-2xl justify-start items-center inline-flex">
                <div className="text-center text-[#723B13] text-xs font-suitM">검토</div>
            </div>
            <div className="ml-[170px] text-right text-black text-md font-suitM">6</div>   
          </div>
          <div className="flex flex-row my-[6px]">
            <div className="w-13 h-6 px-2.5 py-0.5 bg-[#9BD5AD] rounded-2xl justify-start items-center inline-flex">
                <div className="text-center text-xs font-suitM text-[#03543F]">완료</div>
            </div>
            <div className="ml-[170px] text-right text-black text-md font-suitM">6</div>   
          </div>
          <div className="w-60 h-px border border-neutral-700"></div>
        </div>
      </div>
    </div>
  );
}

export default DonutSection;