import React from "react";
import { Card } from "antd";
import Echarts, { EChartsOption } from "../Echarts";

import { useGetStudentReportQuery } from "@/app/service";
import { orderBy } from "lodash";

const LogStudentChart: React.FC<{ userId: number }> = ({ userId }) => {
  const { data, isFetching } = useGetStudentReportQuery(userId, {
    skip: !userId,
  });

  const newData = orderBy(
    data,
    ["year", "term", "time"],
    ["desc", "desc", "desc"]
  );

  const xAxis = newData?.map((item) => {
    return `ปี ${item?.checkRoom?.year} เทอม ${item.checkRoom?.term} ครั้ง ${item?.checkRoom?.time}`;
  });

  const dataValue = newData?.map((item) => {
    const color = item.isPass ? "green" : "red";
    return { value: 1, itemStyle: { color: color } };
  });

  const data0: EChartsOption = {
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: xAxis,
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: { show: false },
    series: [
      {
        name: "Direct",
        type: "bar",
        barWidth: "60%",
        data: dataValue,
      },
    ],
  };

  return (
    <Card title="ผลการตรวจของนักเรียน" loading={isFetching}>
      <Echarts option={data0} height={300} />
    </Card>
  );
};

export default LogStudentChart;
