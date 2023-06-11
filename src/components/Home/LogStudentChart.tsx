import { Card } from "antd";
import Echarts, { EChartsOption } from "../Echarts";

import { useGetStudentReportQuery } from "@/app/service";
import { orderBy } from "lodash";
import { useSession } from "next-auth/react";

const LogChart = () => {
  const { data: session } = useSession();
  const userId = +session?.user?.id!;

  const { data } = useGetStudentReportQuery(userId, { skip: !userId });

  const newData = orderBy(
    data,
    ["checkRoom.year", "checkRoom.term", "checkRoom.time"],
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
    yAxis: [
      {
        type: "value",
      },
    ],
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
    <Card title="ประวัติการตรวจ">
      <Echarts option={data0} height={300} />
    </Card>
  );
};

export default LogChart;
