import { useState } from "react"
import { v4 as uuidv4 } from 'uuid' ;

export default function Todo(){

    let [todo , setTodo] = useState([{task:"Sample Task" , id:uuidv4() , isDone:false}]);
    let [newTodo , setNewTodo] = useState("");

    let handleInputChange = (e) => {
        setNewTodo(e.target.value);
    }

    let addNewTask = () => {
        setTodo((prevTodo)=> {
            return[...prevTodo, {task:newTodo , id:uuidv4() , isDone:false}]
        });
        setNewTodo("");
    }

    let deleteTodo = (id) =>{
        setTodo(() => (todo.filter((prevTodo) => prevTodo.id != id))
    )}

    let upperCaseAll = () => {
        setTodo((prevTodo) => 
            prevTodo.map((todo) => ({
                ...todo,
                isDone:true
            }))
        );
    }

     let upperCaseOne = (id) => {
        setTodo((prevTodo) => 
            prevTodo.map((todo) => {
                if(todo.id == id){
                    return {
                        ...todo,
                    isDone:true 
                } ;
                }
                else{
                    return todo;
                }
            }))
    }

    return(
        <div>

            <input placeholder="Enter Task" value={newTodo} onChange={handleInputChange}></input>
            <br></br><br></br>
            <button onClick={addNewTask}>Add Task</button>

            <hr></hr>

            <h2>TODO-LIST</h2>

            <ul>
                
                {
                    todo.map((todo) => (
                    <div key={todo.id}>
                        <li>
                            <span style={todo.isDone ? {textDecorationLine : "line-through"} : {}}>{todo.task}</span>
                            &nbsp; &nbsp;&nbsp; &nbsp;
                            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            <button onClick={() => upperCaseOne(todo.id)}>Mark as Done</button>
                        </li>
                        
                    </div>
                ))
                }

                
            </ul>

            <button style={todo.isDone ? {textDecorationLine : "line-through"} : {}} onClick={upperCaseAll}>Mark all task Done</button>
        </div>
    )
}