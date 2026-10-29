# 🌊 CivicShield — AI-Assisted Flood Intelligence & Risk Analysis

**CivicShield** is a flood intelligence and risk analysis project designed to explore rainfall patterns, river water levels, population exposure, flood events, and shelter capacity. It aims to support better understanding of potential flood risks through data analysis, visualization, and an interactive web dashboard.

> **Project status:** Prototype under development. Current analysis may use synthetic sample data and is not an operational flood-warning system.

## 🎯 Project Objectives

- Analyze rainfall patterns over time.
- Examine river water levels against recorded danger levels.
- Explore relationships between rainfall, population exposure, and flood events.
- Visualize flood-related data through charts and graphs.
- Organize flood-related information in a MySQL database.
- Develop a web dashboard for presenting analysis results.
- Explore explainable, data-driven flood-risk assessment.

## ✨ Key Features

- **Rainfall Trend Analysis:** Visualize rainfall measurements over time.
- **Exploratory Data Analysis:** Examine distributions, averages, and variations in rainfall data.
- **River-Level Monitoring:** Compare recorded river levels with configured danger levels.
- **Population Exposure Analysis:** Explore population and area information relevant to flood-risk assessment.
- **Flood Event Analysis:** Summarize recorded flood events and affected populations.
- **Shelter Capacity Analysis:** Compare shelter capacity with available capacity.
- **Interactive Dashboard:** Planned React-based interface for presenting data and analysis.
- **Risk Assessment:** Planned development of an explainable flood-risk scoring approach.

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Programming language | Python |
| Data analysis | Pandas, NumPy |
| Data visualization | Matplotlib, Seaborn |
| Database | MySQL |
| Database management | MySQL Workbench |
| Data analysis environment | Jupyter Notebook |
| Backend API | FastAPI |
| Frontend | React.js |
| Frontend tooling | Vite |
| Styling | CSS / Tailwind CSS, as configured |

## 🏗️ Project Architecture

```text
CivicShield/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   └── routes/
│       └── risk.py
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── Notebook/
│   └── civicshield_analysis.ipynb
│
├── .gitignore
└── README.md
```

*The structure above is illustrative. Keep the actual filenames and folders in your repository if they differ.*

## 🗄️ Database Design

The MySQL database is named `civicshield`.

| Table | Purpose |
|---|---|
| `rainfall` | Stores rainfall observations by date, district, and location. |
| `river_levels` | Stores river water levels and associated danger levels. |
| `population` | Stores population and geographical area information. |
| `flood_events` | Stores flood-event details, severity, and affected population. |
| `shelters` | Stores shelter capacity and available capacity. |

Example fields include rainfall in millimetres, river level in metres, population counts, and shelter capacity.

## 📊 Data Analysis

The Jupyter Notebook `civicshield_analysis.ipynb` is used to explore and visualize the available data.

Planned or implemented analysis cells may include:

- Rainfall trend line plot.
- Rainfall distribution histogram.
- Average rainfall by district.
- Rainfall variability box plot.
- Rainfall and river-level comparison where records can be matched appropriately.
- Population exposure visualization.
- Flood-event impact summary.
- Shelter capacity comparison.
- Correlation analysis for appropriately matched observations.

The exact analyses available depend on the current notebook contents and the data loaded into MySQL.

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/ommpabinash/CivicShield.git
cd CivicShield
```

### 2. Set up Python

Create and activate a virtual environment:

```bash
python -m venv .venv
```

On Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install the packages used by your project:

```bash
pip install pandas numpy matplotlib seaborn jupyter mysql-connector-python fastapi uvicorn
```

### 3. Configure MySQL

1. Install and open MySQL Server and MySQL Workbench.
2. Create the database:

```sql
CREATE DATABASE civicshield;
USE civicshield;
```

3. Create the required tables using your project's SQL schema.
4. Add your sample or verified data.

**Note:** The database schema and data must be created separately unless SQL setup scripts are included in the repository.

### 4. Configure the database connection

Update your notebook or backend configuration to connect to the local `civicshield` database.

Keep database passwords in environment variables or a local `.env` file. Do not commit credentials to GitHub.

### 5. Run the Jupyter Notebook

From the project root:

```bash
python -m notebook
```

Open `Notebook/civicshield_analysis.ipynb` in Jupyter or VS Code and execute the cells in order.

### 6. Run the FastAPI backend

From the project root, if the backend uses the `backend.main` Python module:

```bash
uvicorn backend.main:app --reload
```

Open the API documentation at:

```text
http://127.0.0.1:8000/docs
```

Ensure the database configuration and required backend dependencies are correct before starting the server.

### 7. Run the React frontend

Open a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, commonly:

```text
http://localhost:5173
```

The frontend displays live backend data only when the relevant API endpoints and frontend API calls are implemented and configured.

## 🔍 Risk Assessment Approach

CivicShield explores the use of rainfall, river-level measurements, population exposure, flood-event information, and shelter availability to support flood-risk analysis.

A conceptual risk framework is:

**Risk = Hazard × Exposure × Vulnerability**

This is a conceptual framework, not a claim that a validated predictive model has already been implemented. The final scoring method requires clearly defined indicators, appropriate normalization, verified data, and validation against historical flood outcomes.

## ⚠️ Data Limitations

- Synthetic data, when used, is intended for development and demonstration.
- Sample data must not be presented as verified real-world measurements.
- Correlations do not establish causation.
- Rainfall records must be matched with relevant dates and locations before comparisons are made.
- Risk scores should not be treated as reliable flood probabilities without validation.
- CivicShield is not currently a replacement for official meteorological alerts, government warnings, or emergency services.

## 🚀 Future Scope

- Integrate verified rainfall and river-level datasets.
- Add district-wise and location-based flood-risk visualization.
- Develop and validate an explainable risk-scoring model.
- Integrate maps and geographical data.
- Add historical flood-event analysis.
- Improve API integration and dashboard interactivity.
- Explore real-time data ingestion and alerting after suitable validation.
- Add role-based access and secure deployment where required.

## 👥 Team Contributions

The project can be developed collaboratively through five work areas:

1. **Database and Data Management** — MySQL schema, data preparation, and validation.
2. **Data Analysis and Visualization** — Python, Jupyter Notebook, and charts.
3. **Flood-Risk Analysis** — Risk indicators, scoring methodology, and validation.
4. **Backend Development** — FastAPI endpoints and database integration.
5. **Frontend and Documentation** — React dashboard, interface design, testing, and project report.

Update this section with actual team members and their contributions.

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and test them.
4. Commit your changes with a descriptive message.
5. Open a pull request.

## 📄 License

No license has been specified yet. Add an appropriate license file before permitting others to reuse or redistribute the project.

## 👨‍💻 Author

**Omm P Abinash**

- **Project:** CivicShield
- **Domain:** Artificial Intelligence, Data Analysis, and Flood Risk Assessment
- **GitHub:** https://github.com/ommpabinash

---

*Building toward better flood-risk understanding through data, visualization, and intelligent analysis.*
