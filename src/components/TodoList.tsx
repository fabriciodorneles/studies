import { useState } from 'react'

export function TodoList() {
  const [newTask, setNewTask] = useState('')
  const [taskList, setTaskList] = useState([
    { id:1, task: "Lavar a louça", completed: false},
    { id:2, task: "Escovar o dente", completed: true},
    { id:3, task: "Codar", completed: false}
  ])

  const handleAddTask = () => {
    const newTaskList = [...taskList]
    const newId = taskList[taskList.length-1].id+1
    newTaskList.push({ id:newId, task: newTask, completed: false})
    setTaskList(newTaskList)
    setNewTask('')
  }

  const toggleCompleted = (id: number) => {
    const newList = taskList.map((item) => ({
      ...item,
      completed: item.id === id ? !item.completed : item.completed
    }))

    setTaskList(newList)
  }

  const deleteTask = (id: number) => {
    const newList = taskList.filter((item) => item.id !== id)

    setTaskList(newList)
  }

  return (
    <>
      <div>
        <h1>Todo List</h1>
      </div>
      <input 
        style={{height: '30px', marginRight:'8px'}}
        placeholder='type your task' 
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}> Add Task </button>
      <ul>
        {taskList.map((item) => (
          <div style={{display:'flex', marginBottom:'6px'}}>
            <input 
                type='checkbox' 
                checked={item.completed} 
                onClick={() => toggleCompleted(item.id)}/>
            <li 
              key={item.id}            
              style={{ listStyleType: 'none', textDecoration:'line-trough'}}
            >
              <span style={{ textDecoration:`${item.completed ? 'line-through' : ''}`}}>
                {item.task}
              </span>
            </li>
            <button 
              style={{padding: '0px 4px', borderRadius:'0px', display:'flex', marginLeft:'4px'}}
              onClick={()=>deleteTask(item.id)}
            >
              ❌
            </button>
          </div>
        ))}
        </ul>
    </>
  )
}


