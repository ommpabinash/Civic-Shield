from fastapi import APIRouter, HTTPException
from backend.database import get_connection

router = APIRouter(
    prefix="/api/risk",
    tags=["Risk"]
)


@router.get("/summary")
def get_summary():

    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        # Total rainfall
        cursor.execute("""
            SELECT
                COALESCE(SUM(rainfall_mm), 0) AS total_rainfall,
                COALESCE(AVG(rainfall_mm), 0) AS average_rainfall,
                COALESCE(MAX(rainfall_mm), 0) AS maximum_rainfall
            FROM rainfall
        """)

        rainfall = cursor.fetchone()

        # Population
        cursor.execute("""
            SELECT COALESCE(SUM(population), 0) AS total_population
            FROM population
        """)

        population = cursor.fetchone()

        # Shelters
        cursor.execute("""
            SELECT
                COUNT(*) AS total_shelters,
                COALESCE(SUM(capacity), 0) AS total_capacity,
                COALESCE(SUM(available_capacity), 0) AS available_capacity
            FROM shelters
        """)

        shelters = cursor.fetchone()

        return {
            "total_rainfall": round(float(rainfall["total_rainfall"]), 2),
            "average_rainfall": round(float(rainfall["average_rainfall"]), 2),
            "maximum_rainfall": round(float(rainfall["maximum_rainfall"]), 2),
            "total_population": int(population["total_population"]),
            "total_shelters": int(shelters["total_shelters"]),
            "available_shelter_capacity": int(
                shelters["available_capacity"]
            )
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()


@router.get("/rainfall")
def get_rainfall():

    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                date,
                district,
                location,
                rainfall_mm
            FROM rainfall
            ORDER BY date ASC
        """)

        data = cursor.fetchall()

        for item in data:
            item["rainfall_mm"] = float(item["rainfall_mm"])
            item["date"] = str(item["date"])

        return data

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()


@router.get("/areas")
def get_area_risk():

    connection = None
    cursor = None

    try:
        connection = get_connection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("""
            SELECT
                p.location,
                p.population,
                p.area_km2,
                COALESCE(AVG(r.rainfall_mm), 0) AS rainfall
            FROM population p
            LEFT JOIN rainfall r
                ON p.location = r.location
            GROUP BY
                p.location,
                p.population,
                p.area_km2
            ORDER BY rainfall DESC
        """)

        areas = cursor.fetchall()

        results = []

        for area in areas:

            rainfall = float(area["rainfall"])
            population = int(area["population"])

            # Prototype risk index.
            # This is NOT a validated disaster prediction model.
            rainfall_score = min(rainfall / 150, 1)

            density = (
                population / float(area["area_km2"])
                if area["area_km2"]
                else 0
            )

            exposure_score = min(density / 500, 1)

            risk_score = (
                rainfall_score * 0.6
                + exposure_score * 0.4
            ) * 100

            if risk_score >= 70:
                level = "High"
            elif risk_score >= 40:
                level = "Medium"
            else:
                level = "Low"

            results.append({
                "location": area["location"],
                "population": population,
                "rainfall": round(rainfall, 2),
                "population_density": round(density, 2),
                "risk_score": round(risk_score, 2),
                "risk_level": level
            })

        return results

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:
        if cursor:
            cursor.close()

        if connection:
            connection.close()