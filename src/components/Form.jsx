import { nanoid } from "nanoid";
import { useContext } from "react";

import { TodoContext } from "../context/TodoContext";
const Form = () => {

    const { addTodo, editTodo, isEditing, name, setName, editID } = useContext(TodoContext)
    const handleSubmit = (event) => {
        event.preventDefault()
        if(!name){
            alert("ppdsd")
        } else if(name && isEditing){
            editTodo({
                id: editID,
                title: name,
                completed: false
            
            })
        } else{
            addTodo({
                id: nanoid(),
                title: name,
                completed: false
    
            })
        }
    
    }
    return (
        <form onSubmit={handleSubmit} className="flex gap-4">
            <input type="text" placeholder='add task' onChange={(event) => setName(event.target.value)} value={name} className="underline-none border py-4 px-10 rounded shadow-lg" />
            <button className='bg-blue-600 py-3 px-5 text-white font-medium rounded' type='submit'>{isEditing ? "edit" : "add" }</button>
        </form>
    );
}

export default Form;