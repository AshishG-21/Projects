import React, { useState, useEffect } from 'react';

const Rooms = () => {
  const [form, setForm] = useState({ name: '', floor_no: '', size: '' });
  const [rooms, setRooms] = useState({ data: [], total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(false);
  const API = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchRooms();
  }, [rooms.page]);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/rooms?page=${rooms.page}&limit=5`);
      const data = await res.json();
      setRooms(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addRoom = async () => {
    const { name, floor_no, size } = form;
    if (!name || !floor_no || !size) {
      alert("Please fill all fields");
      return;
    }
    
    const res = await fetch(`${API}/rooms?name=${name}&floor_no=${floor_no}&size=${size}`, 
      { method: "POST" }
    );
    
    if (res.ok) {
      setForm({ name: '', floor_no: '', size: '' });
      fetchRooms();
      alert("Room added successfully");
    } else {
      const error = await res.json();
      alert(error.detail);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this room?")) {
      const res = await fetch(`${API}/rooms/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchRooms();
        alert("Deleted successfully");
      }
    }
  };

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= rooms.pages) {
      setRooms({ ...rooms, page: newPage });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-4">
  
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4"><u>Add Room</u></h3>
            <div className="space-y-3">
              <input type="text" placeholder="Room Name" className="w-full p-2 border rounded"
                value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input type="number" placeholder="Floor Number" className="w-full p-2 border rounded"
                value={form.floor_no} onChange={e => setForm({...form, floor_no: e.target.value})} />
              <select className="w-full p-2 border rounded" value={form.size} onChange={e => setForm({...form, size: e.target.value})}>
                <option value="">Select Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              <button onClick={addRoom} className="w-full bg-red-600 text-black py-2 rounded hover:bg-red-700">
                Add Room
              </button>
            </div>
          </div>
        </div>

        
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Rooms ({rooms.total})</h3>
            
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <>
                <div className="space-y-2">
                  {rooms.data.map(room => (
                    <div key={room._id} className="bg-gray-50 p-3 rounded border flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{room.room_name}</div>
                        <div className="text-sm text-gray-600">Floor {room.floor_no} | {room.size}</div>
                      </div>
                      <button onClick={() => handleDelete(room._id)} className="bg-red-500 text-black px-3 py-1 rounded text-sm hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>

            
                {rooms.pages > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    <button onClick={() => changePage(rooms.page - 1)} disabled={rooms.page === 1}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                      Prev
                    </button>
                    <span className="px-3 py-1">Page {rooms.page} of {rooms.pages}</span>
                    <button onClick={() => changePage(rooms.page + 1)} disabled={rooms.page === rooms.pages}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
