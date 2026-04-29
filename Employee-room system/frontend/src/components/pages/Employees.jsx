import React, { useState, useEffect } from 'react';

const Employees = () => {
  const [form, setForm] = useState({ name: '',gender: 'Not Specified', address: '', email: '', contact: '' });
  const [employees, setEmployees] = useState({ data: [], total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(false);
  
  const API = "http://127.0.0.1:8000";

  useEffect(() => {
    fetchEmployees();
  }, [employees.page]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/employees?page=${employees.page}&limit=5`);
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async () => {
    const { name, gender, address, email, contact } = form;
    if (!name || !gender || !address || !email || !contact) {
      alert("Please fill all fields");
      return;
    }
    
    const res = await fetch(`${API}/employees?name=${name}&gender=${gender}&address=${address}&email=${email}&contact=${contact}`, 
      { method: "POST" }
    );
    
    if (res.ok) {
      setForm({ name: '', gender: 'Not Specified', address: '', email: '', contact: '' });
      fetchEmployees();
      alert("Employee added successfully");
    } else {
      const error = await res.json();
      alert(error.detail);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this employee?")) {
      const res = await fetch(`${API}/employees/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchEmployees();
        alert("Deleted successfully");
      }
    }
  };

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= employees.pages) {
      setEmployees({ ...employees, page: newPage });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap -mx-4">
      
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4"><u>Add Employee</u></h3>
            <div className="space-y-3">
              <input type="text" placeholder="Name" className="w-full p-2 border rounded"
                value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <select className="w-full p-2 border rounded"
                value={form.gender} onChange={e => setForm({...form, gender: e.target.value})} >
                 <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input type="text" placeholder="Address" className="w-full p-2 border rounded"
                value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
              <input type="email" placeholder="Email" className="w-full p-2 border rounded"
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <input type="tel" placeholder="Contact" className="w-full p-2 border rounded"
                value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} />
              <button onClick={addEmployee} className="w-full bg-blue-600 text-black py-2 rounded hover:bg-blue-700">
                Add
              </button>
            </div>
          </div>
        </div>

      
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-4">Employees ({employees.total})</h3>
            
            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <>
                <div className="space-y-2">
                  {employees.data.map(emp => (
                    <div key={emp._id} className="bg-gray-50 p-3 rounded border flex justify-between items-center">
                      <div>
                        <div className="font-semibold">{emp.name}</div>
                        <div className="text-sm text-gray-600">{emp.gender}</div>
                        <div className="text-sm text-gray-600">{emp.address}</div>
                        <div className="text-sm text-gray-600">{emp.email}</div>
                        <div className="text-sm text-gray-600">{emp.contact}</div>
                      </div>
                      
                      <button onClick={() => handleDelete(emp._id)} className="bg-red-500 text-black px-3 py-1 rounded text-sm hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>

          
                {employees.pages > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    <button onClick={() => changePage(employees.page - 1)} disabled={employees.page === 1}
                      className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
                      Prev
                    </button>
                    <span className="px-3 py-1">Page {employees.page} of {employees.pages}</span>
                    <button onClick={() => changePage(employees.page + 1)} disabled={employees.page === employees.pages}
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

export default Employees;
