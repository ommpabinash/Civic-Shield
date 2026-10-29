function RiskTable({ areas }) {

  const getRiskStyle = (level) => {

    if (level === "High") {
      return "bg-red-100 text-red-700";
    }

    if (level === "Medium") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-green-100 text-green-700";
  };


  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5">

        <h2 className="text-lg font-bold text-slate-900">
          Area Risk Assessment
        </h2>

        <p className="text-sm text-slate-500">
          Explainable prototype risk index
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>
            <tr className="border-b border-slate-200 text-sm text-slate-500">

              <th className="px-4 py-3">
                Location
              </th>

              <th className="px-4 py-3">
                Rainfall
              </th>

              <th className="px-4 py-3">
                Population
              </th>

              <th className="px-4 py-3">
                Risk Score
              </th>

              <th className="px-4 py-3">
                Level
              </th>

            </tr>
          </thead>

          <tbody>

            {areas.map((area, index) => (

              <tr
                key={index}
                className="border-b border-slate-100"
              >

                <td className="px-4 py-4 font-medium text-slate-800">
                  {area.location}
                </td>

                <td className="px-4 py-4">
                  {area.rainfall} mm
                </td>

                <td className="px-4 py-4">
                  {area.population.toLocaleString()}
                </td>

                <td className="px-4 py-4 font-semibold">
                  {area.risk_score}
                </td>

                <td className="px-4 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getRiskStyle(
                      area.risk_level
                    )}`}
                  >
                    {area.risk_level}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RiskTable;