import { useEffect, useState } from "react";

import StatCard from "./components/StatCard";
import RainfallChart from "./components/RainfallChart";
import RiskTable from "./components/RiskTable";


const API_URL = "http://127.0.0.1:8000";


function App() {

  const [summary, setSummary] = useState(null);

  const [rainfall, setRainfall] = useState([]);

  const [areas, setAreas] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);


  useEffect(() => {

    async function loadDashboard() {

      try {

        setLoading(true);

        const [
          summaryResponse,
          rainfallResponse,
          areasResponse,
        ] = await Promise.all([

          fetch(
            `${API_URL}/api/risk/summary`
          ),

          fetch(
            `${API_URL}/api/risk/rainfall`
          ),

          fetch(
            `${API_URL}/api/risk/areas`
          ),

        ]);


        if (
          !summaryResponse.ok ||
          !rainfallResponse.ok ||
          !areasResponse.ok
        ) {
          throw new Error(
            "Failed to load CivicShield data"
          );
        }


        const summaryData =
          await summaryResponse.json();

        const rainfallData =
          await rainfallResponse.json();

        const areasData =
          await areasResponse.json();


        setSummary(summaryData);

        setRainfall(rainfallData);

        setAreas(areasData);


      } catch (err) {

        console.error(err);

        setError(
          "Unable to connect to CivicShield API. Make sure FastAPI is running."
        );

      } finally {

        setLoading(false);

      }

    }


    loadDashboard();

  }, []);


  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">

        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-sky-400" />

          <p className="text-slate-300">
            Loading CivicShield...
          </p>

        </div>

      </div>
    );

  }


  if (error) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-6">

        <div className="max-w-md rounded-2xl border border-red-900 bg-slate-900 p-8 text-center">

          <div className="mb-4 text-4xl">
            ⚠️
          </div>

          <h1 className="text-xl font-bold text-white">
            CivicShield API Error
          </h1>

          <p className="mt-3 text-sm text-slate-400">
            {error}
          </p>

          <p className="mt-4 text-xs text-slate-500">
            Start FastAPI with:
          </p>

          <code className="mt-2 block rounded-lg bg-black p-3 text-sm text-sky-400">
            uvicorn backend.main:app --reload
          </code>

        </div>

      </div>
    );

  }


  return (

    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}

      <header className="border-b border-slate-800 bg-slate-950">

        <div className="mx-auto max-w-7xl px-6 py-5">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500 text-xl">
                  🛡️
                </div>

                <div>

                  <h1 className="text-xl font-bold text-white">
                    CivicShield
                  </h1>

                  <p className="text-xs text-slate-400">
                    AI-Powered Disaster Intelligence
                  </p>

                </div>

              </div>

            </div>


            <div className="flex items-center gap-3">

              <span className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400">

                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                System Online

              </span>

              <span className="rounded-full bg-slate-800 px-4 py-2 text-xs text-slate-300">
                Odisha
              </span>

            </div>

          </div>

        </div>

      </header>


      {/* MAIN */}

      <main className="mx-auto max-w-7xl px-6 py-8">

        {/* INTRO */}

        <section className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-sky-600">
            Flood Intelligence
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Disaster Risk Dashboard
          </h2>

          <p className="mt-2 max-w-2xl text-slate-500">
            Transforming environmental and community
            data into explainable flood-risk intelligence.
          </p>

        </section>


        {/* STAT CARDS */}

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            title="Maximum Rainfall"
            value={`${summary.maximum_rainfall} mm`}
            subtitle="Highest recorded observation"
            icon="🌧️"
          />

          <StatCard
            title="Average Rainfall"
            value={`${summary.average_rainfall} mm`}
            subtitle="Across available observations"
            icon="📊"
          />

          <StatCard
            title="Population"
            value={summary.total_population.toLocaleString()}
            subtitle="Population represented"
            icon="👥"
          />

          <StatCard
            title="Shelter Capacity"
            value={summary.available_shelter_capacity.toLocaleString()}
            subtitle="Currently available"
            icon="🏠"
          />

        </section>


        {/* CHART */}

        <section className="mt-6">

          <RainfallChart
            data={rainfall}
          />

        </section>


        {/* RISK TABLE */}

        <section className="mt-6">

          <RiskTable
            areas={areas}
          />

        </section>


        {/* DISCLAIMER */}

        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">

          <div className="flex gap-3">

            <div className="text-xl">
              ⚠️
            </div>

            <div>

              <h3 className="font-semibold text-amber-900">
                Prototype Risk Index
              </h3>

              <p className="mt-1 text-sm leading-6 text-amber-800">
                The current risk score is an analytical
                prototype based on available rainfall and
                population data. It is not an official
                disaster warning or evacuation instruction.
                Final emergency decisions should remain
                with authorized disaster-management
                authorities.
              </p>

            </div>

          </div>

        </section>


        {/* FOOTER */}

        <footer className="mt-10 border-t border-slate-200 py-6 text-center">

          <p className="text-xs text-slate-400">
            CivicShield — From Data to Decisions for a Safer Community.
          </p>

        </footer>

      </main>

    </div>

  );
}

export default App;