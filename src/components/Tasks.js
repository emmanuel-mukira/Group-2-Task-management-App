import React, { useState, useEffect } from 'react';

function Task({ userId }) {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState({
    id: '',
    title: '',
    description: '',
    due_date: '',
    priority: 'low',
    completed: false,
    assigned_to: userId,
});

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'low',
    completed: false,
    assigned_to: userId,
  });

  useEffect(() => {
    fetch(`http://localhost:3000/tasks?user_id=${userId}`)
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, [userId]);

  const handleEditClick = (task) => {
    setEditingTask({ ...task });
  };
  

  const handleDeleteClick = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  const handleTaskInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handlePriorityChange = (event) => {
    setNewTask({
      ...newTask,
      priority: event.target.value,
    });
  };
  

  const handleCompletedChange = (event) => {
    setNewTask({
      ...newTask,
      completed: event.target.checked,
    });
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setNewTask({
          title: "",
          description: "",
          due_date: "",
          priority: "low",
          completed: false,
          assigned_to: userId,
        });
        setTasks([...tasks, data]); // call setTasks to update the state variable
        if (setTasks) {
          setTasks((tasks) => [...tasks, data]);
        }
      });
  };
  

  const handleEditSubmit = (event, id) => {
    event.preventDefault();
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingTask),
    })
    .then((response) => response.json())
    .then((data) => {
      setTasks(
        tasks.map((task) => {
          if (task.id === data.id) {
            return data;
          } else {
            return task;
          }
        })
      );
      setEditingTask(null);
    });
  };

  const handleCancelClick = () => {
    setEditingTask(null);
  };

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={handleTaskInputChange}
          placeholder="Task Title"
          required
        />
        <br />
        <textarea
          name="description"
          value={newTask.description}
          onChange={handleTaskInputChange}
          placeholder="Task Description"
          required
        />
        <br />
        <label>
          Due Date:
          <input
            type="date"
            name="due_date"
            value={newTask.due_date}
            onChange={handleTaskInputChange}
            required
          />
        </label>
        <br />
        <label>
            Priority 
            <select
          name="priority"
          value={editingTask.priority}
          onChange={handlePriorityChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        </label>
        <label>
        Completed:
        </label>
        <input
          type="checkbox"
          name="completed"
          checked={editingTask.completed}
          onChange={handleCompletedChange}
        />
        <br/>
        <br />
      <button type="submit">Save</button>
      <button type="button" onClick={handleCancelClick}>
        Cancel
      </button>
      </form>
      </div>
)
}
export default Task;
