"use client";

import React from "react";
import ReactECharts from "echarts-for-react"; // or var ReactECharts = require('echarts-for-react');
import type { EChartsInstance, EChartsReactProps } from "echarts-for-react";

import type { EChartsOption } from "echarts";
export type { EChartsOption } from "echarts";

const Echarts: React.FC<{
  option?: EChartsOption;
  height: string | number;
}> = ({ option, height }) => {
  const [m, setM] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setM(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {m && <ReactECharts style={{ height: height }} option={option} />}
    </div>
  );
};

export default Echarts;
