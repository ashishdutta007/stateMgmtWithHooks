import React, { useContext } from "react";
import { DispatchContext } from "./context";

export default function Filter() {
  const dispatch = useContext(DispatchContext);
  return (
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
  );
}
