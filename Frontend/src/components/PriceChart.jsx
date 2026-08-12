import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

function PriceChart() {
  const priceHistory = useSelector(
    (state) => state.crypto.priceHistory
  );

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-800 bg-[#111827] p-4 shadow-xl sm:p-6">
      <h2 className="mb-5 text-xl font-bold text-white sm:text-2xl">
        Price History
      </h2>

      {priceHistory.length === 0 ? (
        <div className="flex h-72 w-full items-center justify-center">
          <p className="text-sm text-gray-500">
            Waiting for price data...
          </p>
        </div>
      ) : (
        <div className="h-72 w-full min-w-0 sm:h-96">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
          >
            <LineChart
              data={priceHistory}
              margin={{
                top: 10,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                stroke="#1f2937"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="time"
                tick={{
                  fontSize: 11,
                  fill: "#9ca3af",
                }}
                axisLine={{
                  stroke: "#374151",
                }}
                tickLine={{
                  stroke: "#374151",
                }}
              />

              <YAxis
                tick={{
                  fontSize: 11,
                  fill: "#9ca3af",
                }}
                width={60}
                domain={["auto", "auto"]}
                axisLine={{
                  stroke: "#374151",
                }}
                tickLine={{
                  stroke: "#374151",
                }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "10px",
                  color: "#fff",
                }}
                labelStyle={{
                  color: "#9ca3af",
                }}
              />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#60a5fa"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#60a5fa",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default PriceChart;