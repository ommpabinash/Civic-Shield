import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function RainfallChart({ data }) {

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5">

        <h2 className="text-lg font-bold text-slate-900">
          Rainfall Trend
        </h2>

        <p className="text-sm text-slate-500">
          Recorded rainfall across monitored locations
        </p>

      </div>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="rainfall_mm"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Rainfall"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default RainfallChart;