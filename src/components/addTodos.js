import React, { useState } from 'react';
import todosService from '../services/todosService';

const AddTodos = () => {
    const initialTodosState = {
        title: "",
        description: "",
        completed: false
    };

    const [todos, setTodos] = useState(initialTodosState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {name, value} = event.target;

        setTodos({...todos, [name]: value});
    };

    const saveTodos = () => {
        var data = {
            title: todos.title,
            description: todos.description,
            submitted: false
        };

        todosService.create(data)
        .then(() => {
            setSubmitted(true);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const newTodos = () => {
        setTodos(initialTodosState);
        setSubmitted(false);
    };

    return(
        <div className="submit-form">
            {
                submitted ? (
                    <div>
                        <h3>You submitted successfully!</h3>
                        <button className="btn btn-success" onClick={newTodos}>
                            Add Todos
                        </button>
                    </div>
                ) : (
                    <div>
                        <h1>Form Todos</h1>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={todos.title}
                                onChange={handleInputChange}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Description</label>
                            <textarea 
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={todos.description}
                                onChange={handleInputChange}
                                name="description"
                            />
                        </div>

                        <button onClick={saveTodos} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export default AddTodos;