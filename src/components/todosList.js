import React, {useState, useEffect} from "react";
import todosService from '../services/todosService';
import Todos from './todos';

const TodosList = () => {
    const [todos, setTodos] = useState([]);
    const [currentTodos, setCurrentTodos] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const onDataChange = (items) => {
        let todos = [];

        items.forEach((item) => {
            let key = item.key;
            let data = item.val();
            todos.push({
                key: key,
                title: data.title,
                description: data.description,
                completed: false
            });
        });

        setTodos(todos);
    };

    useEffect(() => {
        todosService.getAll().on("value", onDataChange);
        return () => {
            todosService.getAll().off("value", onDataChange);
        }
    }, []);

    const refreshList = () => {
        setCurrentTodos(null);
        setCurrentIndex(-1);
    };

    const setActiveTodos = (todo, index) => {
        const {title, description, completed} = todo;

        setTodos({
            key: todo.key,
            title,
            description,
            completed
        });

        setCurrentIndex(index);
    };

    const removeAllTodos = () => {
        todosService.removeAll()
        .then(() => {
            refreshList();
        })
        .catch((e) => {
            console.log(e);
        });
    };

    return(
        <div className="list row">
            <div className="col-md-6">
                <h4>Todos List</h4>

                <ul className="list-group">
                {todos.map((todo, index) => (
                    <li
                    className={"list-group-item " + (index === currentIndex ? "active" : "")}
                    onClick={() => setActiveTodos(todo, index)}
                    key={index}
                    >
                    {todo.title}
                    </li>
                ))}
                </ul>

                <button
                className="m-3 btn btn-sm btn-danger"
                onClick={removeAllTodos}
                >
                Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentTodos ? (
                <Todos todo={currentTodos} refreshList={refreshList} />
                ) : (
                <div>
                    <br />
                    <p>Please click on a Todos...</p>
                </div>
                )}
            </div>
        </div>
    );
};

export default TodosList