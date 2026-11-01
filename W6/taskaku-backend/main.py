from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import date
import psycopg
from psycopg.rows import dict_row

app = FastAPI(title="TASKAku API")

DB_URI = "postgresql://postgres:aliceye272@localhost:5432/taskaku_dv_v2"

# ---------------------------------------------------------
# PYDANTIC SCHEMAS (Request Body Validation)
# ---------------------------------------------------------
class CreateChildRequest(BaseModel):
    taska_id: str
    classroom_id: Optional[str] = None
    first_name: str
    last_name: str
    dob: date
    gender: str
    allergies: Optional[str] = None
    medical_notes: Optional[str] = None

class CreateDailyLogRequest(BaseModel):
    child_id: str
    teacher_id: Optional[str] = None
    activity_type: str  # nap, meal, diaper, activity, incident, general
    title: str
    description: Optional[str] = None


# ---------------------------------------------------------
# GET ENDPOINTS
# ---------------------------------------------------------
@app.get("/")
def home():
    return {"status": "success", "message": "TASKAku Backend is up and running!"}

@app.get("/taskas")
def get_taskas():
    try:
        with psycopg.connect(DB_URI, row_factory=dict_row) as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT id, name, phone_number, address FROM taskas;")
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/children")
def get_children():
    try:
        with psycopg.connect(DB_URI, row_factory=dict_row) as conn:
            with conn.cursor() as cur:
                query = """
                SELECT 
                    c.id AS child_id,
                    c.first_name,
                    c.last_name,
                    c.dob,
                    cl.name AS classroom_name,
                    t.name AS taska_name,
                    u.full_name AS parent_name
                FROM children c
                LEFT JOIN classrooms cl ON c.classroom_id = cl.id
                LEFT JOIN taskas t ON c.taska_id = t.id
                LEFT JOIN child_guardians cg ON c.id = cg.child_id
                LEFT JOIN users u ON cg.guardian_id = u.id;
                """
                cur.execute(query)
                return cur.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ---------------------------------------------------------
# POST ENDPOINTS (Creating New Data)
# ---------------------------------------------------------
@app.post("/children")
def create_child(child: CreateChildRequest):
    try:
        with psycopg.connect(DB_URI, row_factory=dict_row) as conn:
            with conn.cursor() as cur:
                query = """
                INSERT INTO children (taska_id, classroom_id, first_name, last_name, dob, gender, allergies, medical_notes)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id, first_name, last_name, created_at;
                """
                cur.execute(query, (
                    child.taska_id, child.classroom_id, child.first_name, 
                    child.last_name, child.dob, child.gender, 
                    child.allergies, child.medical_notes
                ))
                new_record = cur.fetchone()
                conn.commit()
                return {"status": "success", "data": new_record}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/daily-logs")
def create_daily_log(log: CreateDailyLogRequest):
    try:
        with psycopg.connect(DB_URI, row_factory=dict_row) as conn:
            with conn.cursor() as cur:
                query = """
                INSERT INTO daily_logs (child_id, teacher_id, activity_type, title, description)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id, activity_type, title, logged_at;
                """
                cur.execute(query, (
                    log.child_id, log.teacher_id, log.activity_type, log.title, log.description
                ))
                new_log = cur.fetchone()
                conn.commit()
                return {"status": "success", "data": new_log}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))