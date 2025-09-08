import { useState } from 'react'
import './App.css'

function App() {
  const today = new Date()
  const currentDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
  const yesterday = `${today.getDate() - 1}-${today.getMonth() + 1}-${today.getFullYear()}`
  
  const [task, setTask] = useState('')
  const [diary, setDiary] = useState([
    {
      date: yesterday,
      task: ['Learn React', 'Learn JavaScript']
    },
    {
      date: currentDate,
      task: ['Review code', 'Write tests']
    }
  ])

  const handleAddTask = () => {
    if (!task.trim()) return
    
    const existingEntry = diary.find(item => item.date === currentDate)
    if (existingEntry) {
      setDiary(diary.map(item => 
        item.date === currentDate 
          ? { ...item, task: [...item.task, task] }
          : item
      ))
    } else {
      setDiary([...diary, { date: currentDate, task: [task] }])
    }
    setTask('')
  }

  const DayColumn = ({ date,getMonth,getFullYear, bgColor, title, tasks }) => (
    <div className={`${bgColor} p-3 text-center text-white vh-100 col-12 col-lg-6`}>
      <div className='text-dark d-flex justify-content-center align-items-center flex-column'>
        <h1 style={{ fontSize: '4rem' }}>{date}</h1><span>{getMonth}-{getFullYear}</span>
        <h3>{title}</h3>
      </div>
      <hr />
      <div className='text-start'>
        <ul>
          {tasks.map((taskItem, index) => (
            <li key={index}>{taskItem}</li>
          ))}
        </ul>
      </div>
    </div>
  )

  const getTasks = (targetDate) => {
    const entry = diary.find(item => item.date === targetDate)
    return entry ? entry.task : []
  }

  return (
    <>
      <div className='d-flex'>
        <DayColumn 
          date={today.getDate() - 1}
          getMonth={today.getMonth() + 1}
          getFullYear={today.getFullYear()}
          bgColor='bg-info'
          title='Yesterday'
          tasks={getTasks(yesterday)}
        />
        <DayColumn 
          date={today.getDate()}
          getMonth={today.getMonth() + 1}
          getFullYear={today.getFullYear()}
          bgColor='bg-warning'
          title='Today'
          tasks={getTasks(currentDate)}
        />
      </div>

      <div className='d-flex justify-content-center align-items-center bg-dark p-4'>
        <input 
          type='text' 
          className='form-control me-2' 
          placeholder="Add today's task" 
          value={task} 
          onChange={(e) => setTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <button className='btn btn-primary' onClick={handleAddTask}>
          Add
        </button>
      </div>
    </>
  )
}

export default App
