import { createContext, useState, useEffect } from "react";

export const TodoContext = createContext()

export const TodoContextProvider = ({ children }) => {

    const [name, setName] = useState("")
    const [list, setList] = useState(() => JSON.parse(localStorage.getItem("list") || []))
    const [isEditing, setIsEditing] = useState(false)
    const [editID, setEditId] = useState(null)
    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(list))
    }, [list])
    const addTodo = (task) => {
        setList([...list, task])
    }

    const deleteTodo = (id) => {
        localStorage.setItem("list", JSON.stringify(
            setList(list.filter((task) => task.id !== id))

        ))
    }

    const itemToEdit = (id) => {
        const editItem = list.find((task) => task.id === id)
        setIsEditing(true)
        setEditId(id)
        setName(editItem.title)
    }

    const editTodo = (todo) => {
        const editedTask = list.map((task) =>
            task.id === todo.id ? { ...task, title: todo.title } : task)
        setList(editedTask)
        localStorage.setItem("list", JSON.stringify(editedTask))
    setIsEditing(false)
    }

    const markCompleted = (id) => {
        const complete = list.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        )
        setList(complete)
    }


    // const value = {
    //     addTodo
    // }
    return (
        <TodoContext.Provider value={{
            addTodo,
            list,
            deleteTodo,
            editTodo,
            isEditing,
            setIsEditing,
            setName,
            name,
            itemToEdit,
            markCompleted,
            editID

        }}> {children}</TodoContext.Provider >
    )
}

// export default TodoContext