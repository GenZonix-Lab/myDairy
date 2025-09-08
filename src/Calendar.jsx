import React, { useState } from 'react'
import { CiLogout } from 'react-icons/ci'
import { SlCalender } from 'react-icons/sl'
import { signOut } from 'aws-amplify/auth'

const Calendar = ({ diary, onDateSelect, onBackToDiary }) => {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December']
  
  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay()
  
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days = []
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-3"></div>)
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === today.getDate() && 
                     currentMonth === today.getMonth() && 
                     currentYear === today.getFullYear()
      
      const dateKey = `${day}-${currentMonth + 1}-${currentYear}`
      const hasEntries = diary && diary[dateKey] && diary[dateKey].length > 0
      
      days.push(
        <div 
          key={day}
          className={`p-2 text-center border cursor-pointer ${
            isToday ? 'bg-warning' : hasEntries ? 'bg-info text-white' : 'bg-light'
          }`}
          style={{ minHeight: '60px' }}
          onClick={() => {
            onDateSelect(dateKey)
          }}
        >
          <strong>{day}</strong>
          {hasEntries && (
            <div style={{ fontSize: '10px' }}>
              {diary[dateKey].length} entries
            </div>
          )}
        </div>
      )
    }
    
    return days
  }
  
  return (
    <div className='container-fluid p-0' style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <div className='d-flex justify-content-between align-items-center py-4 px-4' style={{ backgroundColor: '#8B4513', color: 'white' }}>
        <SlCalender 
          size={30} 
          style={{ cursor: 'pointer' }}
          onClick={onBackToDiary}
        />
        <div className='text-center'>
          <h1 style={{ fontFamily: 'serif', fontSize: '2.5rem', margin: 0 }}>📅 Calendar</h1>
        </div>
        <CiLogout 
          size={30} 
          style={{ cursor: 'pointer' }}
          onClick={() => signOut()}
        />
      </div>
      
      {/* Calendar */}
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            {/* Month Navigation */}
            <div className='d-flex justify-content-between align-items-center mb-4'>
              <button 
                className='btn btn-outline-primary'
                onClick={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11)
                    setCurrentYear(currentYear - 1)
                  } else {
                    setCurrentMonth(currentMonth - 1)
                  }
                }}
              >
                ← Previous
              </button>
              <h2 style={{ color: '#8B4513' }}>
                {months[currentMonth]} {currentYear}
              </h2>
              <button 
                className='btn btn-outline-primary'
                onClick={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0)
                    setCurrentYear(currentYear + 1)
                  } else {
                    setCurrentMonth(currentMonth + 1)
                  }
                }}
              >
                Next →
              </button>
            </div>
            
            {/* Calendar Grid */}
            <div className='bg-white rounded shadow'>
              {/* Day Headers */}
              <div className='d-grid' style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className='p-3 text-center fw-bold bg-secondary text-white'>
                    {day}
                  </div>
                ))}
                {renderCalendar()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar