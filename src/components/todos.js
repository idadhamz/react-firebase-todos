import React, { useState } from "react";
import todosService from "../services/todosService";

const Todos = (props) => {
  const initialTodosState = {
    key: null,
    title: "",
    description: "",
    completed: false,
  };
  const [currentTodo, setCurrentTodo] = useState(initialTodosState);
  const [message, setMessage] = useState("");

  const { todos } = props;
  if (currentTodo.key !== todos.key) {
    setCurrentTodo(todos);
    setMessage("");
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const updateCompleted = () => {
    todosService.update(currentTodo.key, { completed: true })
      .then(() => {
        setCurrentTodo({ ...currentTodo, completed: true });
        setMessage("The status was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTodo = () => {
    const data = {
      title: currentTodo.title,
      description: currentTodo.description,
    };

    todosService.update(currentTodo.key, data)
      .then(() => {
        setMessage("The todo was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTodo = () => {
    todosService.remove(currentTodo.key)
      .then(() => {
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
        {currentTodo ? (
        <div className="edit-form">
            <h4>Todo</h4>
            <form>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentTodo.title}
                onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentTodo.description}
                onChange={handleInputChange}
                />
            </div>

            <div className="form-group">
                <label>
                <strong>Completed:</strong>
                </label>
                {currentTodo.completed ? "Was done" : "Not yet"}
            </div>
            </form>

            {currentTodo.completed ? (
            <button
                className="badge badge-primary mr-2"
                onClick={() => updateCompleted(false)}
            >
                Undone
            </button>
            ) : (
            <button
                className="badge badge-primary mr-2"
                onClick={() => updateCompleted(true)}
            >
                Done
            </button>
            )}

            <button className="badge badge-danger mr-2" onClick={deleteTodo}>
            Delete
            </button>

            <button
            type="submit"
            className="badge badge-success"
            onClick={updateTodo}
            >
            Update
            </button>
            <p>{message}</p>
        </div>
        ) : (
        <div>
            <br />
            <p>Please click on a Todo...</p>
        </div>
        )}
    </div>
  );
};

export default Todos;