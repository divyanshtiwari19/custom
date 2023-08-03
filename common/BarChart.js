import React from "react";
// import ReactApexChart from 'react-apexcharts';
import dynamic from "next/dynamic";
import { height } from "@mui/system";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BarChart({data, height}) {
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
      foreColor: "#fff",
      background: "#27272a",
    },
    plotOptions: {
      bar: {
        fill: {
          type: "solid",
          opacity: 1,
        },
      },
    },
    colors: ["#16a34a"],
    xaxis: {
      categories: data.labels,
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return Math.floor(val);
        },
      },
    },
    grid: {
      // Setting the color of the horizontal grid lines to light gray
      borderColor: "#3f3f46",
    },

    dataLabels: {
      enabled: false,
    },
    title: {
      text: data.title,
      align: "center",
      margin: 20,
      offsetY: 20,
      style: {
        fontSize: "25px",
      },
    },
  };

  const chartSeries = [
    {
      name: data.seriesName,
      data: data.values,
    },
  ];

  return (
    // <div className=" h-full overflow-hidden">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={height}
      />
    // </div>
  );
}
