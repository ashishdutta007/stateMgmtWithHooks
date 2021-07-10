import React, { useContext } from "react";
import { DispatchContext } from "./context";

export default function TodoItem({ todo }) {
  const dispatch = useContext(DispatchContext);
  const handleChangeCheckbox = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={() => handleChangeCheckbox(todo.id)}
      />
      {todo.task}
    </li>
  );
}
