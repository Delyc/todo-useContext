import './App.css';
import { nanoid } from 'nanoid';
import { useState, useEffect, useContext } from 'react';
import List from './components/List';
import { TodoContext } from './context/TodoContext';
import { TodoContextProvider } from './context/TodoContext';
import Form from './components/Form';

const getLocalStorage = () => {
  let list = localStorage.getItem("list")
  if (list) {
    return (JSON.parse(list))
  } else {
    return []
  }
}
function App() {

  const [name, setName] = useState("")
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditId] = useState(null)

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name) {
      alert("please enter a task")
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
      setName("")
      setEditId(null)
      setIsEditing(false)
    } else {
      const newItem = { id: nanoid(), title: name, completed: false }
      setList([...list, newItem])
      setName("")
    }

  }
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id))
  }
  const editItem = (id) => {
    const editItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(editItem.title)

  }
  const markCompleted = (id) => {
    const complete = list.map((item) => 

      item.id === id ? {...item, completed: !item.completed} : item
  
    )
    setList(complete)
  }
  return (
    <>
     <section className='flex flex-col items-center gap-10 py-20'>
      <h1 className='text-4xl uppercase font-bold'>react todo</h1>
      
      </section>
    <TodoContextProvider>
    <Form />
    <List />
      {/* {list.length > 0 && (
        <div className='flex flex-col gap-10'>
          <List  items={list} removeItem={removeItem} editItem={editItem} markCompleted={markCompleted}/>
        </div>
      )} */}
    </TodoContextProvider>
   
    </>
  );
}

export default App;
