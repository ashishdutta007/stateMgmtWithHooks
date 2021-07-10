import React, { useReducer, createContext, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { filterReducer, todoReducer } from "./reducer";
import useCombinedReducers from "use-combined-reducers";
import TodoList from "./TodoList";
import Filter from "./Filter";
import AddTodo from "./AddTodo";
import { DispatchContext } from "./context";

export default function App() {
  const initialTodo = { id: uuidv4(), task: "learn java", complete: true };

  const [state, dispatch] = useCombinedReducers({
    filter: useReducer(filterReducer, "ALL"),
    todos: useReducer(todoReducer, [initialTodo])
  });

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

  return (
    <div className="App">
      <DispatchContext.Provider value={dispatch}>
        <AddTodo />
        <TodoList todos={filteredTodos} />
        <Filter />
      </DispatchContext.Provider>
    </div>
  );
}
