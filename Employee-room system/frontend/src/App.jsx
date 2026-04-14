import React,{ useState,useEffect } from 'react';

function App() {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");
const [employees, setEmployees] = useState([]);
const [rooms,setRooms] = useState([]);
const [employeeID,setEmployeeID]=useState("");
const [roomID,setRoomID]=useState("");

const [assignments,setAssignments]= useState([]); 

const API="http://127.0.0.1:8000";


useEffect(()=>{  
  fetch(API+ "/get_employees").then(res=>res.json()).then(data=> setEmployees(data));
  fetch(API + "/get_rooms").then(res=>res.json()).then(data=> setRooms(data));
  fetch(API+"/assignments").then(res=>res.json()).then(data=> setAssignments(data));
},[]);

const addEmployee= async()=>{
  await fetch(API + "/employees?name=" + name,{method:"POST"});
  window.location.reload();
};
  const addRoom=async()=>{
  await fetch(API + "/rooms?name=" + roomName,{method:"POST"});
  window.location.reload();
};
const addAssignment= async()=>{
  await fetch(API+"/assign?employee_id="+ employeeID+"&room_id="+ roomID,{method:"POST"});
  window.location.reload();
};
return (
  
     <div style={{padding:5, fontFamily:"Arial",background:"grey"}}>
      <h2 style={{color:"white",background:"black"}}><center><b>Employee-Room Assignment System</b></center></h2>


      <h3 style={{color:"blue"}}>Add employees:</h3>
      <input value={name} onChange={e => setName(e.target.value)}/>
      <button onClick={addEmployee} style={{color:"blue"}}>Add</button>

      <h3  style={{color:"red"}}>Add rooms:</h3>
      <input value={roomName} onChange={e => setRoomName(e.target.value)}/>
      <button onClick={addRoom} style={{color:"red"}}>Add</button>

      <h3 style={{color:"purple"}}>Assign:</h3>
      <input value={employeeID} onChange={e=> setEmployeeID(e.target.value)}/>
       <input value={roomID} onChange={e=> setRoomID(e.target.value)}/>
        <button onClick={addAssignment} style={{color:"purple"}}>Assign</button>

      <h3 style={{color:"blue"}}><u>Employees</u></h3>
      <ol>
        {employees.map(e =><li key={e.id}>{e.name}</li>)}
      </ol >

      <h3 style={{color:"red"}}><u>Rooms</u></h3>
      <ol>
        {rooms.map(r => <li key={r.id}>{r.room_name}</li>)}
      </ol>
      <h3 style={{color:"purple"}}><u>Assignments</u></h3>
      <ul>
      {assignments.map(a=> <li key={a.employee_id}>Employee no.{a.employee_id} is assigned to Room no.{a.room_id}</li>)}
      </ul>
    </div>
  );
}

export default App;
 
