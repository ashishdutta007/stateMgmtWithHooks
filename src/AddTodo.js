import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DispatchContext } from "./context";

export default function AddTodo() {
  const [task, setTask] = useState("");
  const dispatch = useContext(DispatchContext);

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

  return (
    <>
      <label>Add todo: </label>
      <input type="text" value={task} onChange={handleOnChange} />
      <button type="submit" onClick={handleOnSubmit}>
        Add todo
      </button>
    </>
  );
}
