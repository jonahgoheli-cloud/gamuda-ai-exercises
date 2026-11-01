import { useState } from "react";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("normal");
  const [category, setCategory] = useState("general");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const addTask = () => {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
      priority: priority,
      category: category,
      dueDate: new Date(Date.now() - 86400000), // set yesterday for overdue demo
    };

    setTasks([...tasks, newTask]);
    setInput("");
    setPriority("normal");
    setCategory("general");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  };

  const deleteSelected = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const selectAll = () => {
    setTasks(tasks.map((task) => ({ ...task, completed: true })));
  };

  const filteredTasks = tasks.filter((task) => {
    const matchStatus =
      filterStatus === "all"
        ? true
        : filterStatus === "completed"
          ? task.completed
          : !task.completed;

    const matchPriority =
      filterPriority === "all" ? true : task.priority === filterPriority;

    const matchCategory =
      filterCategory === "all" ? true : task.category === filterCategory;

    // ADD THIS RETURN STATEMENT:
    return matchStatus && matchPriority && matchCategory;
  });

  return (
    <div>
      <h2>Task Manager</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task..."
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="work">Work</option>
        <option value="home">Home</option>
      </select>

      <button onClick={addTask}>Add Task</button>

      <div style={{ marginTop: "1em" }}>
        <strong>Filter:</strong>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="general">General</option>
          <option value="work">Work</option>
          <option value="home">Home</option>
        </select>
      </div>

      <div style={{ marginTop: "1em" }}>
        <button onClick={selectAll}>Select All</button>
        <button onClick={deleteSelected}>Delete Selected</button>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks found based on current filters.</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => {
            const isOverdue = !task.completed && task.dueDate < new Date();
            return (
              <li key={task.id} style={{ color: isOverdue ? "red" : "black" }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <strong>{task.text}</strong> | {""}
                <em>{task.priority.toUpperCase()}</em> | {""}
                <span>{task.category}</span>
                {isOverdue && "(Overdue!)"}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default TaskManager;
