import React from "react";
import { Card } from "antd";
import Echarts, { EChartsOption } from "../Echarts";

import { useGetRoomReportQuery } from "@/app/service";
import { orderBy } from "lodash";

const LogRoomChart: React.FC<{ roomId: number }> = ({ roomId }) => {
  const { data, isFetching } = useGetRoomReportQuery(roomId, {
    skip: !roomId,
  });

  const newData = orderBy(
    data,
    ["year", "term", "time"],
    ["desc", "desc", "desc"]
  );

  const xAxis = newData?.map((item) => {
    return `ปี ${item?.year} เทอม ${item?.term} ครั้ง ${item?.time}`;
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

export default LogRoomChart;
