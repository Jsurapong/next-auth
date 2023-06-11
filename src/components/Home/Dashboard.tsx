"use client";

import { Row, Col, Card } from "antd";

import Echarts from "../Echarts";

const data0 = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: ["ปวช 1", "ปวช 2", "ปวช 3", "ปวส 1", "ปวส 2"],
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
      data: [10, 52, 200, 334, 390],
    },
  ],
};

const data1 = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },

  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["ครั้งที่ 1", "ครั้งที่ 2", "ครั้งที่ 3", "ครั้งที่ 4"],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "คอมพิวเตอร์ธุรกิจ",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "เลขา",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "คอมพิวเตอร์กราฟฟิก",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "บัญชี",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series",
      },
      data: [320, 332, 301, 334, 390, 330, 320],
    },
  ],
};

const data2 = {
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  tooltip: {
    trigger: "item",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      center: ["50%", "70%"],
      // adjust the start angle
      startAngle: 180,
      label: {
        show: true,
        formatter(param: any) {
          // correct the percentage
          return param.name + " (" + param.percent * 2 + "%)";
        },
      },
      data: [
        { value: 1048, name: "ปวช 1" },
        { value: 735, name: "ปวช 2" },
        { value: 580, name: "ปวช 3" },
        { value: 484, name: "ปวส 1" },
        { value: 300, name: "ปวส 2" },
        {
          // make an record to fill the bottom 50%
          value: 1048 + 735 + 580 + 484 + 300,
          itemStyle: {
            // stop the chart from rendering this piece
            color: "none",
            decal: {
              symbol: "none",
            },
          },
          label: {
            show: false,
          },
        },
      ],
    },
  ],
};

const data3 = {
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
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
        { value: 1048, name: "ครั้งที่ 1" },
        { value: 735, name: "ครั้งที่ 2" },
        { value: 580, name: "ครั้งที่ 3" },
        { value: 484, name: "ครั้งที่ 4" },
      ],
    },
  ],
};

const Dashboard = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        {/* <Col sm={24} md={12}>
          <Card title="อันดับห้อง">
            <Echarts option={data0} height={300} />
          </Card>
        </Col>
        <Col sm={24} md={12}>
          <Card title="อันดับแผนก">
            <Echarts option={data1} height={300} />
          </Card>
        </Col>
        <Col sm={24} md={12}>
          <Card title="อันดับไม่ผ่าน">
            <Echarts option={data2} height={300} />
          </Card>
        </Col>
        <Col sm={24} md={12}>
          <Card title="อันดับครั้ง">
            <Echarts option={data3} height={300} />
          </Card>
        </Col>
        <Col sm={24} md={12}></Col> */}
      </Row>
    </>
  );
};

export default Dashboard;
