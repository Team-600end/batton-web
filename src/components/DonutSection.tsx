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
    <div className="mt-[80px]">
      <div>
        {donut1Data.toDoCnt === 0 &&
        donut1Data.progressCnt === 0 &&
        donut1Data.reviewCnt === 0 && 
        donut1Data.completeCnt === 0 ? (
          <ReactApexChart
            series={emptyDonut.series}
            options={emptyDonut.options}
            type="pie"
            width={300}
          />
        ) : (
          <ReactApexChart
            series={donut1Config.series}
            options={donut1Config.options}
            type="pie"
            width={300}
          />
        )}
      </div>
    </div>
  );
}

export default DonutSection;