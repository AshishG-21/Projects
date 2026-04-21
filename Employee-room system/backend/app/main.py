from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from bson import ObjectId
from bson.errors import InvalidId



app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


client = MongoClient("mongodb://localhost:27017")
db = client["office_booking"]

employees_col = db["employees"]
rooms_col = db["rooms"]
assignments_col = db["assignments"]


def serialize(data):
    data["_id"] = str(data["_id"])
    return data



@app.post("/employees")
def add_employee(name: str):
    name = name.strip()

    if not name:
        raise HTTPException(status_code=400, detail="Name required")

    existing = employees_col.find_one({"name": name})
    if existing:
        raise HTTPException(status_code=400, detail="Employee already exists")

    result = employees_col.insert_one({"name": name})

    return {
        "_id": str(result.inserted_id),
        "name": name
    }


@app.get("/employees")
def get_employees():
    return [serialize(e) for e in employees_col.find()]



@app.post("/rooms")
def add_room(name: str):
    name = name.strip()

    if not name:
        raise HTTPException(status_code=400, detail="Room name required")

    existing = rooms_col.find_one({"room_name": name})
    if existing:
        raise HTTPException(status_code=400, detail="Room already exists")

    result = rooms_col.insert_one({"room_name": name})

    return {
        "_id": str(result.inserted_id),
        "room_name": name
    }


@app.get("/rooms")
def get_rooms():
    return [serialize(r) for r in rooms_col.find()]



@app.post("/assign")
def assign(employee_id: str, room_id: str,start:str,end:str):



    
    try:
        emp_id = ObjectId(employee_id)
        room_id_obj = ObjectId(room_id)
    except InvalidId:
        raise HTTPException(status_code=400, detail="Invalid ID format")

    
    emp = employees_col.find_one({"_id": emp_id})
    room = rooms_col.find_one({"_id": room_id_obj})

    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    if not room:
        raise HTTPException(status_code=404, detail="Room not found")

    if start>=end:
        raise HTTPException(status_code=400,detail="Invalid time range")

    existing_room = assignments_col.find_one({"room_id": room_id})
    for b in assignments_col.find({"room_id": room_id}):
        if existing_room:
            if not (end<=b["start"] or start>=b["end"]):
                raise HTTPException(status_code=400,detail="Room already booked for the given time")

    
    existing_employee = assignments_col.find_one({"employee_id": employee_id})
    for b in assignments_col.find({"employee_id": employee_id}):
        if existing_employee:
            if not (end<=b["start"] or start>=b["end"]):
                raise HTTPException(status_code=400,detail="Employee already has a room booked for the given time")

    
    assignment = {
        "employee_id": employee_id,
        "room_id": room_id,
        "start": start,
        "end": end
    }

    assignments_col.insert_one(assignment)

    return assignment



@app.get("/assignments")
def get_assignments():
    return [serialize(b) for b in assignments_col.find()]
