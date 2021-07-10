import React, { useContext } from "react";
import TodoItem from "./TodoItem";
import { DispatchContext } from "./context";

export default function TodoList({ todos }) {
  const dispatch = useContext(DispatchContext);
  return (
    <div>
      <ul>
        {todos.map((todo) => {
          return <TodoItem key={todo.id} dispatch={dispatch} todo={todo} />;
        })}
      </ul>
    </div>
  );
}
