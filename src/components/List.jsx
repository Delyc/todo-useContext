import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

const List = () => {
    const {list, deleteTodo, itemToEdit, markCompleted} = useContext(TodoContext)
    console.log("list", list)
    return (
        <>
            <div className="flex flex-col gap-4">
                {list? list.map((item) => {
                    const { id, title, completed } = item
                    return (
                        <ul key={id} className="w-full">
                            <li className="flex items-center gap-2 border-b py-4 w-full">
                                <div className="w-1/2 flex gap-2 items-center">
                                <input type="checkbox" checked={completed} onChange={() => markCompleted(id)} />
                                <p className={ `${item.completed === true ? "line-through" : " "} w-5/6 break-words`}>
                                    {title}
                                </p>
                                </div>
                                
                                <div className="flex gap-5">
                                    <button className="bg-blue-200 px-5" type="button" onClick={() => itemToEdit(id)}>edit</button>
                                    <button className="bg-red-300 px-5" type="button" onClick={() => deleteTodo(id)}>delete</button>
                                </div>
                            </li>
                        </ul>
                    )
                }) : ""}
            </div>
        </>
    );
}

export default List;