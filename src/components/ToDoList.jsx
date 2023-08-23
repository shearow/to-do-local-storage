import { useState } from "react"
import "../styles/toDoList.css"

if(!localStorage.taskListStorage){
    localStorage.setItem("taskListStorage", JSON.stringify([{
        task: "Testing task",
        complete: true
    }]));
}

export const ToDoList = () => {
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.taskListStorage));

    const addTask = (e) => {
        e.preventDefault();

        if(e.target.toDoInput.value !== ""){
            const newData = [...taskList, {
                task: e.target.toDoInput.value,
                complete: false
            }]

            setTaskList(newData);
            e.target.toDoInput.value = "";
            localStorage.setItem("taskListStorage", JSON.stringify(newData));
        }
    }

    const changeComplete = (task) => {
        const newData = taskList.map(item => {
            if(item.task === task.task){
                return {
                    ...item,
                    complete: !item.complete
                }
            }
            return item;
        })

        setTaskList(newData)
        localStorage.setItem("taskListStorage", JSON.stringify(newData));
    }

    const deleteTask = (task) => {
        const newData = [...taskList].filter(item => item.task !== task.task);

        setTaskList(newData);
        localStorage.setItem("taskListStorage", JSON.stringify(newData));
    }

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>
            <form onSubmit={(addTask)} className="to-do-form">
                <input type="text" name="toDoInput" placeholder="Enter task" />
                <button className="to-do-button">Add</button>
            </form>
            <div className="to-do-data">
                <ul>
                    {taskList.map( (task, index) => {
                        return (
                            <li className="to-do-card" key={index}>
                                <input 
                                    type="checkbox" 
                                    name="inputTask" 
                                    defaultChecked={task.complete}
                                    onClick={(e) => changeComplete(task)}
                                />
                                <p style={{textDecoration: task.complete && "line-through"}} >{task.task}</p>
                                <span onClick={() => deleteTask(task)}>x</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}