import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedInterval } from "../redux/cryptoSlice";

function PriceChart() {
  const dispatch = useDispatch();

  const priceHistory = useSelector((state) => state.crypto.priceHistory);

  const selectedInterval = useSelector(
    (state) => state.crypto.selectedInterval,
  );

  const isLoading = useSelector((state) => state.crypto.isLoading);

  const handleIntervalChange = (event) => {
    dispatch(setSelectedInterval(event.target.value));
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-gray-800 bg-[#111827] p-4 shadow-xl sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-white sm:text-2xl">
          Price History
        </h2>

        <div className="relative">
          <select
            value={selectedInterval}
            onChange={handleIntervalChange}
            className="cursor-pointer appearance-none rounded-lg border border-gray-700 bg-[#0b0f19] px-3 py-2 pr-9 text-sm font-medium text-white outline-none transition hover:border-gray-600 focus:outline-none focus:ring-0"
          >
            <option value="hours">Hours</option>
            <option value="minutes">Minutes</option>
            <option value="seconds">Seconds</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3.5 w-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m6 9 6 6 6-6"
              />
            </svg>
          </div>
        </div>
      </div>

      {isLoading || priceHistory.length === 0 ? (
        <div className="flex h-72 w-full items-center justify-center sm:h-96">
          <p className="text-sm text-gray-500">Waiting for price data...</p>
        </div>
      ) : (
        <div className="h-72 w-full min-w-0 sm:h-96">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <LineChart
              data={priceHistory}
              margin={{
                top: 10,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />

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
                  r: 2,
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
