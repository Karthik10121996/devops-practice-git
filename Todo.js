import React from "react";
import { useState } from "react";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [editTodo, setEditTodo] = useState(null);

  const handleAddTask = () => {
    if (input.trim() === "") {
      setError("Input field should not be empty.");
      return;
    }
    if (editTodo !== null) {
      setTodos(
        todos.map((todo, i) =>
          i === editTodo ? { ...todo, text: input } : todo,
        ),
      );
      setEditTodo(null);
    } else {
      setTodos([...todos, { text: input, done: false }]);
    }
    setInput("");
    setError(null);
  };

  const handleEditTask = (index) => {
    setInput(todos[index].text);
    setEditTodo(index);
  };

  const handleDeleteTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleTaskStatus = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  return (
    <>
      <h1 className="font-3xl font-bold">Todo App!</h1>
      <div className="mt-10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setError(null)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          placeholder="Enter Task"
        />
        <button
          className="btn"
          onClick={handleAddTask}
          title={editTodo !== null ? "Update Task" : "Add Task"}>
          {editTodo !== null ? "Update Task" : "Add Task"}
        </button>
        {error && <p className="font-[14px] text-[#ec1300]">{error}</p>}
        <div className="todo_lists my-10">
          {todos.map((todo, index) => {
            return (
              <div key={index} className="todo my-2">
                <p
                  style={{
                    textDecoration: todo.done ? "line-through" : "none",
                  }}>
                  {todo.text}
                </p>
                <div className="buttons">
                  <button
                    onClick={() => handleTaskStatus(index)}
                    title={todo.done ? "Undo" : "Mark as done"}>
                    {todo.done ? "Undo" : "Mark as done"}
                  </button>
                  <button onClick={() => handleEditTask(index)} title="Edit">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(index)}
                    title="Delete">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Todo;
