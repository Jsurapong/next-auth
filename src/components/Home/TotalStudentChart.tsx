import React from "react";
import { Card } from "antd";
import Echarts, { EChartsOption } from "../Echarts";

import { useGetStudentReportQuery } from "@/app/service";
import { groupBy, orderBy } from "lodash";

const TotalStudentChart: React.FC<{ userId: number }> = ({ userId }) => {
  const { data } = useGetStudentReportQuery(userId, { skip: !userId });

  const newData = orderBy(
    data,
    ["year", "term", "time"],
    ["desc", "desc", "desc"]
  );

  const isPassData = groupBy(newData, "isPass");

  const data0: EChartsOption = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: isPassData?.["true"]?.length || 0,
            name: "ผ่าน",
            itemStyle: { color: "green" },
          },
          {
            value: isPassData?.["false"]?.length || 0,
            name: "ไม่ผ่าน",
            itemStyle: { color: "red" },
          },
        ],
      },
    ],
  };

  return (
    <Card title="ภาพรวมการตรวจ โดยครูประจำชั้น">
      <Echarts option={data0} height={300} />
    </Card>
  );
};

export default TotalStudentChart;
