import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, editTask, toggleComplete }) {
  return (
    <ul id="taskList">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          deleteTask={deleteTask}
          editTask={editTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </ul>
  );
}

export default TaskList;