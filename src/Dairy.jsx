import React, { useState, useEffect } from 'react'
import { fetchAuthSession, signOut } from 'aws-amplify/auth'
import { CiLogout } from 'react-icons/ci'
import { SlCalender } from 'react-icons/sl'
import { BsEraserFill } from 'react-icons/bs'
import Calendar from './Calendar'

const Dairy = () => {
  const [showCalendar, setShowCalendar] = useState(false)
  const api = 'https://xblzcud2vd.execute-api.ap-south-1.amazonaws.com/prod/'
  const today = new Date()
  const todayDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
  const [selectedDate, setSelectedDate] = useState(todayDate)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  const [entry, setEntry] = useState('')
  const [diary, setDiary] = useState({})

  const getToken = async () => {
    const session = await fetchAuthSession()
    return session.tokens.idToken.toString()
  }

  const fetchEntries = async () => {
    try {
      const token = await getToken()
      const response = await fetch(api, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setDiary(data || {})
    } catch (error) {
      console.error('Error fetching entries:', error)
    }
  }

  const handleAddEntry = async () => {
    if (!entry.trim()) return
    
    const newDiary = {
      ...diary,
      [selectedDate]: [...(diary[selectedDate] || []), entry]
    }
    
    try {
      const token = await getToken()
      await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newDiary)
      })
      setDiary(newDiary)
      setEntry('')
    } catch (error) {
      console.error('Error saving entry:', error)
    }
  }

  const handleDeleteEntry = async (index) => {
    const newEntries = diary[selectedDate].filter((_, i) => i !== index)
    const newDiary = {
      ...diary,
      [selectedDate]: newEntries
    }
    
    try {
      const token = await getToken()
      await fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newDiary)
      })
      setDiary(newDiary)
    } catch (error) {
      console.error('Error deleting entry:', error)
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  const getEntries = () => diary[selectedDate] || []
  const isToday = selectedDate === todayDate

  if (showCalendar) {
    return (
      <Calendar 
        diary={diary}
        onDateSelect={(date) => {
          setSelectedDate(date)
          setShowCalendar(false)
        }}
        onBackToDiary={() => setShowCalendar(false)}
      />
    )
  }

  return (
    <div className='container-fluid p-0' style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Diary Header */}
      <div className='d-flex justify-content-between align-items-center py-4 px-4' style={{ backgroundColor: '#8B4513', color: 'white' }}>
        <SlCalender 
          size={30} 
          style={{ cursor: 'pointer' }}
          onClick={() => setShowCalendar(true)}
        />
        <div className='text-center'>
          <h1 style={{ fontFamily: 'serif', fontSize: '2.5rem', margin: 0 }}>📖 My Personal Diary</h1>
          <p style={{ fontSize: '1.1rem', margin: '10px 0 0 0' }}>
            {months[today.getMonth()]} {today.getDate()}, {today.getFullYear()}
          </p>
        </div>
        <CiLogout 
          size={30} 
          style={{ cursor: 'pointer' }}
          onClick={() => signOut()}
        />
      </div>

      {/* Diary Page */}
      <div className='row justify-content-center p-4'>
        <div className='col-md-8 col-lg-6'>
          <div 
            className='p-4 shadow-lg'
            style={{
              backgroundColor: '#fffef7',
              border: '2px solid #d4af37',
              borderRadius: '10px',
              minHeight: '500px',
              backgroundImage: 'linear-gradient(transparent 39px, #e0e0e0 40px)',
              backgroundSize: '100% 40px',
              lineHeight: '40px'
            }}
          >
            {/* Date Header */}
            <div className='text-center mb-4'>
              <h2 style={{ 
                fontFamily: 'cursive', 
                color: '#8B4513',
                borderBottom: '2px solid #d4af37',
                paddingBottom: '10px'
              }}>
                Dear Diary - {selectedDate}
              </h2>
            </div>

            {/* Diary Entries */}
            <div style={{ fontFamily: 'cursive', fontSize: '1.1rem', color: '#333' }}>
              {getEntries().length > 0 ? (
                getEntries().map((entryText, index) => (
                  <div key={index} className='d-flex justify-content-between align-items-center' style={{ marginBottom: '20px' }}>
                    <p style={{ textIndent: '20px', margin: 0, flex: 1 }}>
                      • {entryText}
                    </p>
                    <BsEraserFill 
                      size={16}
                      style={{ 
                        color: '#d4af37', 
                        cursor: 'pointer',
                        marginLeft: '10px',
                        marginTop: '2px',
                        verticalAlign: "center"
                      }}
                      onClick={() => handleDeleteEntry(index)}
                    />
                  </div>
                ))
              ) : (
                <p style={{ fontStyle: 'italic', color: '#666', textAlign: 'center', marginTop: '100px' }}>
                  No entries yet... What happened today?
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Entry Section - Only show for today */}
      {isToday && (
        <div className='row justify-content-center pb-4'>
          <div className='col-md-8 col-lg-6'>
            <div className='p-3' style={{ backgroundColor: '#8B4513', borderRadius: '10px' }}>
              <div className='d-flex gap-2'>
                <textarea 
                  className='form-control'
                  rows='2'
                  placeholder="What happened today? Write your thoughts..."
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  style={{
                    fontFamily: 'cursive',
                    fontSize: '1rem',
                    backgroundColor: '#fffef7',
                    border: '2px solid #d4af37'
                  }}
                />
                <button 
                  className='btn'
                  onClick={handleAddEntry}
                  style={{
                    backgroundColor: '#d4af37',
                    color: 'white',
                    border: 'none',
                    minWidth: '80px'
                  }}
                >
                  ✍️ Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Today Button - Only show when not on today's date */}
      {!isToday && (
        <div className='text-center pb-4'>
          <button 
            className='btn'
            onClick={() => setSelectedDate(todayDate)}
            style={{
              backgroundColor: '#8B4513',
              color: 'white',
              border: '2px solid #d4af37',
              fontFamily: 'cursive'
            }}
          >
            Back to Today
          </button>
        </div>
      )}
    </div>
  )
}

export default Dairy