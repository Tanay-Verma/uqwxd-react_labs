import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");

  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
      const json = localStorage.getItem("todos");
      const loadedTodos = JSON.parse(json);
      if(loadedTodos) {
          setTodos(loadedTodos);
      }
  }, []);
  
  React.useEffect(() => {
      if(todos.length > 0){
          const json = JSON.stringify(todos);
          localStorage.setItem("todos", json)
      }
  }, [todos]);
  
  // Add the handlesubmit code here
  function handlesubmit(e) {
      e.preventDefault();

      const newTodo = {
          id: new Date().getTime(),
          text: todo.trim(),
          completed: false,
      };

      if (newTodo.text.length > 0){
          setTodos([...todos,newTodo]);
          setTodo("");
      } else {
          alert("Enter Valid Task");
          setTodo("");
      }
  }
  
  // Add the deleteToDo code here
  function deleteToDo(id) {
    setTodos(oldTodos => oldTodos.filter((todo) => todo.id !== id));
  }
  
  // Add the toggleComplete code here
  function toggleCompleted(id) {
      let updateTodos = [...todos].map((todo) => {
          if(todo.id === id) {
              todo.completed = !todo.completed;
          }
          return todo;
      })
      setTodos(updateTodos);
  }
  
  // Add the submitEdits code here
  const submitEdits = (id) => {
    setTodos(oldTodos => oldTodos.map((todo) => {
        if(todo.id === id){
            todo.text = editingText;
        }
        return todo;
        }))
    setTodoEditing(null);
  }

  
return(
<div className ="App" style={{display:"flex", flexDirection:"column" , justifyContent:"center" , alignItems:"center"}}>
    <h1>Todo List</h1>
    <form onSubmit={handlesubmit}>
        <input type ="text" align ="right" onChange={(e)=> setTodo(e.target.value)} placeholder="Add a new task" value={todo}/>
        <button type ="submit">Add Todo</button>
    </form>
    {todos.map((todo) => 
    <div key={todo.id} style={{border:"solid 0.05px black", width:"50%"}}>
        {todo.id === todoEditing ? <input type="text" 
        onChange={(e) => setEditingText(e.target.value)} value={editingText}/>
        : 
        <div style={{textAlign:"center"}}>{todo.text}</div>}
        
        <input type="checkbox" id="completed" checked={todo.completed} 
        onChange={() => toggleCompleted(todo.id)}/>

        <div style={{display:"flex", justifyContent:"space-between"}}>
            <button
            onClick={() => deleteToDo(todo.id)}>Delete
            </button>
            {todo.id === todoEditing ?
            <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            :
            <button
                onClick={() => {
                    setTodoEditing(todo.id)
                    setEditingText(todo.text)}}>Edit
            </button>
            }
        </div>
        
    </div>)}
</div>
);
};
export default App;
