import React, { useState } from 'react'
import Home from './pages/Home'
import Employees from './pages/Employees'
import EmployeesDetails from './pages/EmployeesDetails'
import Delete from './pages/Delete'
import Delete2 from './pages/Delete2'
import Delete3 from './pages/Delete3'
import Rooms from './pages/Rooms'
import RoomsDetails from './pages/RoomsDetails'
import Book from './pages/Book'
import BookingDetails from './pages/BookingDetails'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'

const MainRouter = () => {
  const [showEmployeesDropdown, setShowEmployeesDropdown] = useState(false)
  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false)
  const [showBookingDropdown, setShowBookingDropdown] = useState(false)

  return (
    <div>
      
      <nav class="bg-blue-600 text-white fixed top-0 w-full z-50 shadow-lg" style={{backgroundColor: "#1e3a8a"}}>
        <div className="container mx-auto px-4">
         
          
          <div className="flex justify-between items-center py-4">
            
            <div className="flex gap-6">
             
              <Link to="/" className="my-link" ><b>Home</b></Link>
                <span className="text-gray-400">{" | "}</span>
             <Link to="/employees" className="my-link"><b>Employees</b></Link>
             <span className="text-gray-400">{" | "}</span>
             <Link to="/rooms" className="my-link"><b>Rooms</b> </Link>
             <span className="text-gray-400">{" | "}</span>
            <Link to="/book" className="my-link"><b>Booking</b> </Link>
              
               
             
            </div>
          </div>
        </div>
      </nav>

     
      <div className="pt-20 min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employeesdetails" element={<EmployeesDetails />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/roomsdetails" element={<RoomsDetails />} />
          <Route path="/delete2" element={<Delete2 />} />
          <Route path="/book" element={<Book />} />
          <Route path="/bookingdetails" element={<BookingDetails />} />
          <Route path="/delete3" element={<Delete3 />} />
        </Routes>
      </div>
    </div>
  )
}

export default MainRouter
