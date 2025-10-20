import React from "react";

function TaskItem({ task, index, deleteTask, editTask, toggleComplete }) {
  return (
    <li className={"task-item" + (task.complete ? " complete" : "")}>
      <div>
        <strong>{task.title}</strong> <br />
        {task.description} <br />
        Due: {task.dueDate}
      </div>
      <div className="task-buttons">
        <button className="complete" onClick={() => toggleComplete(index)}>
          {task.complete ? "Undo" : "Complete"}
        </button>
        <button className="edit" onClick={() => editTask(index)}>
          Edit
        </button>
        <button className="delete" onClick={() => deleteTask(index)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;