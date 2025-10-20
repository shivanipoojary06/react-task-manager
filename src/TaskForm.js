import React, { useState, useEffect } from "react";

function TaskForm({ addTask, taskToEdit, setTaskToEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Fill form when a task is being edited
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return alert("Please enter a task title");

    const taskData = { title, description, dueDate, complete: false };

    if (taskToEdit) {
      // Update existing task
      addTask(taskData, taskToEdit.index);
      setTaskToEdit(null); // reset after editing
    } else {
      // Add new task
      addTask(taskData);
    }

    // Clear form
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button type="submit">{taskToEdit ? "Update Task" : "Add Task"}</button>
    </form>
  );
}

export default TaskForm;