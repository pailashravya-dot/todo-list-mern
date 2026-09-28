import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const API_URL = "http://localhost:5000/api/tasks";

  // Get all tasks
  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Mark task as completed / not completed
  const toggleComplete = async (task) => {
    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: task.name,
          duration: task.duration,
          completed: !task.completed,
        }),
      });

      const updatedTask = await response.json();

      setTasks(
        tasks.map((item) =>
          item._id === updatedTask._id ? updatedTask : item
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();

    if (!name.trim() || !duration) {
      alert("Please enter task name and duration");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          duration: Number(duration),
        }),
      });

      const newTask = await response.json();

      setTasks([...tasks, newTask]);

      setName("");
      setDuration("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="app">
      <h1>My To-Do List</h1>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Enter task name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          min="1"
        />

        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <div className="task" key={task._id}>
              <h3>{task.name}</h3>

              <p>Duration: {task.duration} minutes</p>

              <p>
                Status: {task.completed ? "Completed" : "Not completed"}
              </p>

              <button onClick={() => toggleComplete(task)}>
                {task.completed
                  ? "Mark as Not Completed"
                  : "Mark as Completed"}
              </button>

              <button onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;