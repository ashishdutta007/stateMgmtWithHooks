// import "./styles.css";
import React, { useState, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { filterReducer, todoReducer } from "./reducer";
import useCombinedReducers from "use-combined-reducers";

export default function App() {
  const initialTodo = { id: uuidv4(), task: "learn java", complete: true };
  const [task, setTask] = useState("");
  // const [todos, setTodos] = useState([initialTodo]);

  const [state, dispatch] = useCombinedReducers({
    filter: useReducer(filterReducer, "ALL"),
    todos: useReducer(todoReducer, [initialTodo])
  });

  // const [filter, dispatch] = useReducer(filterReducer, "ALL");
  // const [todos, dispatchTodos] = useReducer(todoReducer, [initialTodo]);

  const filteredTodos = state.todos.filter((todo) => {
    switch (state.filter) {
      case "ALL":
        return todo;
      case "COMPLETE":
        return todo.complete;
      case "PENDING":
        return !todo.complete;
      default:
        return todo;
    }
  });

  const handleOnChange = (e) => {
    setTask(e.target.value);
  };

  const handleOnSubmit = (e) => {
    // setTodos([...todos, { id: uuidv4(), task, complete: false }]);
    dispatch({
      type: "ADD_TODO",
      payload: {
        id: uuidv4(),
        task,
        complete: false
      }
    });
    setTask("");
    e.preventDefault();
  };

  const handleChangeCheckbox = (id) => {
    // setTodos(
    //   todos.map((todo) => {
    //     if (todo.id === id) {
    //       return { id: todo.id, task: todo.task, complete: !todo.complete };
    //     } else {
    //       return todo;
    //     }
    //   })
    // );
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  return (
    <div className="App">
      <label>Add todo: </label>
      <input type="text" value={task} onChange={handleOnChange} />
      <button type="submit" onClick={handleOnSubmit}>
        Add todo
      </button>
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => handleChangeCheckbox(todo.id)}
              />
              {todo.task}
            </li>
          );
        })}
      </ul>
      <div>
        <button
          onClick={() => {
            dispatch({ type: "SHOW_ALL" });
          }}
        >
          Todos
        </button>
        <button
          onClick={() => {
            dispatch({ type: "SHOW_COMPLETED" });
          }}
        >
          Completed
        </button>
        <button
          onClick={() => {
            dispatch({ type: "SHOW_PENDING" });
          }}
        >
          Pending
        </button>
      </div>
    </div>
  );
}
