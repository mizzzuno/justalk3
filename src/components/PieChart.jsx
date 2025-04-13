import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import "./../stylesheet/Body.css";

export default function BasicPie() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        margin: "0 auto",
        padding: "0 20px",
        boxSizing: "border-box",
      }}
    >
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "series A" },
              { id: 1, value: 15, label: "series B" },
              { id: 2, value: 20, label: "series C" },
            ],
            label: {
              style: {
                fill: "white",
                color: "white",
              },
            },
            labelFormatter: (value) => (
              <span style={{ color: "white" }}>{value}</span>
            ),
          },
        ]}
        width={300}
        height={300}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
            labelStyle: {
              fill: "white",
              color: "white",
            },
            itemMarkWidth: 20,
            itemMarkHeight: 20,
            markGap: 5,
            itemGap: 20,
            padding: 20,
          },
        }}
        margin={{ top: 20, right: 20, bottom: 100, left: 20 }}
      />
    </div>
  );
}
