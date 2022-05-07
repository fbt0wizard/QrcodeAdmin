import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import Title from "./Tittle";

export default function ChartComponent() {

  const data = [
    { name: "Product A", uv: 500, pv: 2400, amt: 2400 },
    { name: "Product B", uv: 800, pv: 2400, amt: 2400 },
    { name: "Product C", uv: 200, pv: 2400, amt: 2400 },
    { name: "Product D", uv: 900, pv: 2400, amt: 2400 },
  ];


  return (
    <React.Fragment>
      <Title>Top Products This Week</Title>
      <ResponsiveContainer className="__graph_wrapper">
        <BarChart width={600} height={600} data={data}>
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
          <Legend
            width={100}
            wrapperStyle={{
              top: 40,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
          <CartesianGrid dataKey="amt" stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="uv" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
