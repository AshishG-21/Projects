import React,{ useState,useEffect } from 'react';
import "./App.css";
function App() {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
const [employees, setEmployees] = useState([]);
const [rooms,setRooms] = useState([]);
const [employeeID,setEmployeeID]=useState("");
const [roomID,setRoomID]=useState("");
const [start,setStart]=useState("");
const [end,setEnd]=useState("");
const [bookings,setBookings]=useState([]);
const API="http://127.0.0.1:8000";


useEffect(()=>{  
  fetch(API+ "/employees").then(res=>res.json()).then(data=> setEmployees(data));
  fetch(API + "/rooms").then(res=>res.json()).then(data=> setRooms(data));
  fetch(API+"/assignments").then(res=>res.json()).then(data=> setBookings(data));
},[]);

const addEmployee= async()=>{
   if (!name.trim()) {
  alert("Enter employee name");
  return;
}
  const res = await fetch(API + "/employees?name=" + name, {method: "POST"});
  const data = await res.json();

  if (!res.ok) {
    alert(data.detail);  
    return;
  }

  setEmployees([...employees, data]);
  setName("");
};

  const addRoom=async()=>{
   if (!roomName||roomName.trim() === "") {
  alert("Enter room name");
  return;
}
  const res = await fetch(API + "/rooms?name=" + roomName, {method: "POST"});
  const data = await res.json();

  if (!res.ok) {
    alert(data.detail);  
    return;
  }

  setRooms([...rooms, data]);
  setRoomName("");
};

const addAssignment = async () => {
  if (!employeeID || !roomID) {
    alert("Please select both employee and room");
    return;
  }

  const res = await fetch(API+"/assign?employee_id="+employeeID+"&room_id="+roomID +"&start=" + start + "&end=" + end,{ method: "POST" });
  const data = await res.json();

  if (!res.ok) {
    alert(data.detail);
    return;
  }

  setBookings([...bookings, data]);
  setName("");
  setRoomName("");
};


return (
  
     <div style={{padding:5, fontFamily:"Arial",background:"grey"}}>
      <h2 style={{color:"white",background:"black"}}><center><b>Employee-Room Booking System</b></center></h2>
     <div className="container mt-4">
  <div className="row">
    <div className="col-md-4">
      <div className="card p-3 mb-3" style={{width: "18rem"}}>
        <div className="card-body">
      <h3 className="card-header" ><b>Add employees:</b></h3>
     <p> <img src="https://www.commbox.io/wp-content/uploads/2023/12/6-Best-Ways-to-Keep-Your-Employees-Happy.jpg" className="card-img-top"></img></p>
    Employee name:
    <input value={name} onChange={e => setName(e.target.value)} />
      <button type="button" className="btn btn-primary" onClick={addEmployee} style={{color:"black"}}>Add</button>
      </div>
      </div>
      </div>
      
      <div className="col-md-4">
     <div className="card p-4 mb-4" style={{width: "18rem"}}>
        <div className="card-body">
      <h3  className="card-header" ><b>Add rooms:</b></h3>
     <p> <img src="https://fohfurniture.com/wp-content/uploads/2020/01/FOH-JCED202-scaled.jpg" className="card-img-top" ></img></p>
    <br></br>
      
      Room name:
      <input value={roomName}  onChange={(e) => setRoomName(e.target.value)}/>
      <button type="button" className="btn btn-danger" onClick={addRoom} style={{color:"black"}}>Add</button>
      </div>
      </div></div>

      <div className="col-md-4">
     <div className="card p-4 mb-4" style={{width: "18rem"}}>
        <div className="card-body">
     <h3  className="card-header"><b>Assign:</b></h3>
     <br></br>
<select value={employeeID} onChange={e => setEmployeeID(e.target.value)}>
  <option value="">Select Employee</option>
  {employees.map(e => (
    <option key={e._id} value={e._id}>
      {e.name}
    </option>
  ))}
</select>
<select value={roomID} onChange={e => setRoomID(e.target.value)}>
  <option value="">Select Room</option>
  {rooms.map(r => (
    <option key={r._id} value={r._id}>
      {r.room_name}
    </option>
  ))}
</select>
<br></br>
<br></br>
  Starting time:<input type="time" onChange={e=> setStart(e.target.value)}/>
       Ending time:<input type="time" onChange={e=> setEnd(e.target.value)}/>
<button className="btn btn-warning" onClick={addAssignment}>Book</button>
</div></div></div></div>
    
     
      
<div className="accordion">
  <div className="accordion-item">
    <h3 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEmployees" aria-expanded="true" aria-controls="collapseEmployees">
        <b><u>Employees List</u></b>
      </button>
    </h3>
    <div id="collapseEmployees" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <ol className="list-group">
          {employees.map((e) => <li key={e._id}>{e.name}</li>)}
        </ol>
      </div>
    </div>
  </div>
</div>


<div className="accordion">
  <div className="accordion-item">
    <h3 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRooms" aria-expanded="false" aria-controls="collapseRooms">
        <b><u>Rooms List</u></b>
      </button>
    </h3>
    <div id="collapseRooms" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <ol className="list-group">
          {rooms.map((r) => <li key={r._id}>{r.room_name}</li>)}
        </ol>
      </div>
    </div>
  </div>
</div>


<div className="accordion">
  <div className="accordion-item">
    <h3 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBookings" aria-expanded="false" aria-controls="collapseBookings">
        <b><u>Bookings List</u></b>
      </button>
    </h3>
    <div id="collapseBookings" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <ol>
          {bookings.map((b) => (<li  key={b._id}>Employee ID<b>:</b> {b.employee_id}<b> - </b>Room ID<b>:</b> {b.room_id} = {b.start} to {b.end}</li>))}
        </ol>
      </div>
    </div>
  </div>
</div></div></div>
  );

}

export default App;
 
