import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [filter, setFilter] = useState("all");
  const [taskToEdit, setTaskToEdit] = useState(null); // new state for editing

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task or update existing task
  const addTask = (task, index = null) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const taskDate = new Date(task.dueDate);

    if (taskDate < today) {
      alert('Error: Task has a past due date!');
      return;
    }

    if (index !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = task; // update existing task
      setTasks(updatedTasks);
    } else {
      setTasks([...tasks, task]); // add new task
    }
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setTaskToEdit({ ...tasks[index], index }); // set task to edit
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].complete = !newTasks[index].complete;
    setTasks(newTasks);
  };

  const checkDeadline = (task) => {
    const now = new Date();
    const taskDate = new Date(task.dueDate);
    const diffTime = taskDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) {
      alert('Reminder: Task is due soon!');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "complete") return task.complete;
    if (filter === "incomplete") return !task.complete;
    return true;
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <TaskForm
        addTask={addTask}
        taskToEdit={taskToEdit}
        setTaskToEdit={setTaskToEdit}
      />
      <div className="filter">
        <label>Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        editTask={editTask}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;